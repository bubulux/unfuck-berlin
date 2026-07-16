import type { HTMLAttributes, ReactNode } from 'react'
import { Text } from '../../atoms/text'
import { HighlightText } from '../../atoms/highlight-text'
import { EventCard } from '../../molecules/event-card'
import type { CalendarEventItem } from '../calendar-section'
import './styles.css'

export interface EventsSectionProps extends HTMLAttributes<HTMLElement> {
  headingLines?: string[]
  /** Intro paragraphs. */
  intro?: string[]
  events: CalendarEventItem[]
  emptyLabel?: string
  /** Footer note (e.g. the "missing an event?" line). */
  children?: ReactNode
}

export function EventsSection({
  headingLines = ['Termine', '& Treffen'],
  intro = [],
  events,
  emptyLabel = 'Aktuell keine anstehenden Termine.',
  children,
  className,
  ...rest
}: EventsSectionProps) {
  const classes = ['events', className].filter(Boolean).join(' ')
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

        {events.length > 0 ? (
          <div className="events__list">
            {events.map((event) => (
              <EventCard
                key={event.id}
                day={event.day}
                month={event.month}
                title={event.title}
                details={event.details}
              />
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
