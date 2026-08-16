import ICAL from 'ical.js'
import type { CalendarEventItem } from '../components/organisms/calendar-section'
import volt_berlin_public_calendar_ics from '../data/volt-berlin-public-calendar.generated.ics?raw'

/**
 * Live calendar of Volt Berlin events, read from the public Google Calendar
 * ICS feed at load time (see the CalendarProvider).
 *
 * The feed is served same-origin through /api/volt-berlin-public-calendar.ics — a cached copy from the Google Calendar, so the we only download when rebuilding and it wont be blocked by CORS or slow, cause of the request.
 */
// const CALENDAR_ENDPOINT = '/api/volt-berlin-public-calendar.ics'

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
  /** Raw event description (used to derive the category badge). */
  description?: string
  allDay: boolean
}

/**
 * All-day (VALUE=DATE) DTEND values are exclusive per the iCalendar spec —
 * a single-day all-day event has DTEND set to the *next* day. Normalize
 * that here so downstream code (multi-day detection, "is this still
 * upcoming" checks) works with an inclusive end date instead.
 */
function normalizeAllDayEnd(end: Date | undefined, isAllDay: boolean): Date | undefined {
  if (!end || !isAllDay) return end
  const d = new Date(end)
  d.setDate(d.getDate() - 1)
  return d
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

  const masterUids = new Set(masters.map((v) => v.getFirstPropertyValue('uid') as string))

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
        // `next` is only the *originally scheduled* recurrence-id slot.
        // Resolve it through getOccurrenceDetails() so an overridden
        // occurrence (moved date, changed location/title/all-day-ness)
        // reflects the actual exception data instead of the master's.
        const details = event.getOccurrenceDetails(next)
        const start = details.startDate.toJSDate()
        if (start > horizon) break
        if (start >= startOfToday) {
          count++
          const isAllDay = details.startDate.isDate
          const rawEnd = details.endDate?.toJSDate()
          add({
            // Keep the id tied to the original recurrence slot (`next`),
            // not the possibly-overridden `start`, so a given occurrence
            // keeps a stable id even if it gets moved/edited later.
            id: `${event.uid}::${next.toJSDate().toISOString()}`,
            start,
            end: normalizeAllDayEnd(rawEnd, isAllDay),
            title: details.item.summary ?? '',
            location: details.item.location || undefined,
            description: details.item.description || undefined,
            allDay: isAllDay,
          })
        }
        next = iterator.next()
      }
    } else {
      const isAllDay = event.startDate.isDate
      const start = event.startDate.toJSDate()
      const rawEnd = event.endDate ? event.endDate.toJSDate() : undefined
      const end = normalizeAllDayEnd(rawEnd, isAllDay)
      if ((end ?? start) >= startOfToday) {
        add({
          id: event.uid || start.toISOString(),
          start,
          end,
          title: event.summary ?? '',
          location: event.location || undefined,
          description: event.description || undefined,
          allDay: isAllDay,
        })
      }
    }
  }

  // Standalone exceptions whose master VEVENT is missing from the feed
  // (rare, but some exports produce this) would otherwise silently vanish
  // since the loop above only walks `masters`. Surface them as one-off
  // events instead of dropping them.
  for (const ov of overrides) {
    const uid = ov.getFirstPropertyValue('uid') as string
    if (masterUids.has(uid)) continue
    const event = new ICAL.Event(ov)
    const isAllDay = event.startDate.isDate
    const start = event.startDate.toJSDate()
    const rawEnd = event.endDate ? event.endDate.toJSDate() : undefined
    const end = normalizeAllDayEnd(rawEnd, isAllDay)
    if ((end ?? start) >= startOfToday && start <= horizon) {
      add({
        id: `${uid}::${start.toISOString()}`,
        start,
        end,
        title: event.summary ?? '',
        location: event.location || undefined,
        description: event.description || undefined,
        allDay: isAllDay,
      })
    }
  }

  items.sort((a, b) => a.start.getTime() - b.start.getTime())
  return items
}

/** Fetch the calendar feed (same-origin proxy) and parse it. */
export async function fetchCalendar(_signal?: AbortSignal): Promise<CalendarItem[]> {
  return parseCalendar(volt_berlin_public_calendar_ics)

  // const res = await fetch(CALENDAR_ENDPOINT, { signal })
  // if (!res.ok) {
  //   throw new Error(`Calendar request failed (${res.status})`)
  // }
  // return parseCalendar(await res.text())
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
  const day = multiDay ? `${s.day} – ${e!.day}` : s.day
  const time = ev.allDay
    ? ''
    : e && !multiDay
      ? `${s.time} – ${e.time} Uhr`
      : `${s.time} Uhr`
  const location = ev.location ? ev.location.replace(/\s*\n\s*/g, ', ').trim() : ''
  // A "#Bezirkstreffen" tag anywhere in the description flips the card's badge
  // to the red "Bezirkstreffen" variant; everything else is a "Veranstaltung".

  const isBezirk = /#Bezirkstreffen/i.test(ev.description ?? '') || /Bezirkstreffen/i.test(ev.title ?? '') || /Treffen/i.test(ev.title ?? '')
  const isHighlight = /#Highlight/i.test(ev.description ?? '') || /Plakatierstart/i.test(ev.title ?? '') || /CSD/i.test(ev.title ?? '')

  let badge: any = { label: 'Veranstaltung', color: 'blue' as const, textColor: 'purple' as const }
  if (isHighlight) {
    badge = { label: 'Highlight', color: 'yellow' as const, textColor: 'purple' as const }
  } else if (isBezirk) {
    badge = { label: 'Bezirkstreffen', color: 'pink' as const, textColor: 'white' as const }
  }

  return {
    id: ev.id,
    day,
    month: s.month,
    title: ev.title,
    time: time || undefined,
    location: location || undefined,
    badge,
  }
}
