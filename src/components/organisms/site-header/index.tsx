import { useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Logo } from '../../atoms/logo'
import { Link } from '../../atoms/link'
import { Icon } from '../../atoms/icon'
import { NAV_LINKS } from '../../../config/navigation'
import './styles.css'

export interface NavItem {
  label: string
  /** Internal route… */
  to?: string
  /** …or external URL. */
  href?: string
}

export type SiteHeaderVariant = 'purple' | 'light'

export interface SiteHeaderProps extends HTMLAttributes<HTMLElement> {
  links?: NavItem[]
  /** Path of the current page, to highlight the active link. */
  activePath?: string
  /** `purple`: white logo/text on purple. `light`: purple logo/text on white. */
  variant?: SiteHeaderVariant
}

export function SiteHeader({
  links = NAV_LINKS,
  activePath,
  variant = 'purple',
  className,
  ...rest
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const accent = variant === 'light' ? 'purple' : 'white'

  const classes = [
    'site-header',
    `site-header--${variant}`,
    open && 'site-header--open',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={classes} {...rest}>
      <div className="site-header__inner">
        <Link
          to="/"
          aria-label="Startseite"
          color={accent}
          className="site-header__logo"
        >
          <Logo variant={accent} height="1.75rem" />
        </Link>

        <nav className="site-header__nav" aria-label="Hauptnavigation">
          {links.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              href={item.href}
              active={activePath === item.to}
              color={accent}
              className="site-header__link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="site-header__burger"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          aria-expanded={open}
          aria-controls="site-header-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? 'close' : 'menu'} size="1.75rem" />
        </button>
      </div>

      <nav
        id="site-header-menu"
        className="site-header__panel"
        aria-label="Hauptnavigation"
      >
        {links.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            href={item.href}
            active={activePath === item.to}
            color={accent}
            className="site-header__panel-link"
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default SiteHeader
