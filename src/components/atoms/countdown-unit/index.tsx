import type { HTMLAttributes, ReactNode } from 'react'
import './styles.css'

export interface CountdownUnitProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode
  label: ReactNode
}

export function CountdownUnit({
  value,
  label,
  className,
  ...rest
}: CountdownUnitProps) {
  const classes = ['countdown-unit', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      <span className="countdown-unit__value">{value}</span>
      <span className="countdown-unit__label">{label}</span>
    </div>
  )
}

export default CountdownUnit
