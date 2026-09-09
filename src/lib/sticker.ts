/**
 * Client fuer die beiden Supabase Edge Functions hinter dem Double-Opt-In der
 * Sticker-Bestellung:
 *
 *   1. `/sticker` schickt das Formular an `sticker-submit`. Die Function legt
 *      die Bestellung an und verschickt (ueber Resend) die Bestaetigungsmail
 *      mit einem Link auf `/confirm.html?token=…`.
 *   2. Dieser Link landet auf `/confirm` (bzw. dem Alias `/confirm.html`) und
 *      loest den Token ueber `sticker-confirm` ein.
 *
 * Die Functions liegen nicht in diesem Repo, sondern im Supabase-Projekt
 * (Quelle: Branch `6-feat-add-dashboard-for-sticker--and-nervkrams-reports`,
 * `supabase/functions/*`). Deshalb bleiben die Statuswerte hier 1:1 die der
 * Functions – die Zuordnung darf nicht auseinanderlaufen.
 *
 * Der Anon-Key ist bewusst oeffentlich: er steckte schon in der statischen
 * Legacy-Seite. Geschrieben wird ausschliesslich ueber die Functions (Service
 * Role), die Tabelle selbst ist per RLS gesperrt.
 */
const SUPABASE_URL = 'https://ugxzkzydoajexjgwcqtq.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneHprenlkb2FqZXhqZ3djcXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyNTM5MTksImV4cCI6MjA5NTgyOTkxOX0.pgO_pJ0ksQiGp5mYiLtz6E8uxD78MmWbXrufJA669_U'

const SUBMIT_URL = `${SUPABASE_URL}/functions/v1/sticker-submit`
const CONFIRM_URL = `${SUPABASE_URL}/functions/v1/sticker-confirm`

export interface StickerRequest {
  email: string
  name: string
  strasse: string
  plz: string
  stadt: string
  consent: boolean
}

/**
 * `already_requested` (HTTP 409) heisst: zu der Adresse gibt es die Bestellung
 * schon – das ist ein Hinweis, kein Fehler. `error` sind Server-Fehler,
 * `network_error` erreicht die Function gar nicht erst.
 */
export type SubmitResult = 'ok' | 'already_requested' | 'error' | 'network_error'

export async function submitStickerRequest(
  payload: StickerRequest,
): Promise<SubmitResult> {
  let res: Response
  try {
    res = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(payload),
    })
  } catch {
    return 'network_error'
  }

  if (res.status === 409) return 'already_requested'
  if (!res.ok) return 'error'
  return 'ok'
}

/** Statuswerte der Function `sticker-confirm`, plus `error` als Sammelfall. */
export type ConfirmResult = 'ok' | 'already_confirmed' | 'invalid' | 'error'

export async function confirmStickerRequest(
  token: string,
): Promise<ConfirmResult> {
  try {
    const res = await fetch(CONFIRM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ token }),
    })
    // Die Function antwortet auch bei 4xx mit JSON; der Status steht im Body.
    const data = (await res.json().catch(() => ({}))) as { status?: string }

    if (data.status === 'ok') return 'ok'
    if (data.status === 'already_confirmed') return 'already_confirmed'
    if (data.status === 'invalid') return 'invalid'
    return 'error'
  } catch {
    return 'error'
  }
}
