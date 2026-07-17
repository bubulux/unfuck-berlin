import type { CalendarEventItem } from '../components/organisms/calendar-section'

/**
 * Upcoming events — maintained by hand.
 *
 * Source: public Volt Berlin Google Calendar
 * (volteuropa.org_3qtptk1l0mfg76gq9nfqq1h4mg@group.calendar.google.com).
 * Snapshot fetched 2026-07-16. Keep this list roughly in sync; past events are
 * filtered out automatically, and the calendar section shows the next few.
 *
 * `start`/`end` are ISO-8601 (UTC). The display date/time/label are derived.
 */
export interface VoltEvent {
  title: string
  /** ISO-8601 start (UTC). */
  start: string
  /** ISO-8601 end (UTC). */
  end?: string
  allDay?: boolean
  location?: string
}

export const UPCOMING_EVENTS: VoltEvent[] = [
  {
    title: 'Pankow Stammtisch (Zollhaus Pankow)',
    start: '2026-07-16T17:00:00.000Z',
    end: '2026-07-16T19:00:00.000Z',
    location: 'Berliner Str. 80, 13189 Berlin',
  },
  {
    title: 'Volt Reinickendorf Treffen',
    start: '2026-07-20T16:00:00.000Z',
    end: '2026-07-20T19:00:00.000Z',
    location: 'Ort folgt noch',
  },
  {
    title: 'FLINTA* Stammtisch',
    start: '2026-07-24T17:00:00.000Z',
    end: '2026-07-24T19:30:00.000Z',
    location: 'Choriner Str. 34, Berlin',
  },
  {
    title: 'Meet & Greet: Volt Berlin',
    start: '2026-07-25T13:00:00.000Z',
    end: '2026-07-25T14:30:00.000Z',
    location: 'Choriner Str. 34, 10435 Berlin',
  },
  {
    title: 'Volt Family & Friends Picnic im Volkspark Wilmersdorf',
    start: '2026-07-26T12:00:00.000Z',
    end: '2026-07-26T17:00:00.000Z',
    location: 'Volkspark Wilmersdorf',
  },
  {
    title: '[Südost] Treffen: Neukölln / Treptow-Köpenick',
    start: '2026-07-28T16:00:00.000Z',
    end: '2026-07-28T19:00:00.000Z',
    location: 'Wolf Kino, Weserstraße 59, 12045 Berlin',
  },
]

const MONTHS_DE = [
  'JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN',
  'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ',
]
const TZ = 'Europe/Berlin'

function parts(iso: string) {
  const d = new Date(iso)
  const day = new Intl.DateTimeFormat('de-DE', { timeZone: TZ, day: 'numeric' }).format(d)
  const monthIdx =
    Number(new Intl.DateTimeFormat('en-US', { timeZone: TZ, month: 'numeric' }).format(d)) - 1
  const time = new Intl.DateTimeFormat('de-DE', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
  return { day, monthIdx, month: MONTHS_DE[monthIdx], time }
}

/** Map a raw event to the calendar section's display shape. */
export function toCalendarItem(ev: VoltEvent): CalendarEventItem {
  const s = parts(ev.start)
  const e = ev.end ? parts(ev.end) : null
  const multiDay = e ? e.day !== s.day || e.monthIdx !== s.monthIdx : false
  const day = multiDay ? `${s.day}-${e!.day}` : s.day
  const time = ev.allDay
    ? ''
    : e && !multiDay
      ? `${s.time}–${e.time} Uhr`
      : `${s.time} Uhr`
  const details = [ev.location, time].filter(Boolean).join(' · ')
  return { id: ev.start, day, month: s.month, title: ev.title, details }
}

/** Events that haven't ended yet (soonest first), in display shape. */
function upcoming(): VoltEvent[] {
  const now = Date.now()
  return UPCOMING_EVENTS.filter(
    (ev) => new Date(ev.end ?? ev.start).getTime() >= now,
  )
}

/** Next `limit` upcoming events, in display shape. */
export function getUpcomingCalendarItems(limit = 3): CalendarEventItem[] {
  return upcoming().slice(0, limit).map(toCalendarItem)
}

/** All upcoming events, in display shape. */
export function getAllCalendarItems(): CalendarEventItem[] {
  return upcoming().map(toCalendarItem)
}
