import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const FROM_EMAIL = Deno.env.get('FROM_EMAIL') ?? '"unf*ck berlin" <noreply@send.voltberlin.de>';
const BASE_URL = Deno.env.get('BASE_URL') ?? 'https://unfuck.berlin';
const RESEND_KEY = Deno.env.get('RESEND_KEY');

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

async function sendConfirmationEmail(to: string, name: string, token: string) {
  const link = `${BASE_URL}/confirm.html?token=${token}`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #28113D;">
      <h2 style="margin: 0 0 16px;">Bestätige deine Bestellung</h2>
      <p>Hi ${name},</p>
      <p>danke, dass du dir 10 unf*ck-Sticker holen willst. Bitte bestätige deine E-Mail-Adresse mit einem Klick:</p>
      <p style="margin: 28px 0;">
        <a href="${link}" style="background:#D6FF1D; color:#502379; padding:14px 22px; text-decoration:none; font-weight:900; display:inline-block;">Bestellung bestätigen</a>
      </p>
      <p style="font-size: 0.85rem; color: #666;">Falls der Button nicht funktioniert, kopiere diesen Link in deinen Browser:<br><a href="${link}">${link}</a></p>
      <p style="font-size: 0.85rem; color: #666; margin-top: 32px;">Wenn du keine Sticker bestellt hast, ignorier diese Mail einfach.</p>
    </div>
  `;
  const text = `Hi ${name},\n\nbitte bestätige deine Bestellung mit diesem Link:\n${link}\n\nWenn du nichts bestellt hast, ignorier diese Mail einfach.`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to,
      subject: 'Bestätige deine Sticker-Bestellung',
      html,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend ${res.status}: ${detail}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return json({ error: 'method_not_allowed' }, 405);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const email = String(payload.email ?? '').trim().toLowerCase();
  const name = String(payload.name ?? '').trim();
  const strasse = String(payload.strasse ?? '').trim();
  const plz = String(payload.plz ?? '').trim();
  const stadt = String(payload.stadt ?? '').trim();
  const consent = payload.consent === true;

  if (!email || !name || !strasse || !plz || !stadt) {
    return json({ error: 'missing_fields' }, 400);
  }
  if (!isValidEmail(email)) {
    return json({ error: 'invalid_email' }, 400);
  }
  if (!consent) {
    return json({ error: 'missing_consent' }, 400);
  }

  const { data: existing, error: lookupError } = await supabase
    .from('sticker_requests')
    .select('id')
    .ilike('email', email)
    .maybeSingle();

  if (lookupError) {
    console.error('lookup error', lookupError);
    return json({ error: 'server_error' }, 500);
  }
  if (existing) {
    return json({ error: 'already_requested' }, 409);
  }

  const token = crypto.randomUUID();
  const now = new Date().toISOString();

  const { error: insertError } = await supabase
    .from('sticker_requests')
    .insert({
      email,
      name,
      strasse,
      plz,
      stadt,
      consent,
      confirmation_token: token,
      confirmation_sent_at: now,
    });

  if (insertError) {
    if (insertError.code === '23505') {
      return json({ error: 'already_requested' }, 409);
    }
    console.error('insert error', insertError);
    return json({ error: 'server_error' }, 500);
  }

  try {
    await sendConfirmationEmail(email, name, token);
  } catch (err) {
    console.error('email send failed', err);
    return json({ error: 'email_send_failed' }, 500);
  }

  return json({ status: 'ok' });
});
