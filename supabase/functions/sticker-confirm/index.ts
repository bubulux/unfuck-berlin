import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

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

function isUuid(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  if (req.method !== 'POST') {
    return json({ status: 'invalid' }, 405);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ status: 'invalid' }, 400);
  }

  const token = String(payload.token ?? '').trim();
  if (!isUuid(token)) {
    return json({ status: 'invalid' }, 400);
  }

  const { data: row, error: lookupError } = await supabase
    .from('sticker_requests')
    .select('id, email_confirmed')
    .eq('confirmation_token', token)
    .maybeSingle();

  if (lookupError) {
    console.error('confirm lookup error', lookupError);
    return json({ status: 'server_error' }, 500);
  }

  if (!row) {
    return json({ status: 'invalid' }, 404);
  }

  if (row.email_confirmed) {
    return json({ status: 'already_confirmed' });
  }

  const { error: updateError } = await supabase
    .from('sticker_requests')
    .update({
      email_confirmed: true,
      confirmed_at: new Date().toISOString(),
    })
    .eq('id', row.id);

  if (updateError) {
    console.error('confirm update error', updateError);
    return json({ status: 'server_error' }, 500);
  }

  return json({ status: 'ok' });
});
