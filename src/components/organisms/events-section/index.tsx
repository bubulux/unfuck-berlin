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
  headingLines?: string[]
  /** Intro paragraphs. */
  intro?: string[]
  events: CalendarEventItem[]
  /** Loading state of the (async) calendar data. Defaults to `ready`. */
  status?: 'loading' | 'ready' | 'error'
  emptyLabel?: string
  loadingLabel?: string
  errorLabel?: string
  /** Footer note (e.g. the "missing an event?" line). */
  children?: ReactNode
}

export function EventsSection({
  headingLines = ['Termine', '& Treffen'],
  intro = [],
  events,
  status = 'ready',
  emptyLabel = 'Aktuell keine anstehenden Termine.',
  loadingLabel = 'Termine werden geladen …',
  errorLabel = 'Termine konnten gerade nicht geladen werden. Bitte versuch es später erneut.',
  children,
  className,
  ...rest
}: EventsSectionProps) {
  const classes = ['events', className].filter(Boolean).join(' ')
  const groups = groupByMonth(events)
  return (
    <section className={classes} {...rest}>
      <div className="events__inner">
        <HighlightText
          as="h1"
          lines={headingLines}
          variant="titel"
          color="blue"
          textColor="purple"
          align="left"
          uppercase
        />

        {intro.length > 0 ? (
          <div className="events__intro">
            {intro.map((paragraph) => (
              <Text key={paragraph} as="p" variant="body" color="white">
                {paragraph}
              </Text>
            ))}
          </div>
        ) : null}

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

        {children ? <div className="events__note">{children}</div> : null}
      </div>
    </section>
  )
}

export default EventsSection
