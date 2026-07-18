import ICAL from 'ical.js'
import type { CalendarEventItem } from '../components/organisms/calendar-section'

/**
 * Live calendar of Volt Berlin events, read from the public Google Calendar
 * ICS feed at load time (see the CalendarProvider).
 *
 * The feed is served same-origin through /api/volt-calendar — a rewrite that
 * proxies Google (Netlify in production, the Vite dev server locally) so the
 * browser fetch isn't blocked by CORS.
 */
export const CALENDAR_ENDPOINT = '/api/volt-calendar'

/** How far ahead recurring events are expanded, and a per-event safety cap. */
const HORIZON_MONTHS = 4
const MAX_OCCURRENCES_PER_EVENT = 60

const TZ = 'Europe/Berlin'
const MONTHS_DE = [
  'JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN',
  'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ',
]

export interface CalendarItem {
  id: string
  start: Date
  end?: Date
  title: string
  location?: string
  allDay: boolean
}

/**
 * Parse an ICS string into future calendar items (soonest first). Recurring
 * events are expanded (up to the horizon); everything before the start of
 * `reference`'s day is dropped.
 */
export function parseCalendar(
  icsText: string,
  reference: Date = new Date(),
): CalendarItem[] {
  const root = new ICAL.Component(ICAL.parse(icsText))

  // Register the feed's own time zones so TZID values resolve to the right
  // absolute instants regardless of the visitor's local zone.
  for (const vtz of root.getAllSubcomponents('vtimezone')) {
    const tzid = vtz.getFirstPropertyValue('tzid') as string | null
    try {
      if (tzid && !ICAL.TimezoneService.has(tzid)) {
        ICAL.TimezoneService.register(vtz)
      }
    } catch {
      /* ignore a malformed VTIMEZONE */
    }
  }

  const startOfToday = new Date(
    reference.getFullYear(),
    reference.getMonth(),
    reference.getDate(),
  )
  const horizon = new Date(startOfToday)
  horizon.setMonth(horizon.getMonth() + HORIZON_MONTHS)

  const vevents = root.getAllSubcomponents('vevent')
  const masters = vevents.filter((v) => !v.hasProperty('recurrence-id'))
  const overrides = vevents.filter((v) => v.hasProperty('recurrence-id'))

  const overridesByUid = new Map<string, ICAL.Component[]>()
  for (const ov of overrides) {
    const uid = ov.getFirstPropertyValue('uid') as string
    const list = overridesByUid.get(uid) ?? []
    list.push(ov)
    overridesByUid.set(uid, list)
  }

  const items: CalendarItem[] = []
  const seen = new Set<string>()
  const add = (item: CalendarItem) => {
    if (seen.has(item.id)) return
    seen.add(item.id)
    items.push(item)
  }

  for (const ve of masters) {
    const event = new ICAL.Event(ve)

    if (event.isRecurring()) {
      for (const ov of overridesByUid.get(event.uid) ?? []) {
        try {
          event.relateException(new ICAL.Event(ov))
        } catch {
          /* ignore an override we can't attach */
        }
      }
      const iterator = event.iterator()
      let next = iterator.next()
      let count = 0
      while (next && count < MAX_OCCURRENCES_PER_EVENT) {
        const start = next.toJSDate()
        if (start > horizon) break
        if (start >= startOfToday) {
          count++
          const details = event.getOccurrenceDetails(next)
          add({
            id: `${event.uid}::${start.toISOString()}`,
            start,
            end: details.endDate?.toJSDate(),
            title: event.summary ?? '',
            location: event.location || undefined,
            allDay: next.isDate,
          })
        }
        next = iterator.next()
      }
    } else {
      const start = event.startDate.toJSDate()
      const end = event.endDate ? event.endDate.toJSDate() : undefined
      if ((end ?? start) >= startOfToday) {
        add({
          id: event.uid || start.toISOString(),
          start,
          end,
          title: event.summary ?? '',
          location: event.location || undefined,
          allDay: event.startDate.isDate,
        })
      }
    }
  }

  items.sort((a, b) => a.start.getTime() - b.start.getTime())
  return items
}

/** Fetch the calendar feed (same-origin proxy) and parse it. */
export async function fetchCalendar(signal?: AbortSignal): Promise<CalendarItem[]> {
  const res = await fetch(CALENDAR_ENDPOINT, { signal })
  if (!res.ok) {
    throw new Error(`Calendar request failed (${res.status})`)
  }
  return parseCalendar(await res.text())
}

function fmtParts(d: Date) {
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

/** Map a calendar item to the calendar/event card display shape. */
export function toDisplayItem(ev: CalendarItem): CalendarEventItem {
  const s = fmtParts(ev.start)
  const e = ev.end ? fmtParts(ev.end) : null
  const multiDay = e ? e.day !== s.day || e.monthIdx !== s.monthIdx : false
  const day = multiDay ? `${s.day}-${e!.day}` : s.day
  const time = ev.allDay
    ? ''
    : e && !multiDay
      ? `${s.time}–${e.time} Uhr`
      : `${s.time} Uhr`
  const location = ev.location ? ev.location.replace(/\s*\n\s*/g, ', ').trim() : ''
  return {
    id: ev.id,
    day,
    month: s.month,
    title: ev.title,
    time: time || undefined,
    location: location || undefined,
  }
}
