import type { HTMLAttributes } from 'react'
import type { ColorToken } from '../text'
import './styles.css'

export interface DateBadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Day or day range, e.g. "22" or "18-19". */
  day: string
  /** Month abbreviation, e.g. "JUL". */
  month: string
  color?: ColorToken
}

export function DateBadge({
  day,
  month,
  color = 'purple',
  className,
  ...rest
}: DateBadgeProps) {
  const classes = ['date-badge', `date-badge--${color}`, className]
    .filter(Boolean)
    .join(' ')
  return (
    <div className={classes} {...rest}>
      <span className="date-badge__day">{day}</span>
      <span className="date-badge__month">{month}</span>
    </div>
  )
}

export default DateBadge
