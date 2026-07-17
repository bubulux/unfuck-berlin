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
  /** Location and/or time line. */
  details?: string
}

export function EventCard({
  day,
  month,
  title,
  details,
  className,
  ...rest
}: EventCardProps) {
  const classes = ['event-card', className].filter(Boolean).join(' ')
  return (
    <article className={classes} {...rest}>
      <DateBadge day={day} month={month} color="purple" className="event-card__date" />
      <div className="event-card__body">
        <Text as="h3" variant="body" color="purple" weight="bold">
          {title}
        </Text>
        {details ? (
          <Text as="p" variant="body" color="purple" className="event-card__details">
            {details}
          </Text>
        ) : null}
      </div>
    </article>
  )
}

export default EventCard
