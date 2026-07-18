import type { HTMLAttributes } from 'react'
import { Text } from '../../atoms/text'
import { DateBadge } from '../../atoms/date-badge'
import './styles.css'

export interface EventCardProps extends HTMLAttributes<HTMLElement> {
  /** Day or day range, e.g. "22" or "18-19". */
  day: string
  /** Month abbreviation, e.g. "JUL". */
  month: string
  title: string
  /** Time line, e.g. "17:00–19:00 Uhr" (empty/omitted for all-day). */
  time?: string
  /** Venue/address line. */
  location?: string
}

const ClockGlyph = () => (
  <svg
    className="event-card__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 1.5" />
  </svg>
)

const PinGlyph = () => (
  <svg
    className="event-card__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 21s6-5.686 6-10a6 6 0 1 0-12 0c0 4.314 6 10 6 10z" />
    <circle cx="12" cy="11" r="2.2" />
  </svg>
)

export function EventCard({
  day,
  month,
  title,
  time,
  location,
  className,
  ...rest
}: EventCardProps) {
  const classes = ['event-card', className].filter(Boolean).join(' ')
  return (
    <article className={classes} {...rest}>
      <div className="event-card__layout">
        <DateBadge day={day} month={month} color="black" className="event-card__date" />
        <div className="event-card__body">
          <Text as="h3" variant="body" color="black" weight="bold" className="event-card__title">
            {title}
          </Text>
          {time ? (
            <p className="event-card__time">
              <ClockGlyph />
              <span>{time}</span>
            </p>
          ) : null}
          {location ? (
            /^https?:\/\//i.test(location) ? (
              <a
                className="event-card__location event-card__map"
                href={location}
                target="_blank"
                rel="noreferrer noopener"
              >
                <PinGlyph />
                <span>Auf Karte ansehen</span>
              </a>
            ) : (
              <p className="event-card__location">
                <PinGlyph />
                <span>{location}</span>
              </p>
            )
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default EventCard
