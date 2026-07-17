import type { HTMLAttributes, ReactNode } from 'react'
import type { ColorToken } from '../text'
import './styles.css'

export type TagVariant = 'pill' | 'label'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Solid rounded pill (category) or bare eyebrow label. */
  variant?: TagVariant
  color?: ColorToken
  /** Uppercase the label. Defaults to true. */
  uppercase?: boolean
  children: ReactNode
}

export function Tag({
  variant = 'pill',
  color = 'neon',
  uppercase = true,
  className,
  children,
  ...rest
}: TagProps) {
  const classes = [
    'tag',
    `tag--${variant}`,
    `tag--${color}`,
    !uppercase && 'tag--no-uppercase',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}

export default Tag
