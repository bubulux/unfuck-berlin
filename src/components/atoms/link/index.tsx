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
  /** Optional icon before the label. */
  iconLeft?: ReactNode
  /** Optional icon after the label (e.g. a trailing arrow). */
  iconRight?: ReactNode
  children: ReactNode
}

export function Link({
  to,
  href,
  color = 'white',
  active = false,
  underline = false,
  iconLeft,
  iconRight,
  className,
  children,
  target,
  rel,
  ...rest
}: LinkProps) {
  const hasIcon = Boolean(iconLeft || iconRight)
  const classes = [
    'link',
    `link--${color}`,
    active && 'link--active',
    underline && 'link--underline',
    hasIcon && 'link--with-icon',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {iconLeft ? (
        <span className="link__icon" aria-hidden="true">
          {iconLeft}
        </span>
      ) : null}
      <span className="link__label">{children}</span>
      {iconRight ? (
        <span className="link__icon" aria-hidden="true">
          {iconRight}
        </span>
      ) : null}
    </>
  )

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
        {content}
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
      {content}
    </RouterLink>
  )
}

export default Link
