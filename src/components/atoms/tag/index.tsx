import type { HTMLAttributes, ReactNode } from 'react'
import type { ColorToken } from '../text'
import './styles.css'

export type TagVariant = 'pill' | 'label'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** Solid rounded pill (category) or bare eyebrow label. */
  variant?: TagVariant
  color?: ColorToken
  children: ReactNode
}

export function Tag({
  variant = 'pill',
  color = 'neon',
  className,
  children,
  ...rest
}: TagProps) {
  const classes = ['tag', `tag--${variant}`, `tag--${color}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}

export default Tag
