import type { HTMLAttributes } from 'react'
import type { ColorToken } from '../../atoms/text'
import { Text } from '../../atoms/text'
import { Icon } from '../../atoms/icon'
import { EventCard } from '../../molecules/event-card'
import './styles.css'
import HighlightText from '../../atoms/highlight-text'
import Button from '../../atoms/button'

export interface CalendarEventItem {
  id: string
  /** Day or day range, e.g. "22" or "18-19". */
  day: string
  /** Month abbreviation, e.g. "JUL". */
  month: string
  title: string
  /** Time line, e.g. "17:00–19:00 Uhr" (empty for all-day). */
  time?: string
  /** Venue/address line. */
  location?: string
  /** Category badge shown above the card's top-left corner. */
  badge?: { label: string; color: ColorToken; textColor: ColorToken }
}

export interface CalendarSectionProps extends HTMLAttributes<HTMLElement> {
  events: CalendarEventItem[]
  /** Loading state of the (async) calendar data. Defaults to `ready`. */
  status?: 'loading' | 'ready' | 'error'
  heading?: string
  viewAllLabel?: string
  viewAllTo?: string
  viewAllHref?: string
  /** Shown when there are no upcoming events. */
  emptyLabel?: string
  /** Shown while the calendar is loading. */
  loadingLabel?: string
  /** Shown when the calendar failed to load. */
  errorLabel?: string
}

export function CalendarSection({
  events,
  status = 'ready',
  heading = 'Triff uns!',
  viewAllLabel = 'Alle Termine',
  viewAllTo,
  viewAllHref,
  emptyLabel = 'Aktuell keine anstehenden Termine.',
  loadingLabel = 'Termine werden geladen …',
  errorLabel = 'Termine konnten gerade nicht geladen werden. Bitte versuch es später erneut.',
  className,
  ...rest
}: CalendarSectionProps) {
  const classes = ['calendar', className].filter(Boolean).join(' ')
  return (
    <section className={classes} {...rest}>
      <div className="calendar__inner">
        <a
          href={viewAllTo}
          style={{
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
            <HighlightText
              as="h2"
              lines={[heading]}
              variant="titel"
              color="purple"
              textColor="white"
              align="left"
            />

            <Button
            className="moreEventsButtonDesktop"
              color="neon"
              variant="solid"
              size="default"
              iconRight={<Icon name="arrow-right" />}>
              {viewAllLabel}
            </Button>
        </a>

        {status === 'loading' ? (
          <Text as="p" variant="body" color="purple" align="center">
            {loadingLabel}
          </Text>
        ) : status === 'error' ? (
          <Text as="p" variant="body" color="purple" align="center">
            {errorLabel}
          </Text>
        ) : events.length > 0 ? (
          <div className="calendar__list">
            {events.map((event) => (
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
        ) : (
          <Text as="p" variant="body" color="purple" align="center">
            {emptyLabel}
          </Text>
        )}


            <Button
            className="moreEventsButtonMobile"
              color="neon"
              variant="solid"
              size="default"
              iconRight={<Icon name="arrow-right" />}>
              {viewAllLabel}
            </Button>
      </div>
    </section>
  )
}

export default CalendarSection
