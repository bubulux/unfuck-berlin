import type { HTMLAttributes, ReactNode } from 'react'
import { Text } from '../../atoms/text'
import type { ColorToken } from '../../atoms/text'
import { DateBadge } from '../../atoms/date-badge'
import { HighlightText } from '../../atoms/highlight-text'
import './styles.css'
import { Link } from 'react-router'

export interface EventCardProps extends HTMLAttributes<HTMLElement> {
  event_id: string
  /** Day or day range, e.g. "22" or "18-19". */
  day: string
  /** Month abbreviation, e.g. "JUL". */
  month: string
  title: string
  /** Time line, e.g. "17:00–19:00 Uhr" (empty/omitted for all-day). */
  time?: string
  /** Venue/address line. */
  location?: string
  /** Category badge shown above the card's top-left corner. */
  badge?: { label: string; color: ColorToken; textColor: ColorToken }
  /** When set, occurrences of this term in the title are visually marked. */
  highlight?: string
}

/** Wrap every (case-insensitive) occurrence of `query` in `text` with <mark>. */
function highlightMatches(text: string, query?: string): ReactNode {
  const needle = query?.trim().toLowerCase()
  if (!needle) return text
  const hay = text.toLowerCase()
  const parts: ReactNode[] = []
  let i = 0
  let key = 0
  for (let idx = hay.indexOf(needle); idx !== -1; idx = hay.indexOf(needle, i)) {
    if (idx > i) parts.push(text.slice(i, idx))
    parts.push(
      <mark className="event-card__mark" key={key++}>
        {text.slice(idx, idx + needle.length)}
      </mark>,
    )
    i = idx + needle.length
  }
  if (i < text.length) parts.push(text.slice(i))
  return parts
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export function EventCard({
  event_id,
  day,
  month,
  title,
  time,
  location,
  badge,
  highlight,
  className,
  ...rest
}: EventCardProps) {
  const classes = ['event-card', className].filter(Boolean).join(' ')
  return (
    <Link
      to={`/termine/${event_id}`}
      className={classes}
      {...rest}
    >
      {badge ? (
        <HighlightText
          lines={[badge.label]}
          variant="body"
          color={badge.color}
          textColor={badge.textColor}
          direction="column"
          align="left"
          className="event-card__badge"
        />
      ) : null}
      <div className="event-card__layout">
        <DateBadge day={day} month={month} color="black" className="event-card__date" />
        <div className="event-card__body">
          <Text as="h3" variant="body" color="black" weight="bold" className="event-card__title">
            {highlightMatches(title, highlight)}
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
    </Link>
  )
}

export default EventCard
