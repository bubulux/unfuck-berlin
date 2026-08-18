import type { HTMLAttributes, ReactNode } from 'react'
import { Text } from '../../atoms/text'
import { HighlightText } from '../../atoms/highlight-text'
import { EventCard } from '../../molecules/event-card'
import type { CalendarEventItem } from '../calendar-section'
import './styles.css'

/** Month abbreviation (as produced by the calendar lib) → full German name. */
const MONTH_NAMES: Record<string, string> = {
  JAN: 'Januar',
  FEB: 'Februar',
  MÄR: 'März',
  APR: 'April',
  MAI: 'Mai',
  JUN: 'Juni',
  JUL: 'Juli',
  AUG: 'August',
  SEP: 'September',
  OKT: 'Oktober',
  NOV: 'November',
  DEZ: 'Dezember',
}

/** Group already-sorted events into consecutive runs of the same month. */
function groupByMonth(events: CalendarEventItem[]) {
  const groups: { month: string; events: CalendarEventItem[] }[] = []
  for (const event of events) {
    const last = groups[groups.length - 1]
    if (last && last.month === event.month) last.events.push(event)
    else groups.push({ month: event.month, events: [event] })
  }
  return groups
}

export interface EventsSectionProps extends HTMLAttributes<HTMLElement> {
  events: CalendarEventItem[]
  /** Loading state of the (async) calendar data. Defaults to `ready`. */
  status?: 'loading' | 'ready' | 'error'
  emptyLabel?: string
  loadingLabel?: string
  errorLabel?: string
}

export function EventsSection({
  events,
  status = 'ready',
  emptyLabel = 'Aktuell keine anstehenden Termine.',
  loadingLabel = 'Termine werden geladen…',
  errorLabel = 'Termine konnten gerade nicht geladen werden. Bitte versuch es später erneut.',
  className,
  ...rest
}: EventsSectionProps) {
  const classes = ['events', className].filter(Boolean).join(' ')
  const groups = groupByMonth(events)
  return (
    <section className={classes} {...rest}>
      <div className="events__inner">
        {status === 'loading' ? (
          <Text as="p" variant="body" color="white">
            {loadingLabel}
          </Text>
        ) : status === 'error' ? (
          <Text as="p" variant="body" color="white">
            {errorLabel}
          </Text>
        ) : events.length > 0 ? (
          <div className="events__groups">
            {groups.map((group) => (
              <div className="events__group" key={group.month}>
                <div className="events__month">
                  <HighlightText
                    as="h2"
                    lines={[MONTH_NAMES[group.month] ?? group.month]}
                    variant="subtitel"
                    color="neon"
                    textColor="purple"
                    uppercase
                  />
                  <span className="events__month-rule" aria-hidden="true" />
                </div>
                <div className="events__list">
                  {group.events.map((event) => (
                    <EventCard
                      key={event.id}
                      day={event.day}
                      month={event.month}
                      title={event.title}
                      time={event.time}
                      location={event.location}
                      badge={event.badge}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Text as="p" variant="body" color="white">
            {emptyLabel}
          </Text>
        )}

        <div className="events__note">
          <Text as="p" variant="body" color="white">
            Du vermisst hier ein Event, oder würdest uns gerne auf
            einem Panel begrüßen? <strong>Dann lad' uns ein!</strong><br />
            Schreib dazu eine Mail an <a href="mailto:presse@voltberlin.org">presse@voltberlin.org</a>.
          </Text>
        </div>
      </div>
    </section>
  )
}

export default EventsSection
