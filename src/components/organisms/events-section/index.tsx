import type { HTMLAttributes, ReactNode } from 'react'
import { Text } from '../../atoms/text'
import { Button } from '../../atoms/button'
import { HighlightText } from '../../atoms/highlight-text'
import { EventCard } from '../../molecules/event-card'
import type { CalendarEventItem } from '../calendar-section'
import './styles.css'

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
  /** Show a "load more" button (when there are further events to reveal). */
  hasMore?: boolean
  onLoadMore?: () => void
  loadMoreLabel?: string
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
  hasMore = false,
  onLoadMore,
  loadMoreLabel = 'Mehr laden',
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

        {status === 'loading' ? (
          <Text as="p" variant="body" color="white">
            {loadingLabel}
          </Text>
        ) : status === 'error' ? (
          <Text as="p" variant="body" color="white">
            {errorLabel}
          </Text>
        ) : events.length > 0 ? (
          <div className="events__list">
            {events.map((event) => (
              <EventCard
                key={event.id}
                day={event.day}
                month={event.month}
                title={event.title}
                time={event.time}
                location={event.location}
              />
            ))}
          </div>
        ) : (
          <Text as="p" variant="body" color="white">
            {emptyLabel}
          </Text>
        )}

        {status === 'ready' && hasMore && onLoadMore ? (
          <div className="events__more">
            <Button color="neon" onClick={onLoadMore}>
              {loadMoreLabel}
            </Button>
          </div>
        ) : null}

        {children ? <div className="events__note">{children}</div> : null}
      </div>
    </section>
  )
}

export default EventsSection
