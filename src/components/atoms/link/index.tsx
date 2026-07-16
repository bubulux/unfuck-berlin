import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router'
import type { ColorToken } from '../text'
import './styles.css'

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'color'> {
  /** Internal route (uses react-router). */
  to?: string
  /** External URL (renders a plain anchor; opens in new tab by default). */
  href?: string
  color?: ColorToken
  /** Marks the current page (adds active styling + aria-current). */
  active?: boolean
  /** Show underline. Defaults to false (nav-style). */
  underline?: boolean
  children: ReactNode
}

export function Link({
  to,
  href,
  color = 'white',
  active = false,
  underline = false,
  className,
  children,
  target,
  rel,
  ...rest
}: LinkProps) {
  const classes = [
    'link',
    `link--${color}`,
    active && 'link--active',
    underline && 'link--underline',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        className={classes}
        href={href}
        target={target ?? (external ? '_blank' : undefined)}
        rel={rel ?? (external ? 'noreferrer noopener' : undefined)}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <RouterLink
      className={classes}
      to={to ?? '#'}
      aria-current={active ? 'page' : undefined}
      {...rest}
    >
      {children}
    </RouterLink>
  )
}

export default Link
