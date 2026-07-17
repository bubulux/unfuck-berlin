import type { HTMLAttributes } from 'react'
import type { ColorToken } from '../text'
import './styles.css'

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  color?: ColorToken
  /** Band height. Defaults to var(--space-6). */
  height?: string
}

export function Divider({
  color = 'neon',
  height,
  className,
  style,
  ...rest
}: DividerProps) {
  const classes = ['divider', `divider--${color}`, className]
    .filter(Boolean)
    .join(' ')
  return (
    <div
      className={classes}
      role="separator"
      style={height ? { height, ...style } : style}
      {...rest}
    />
  )
}

export default Divider
