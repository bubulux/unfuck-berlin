import { useEffect, useRef, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Logo } from '../../atoms/logo'
import { Link } from '../../atoms/link'
import { Icon } from '../../atoms/icon'
import { HEADER_INLINE_LINKS, NAV_LINKS } from '../../../config/navigation'
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
  /** Vollstaendiges Menue im Burger-Panel. */
  links?: NavItem[]
  /**
   * Die wenigen Links, die direkt in der Kopfzeile stehen. Absichtlich eine
   * kurze Auswahl – der Rest bleibt dem Burger-Menue vorbehalten, damit die
   * Zeile auf schmalen Screens nicht umbricht.
   */
  inlineLinks?: NavItem[]
  /** Path of the current page, to highlight the active link. */
  activePath?: string
  /** `purple`: white logo/text on purple. `light`: purple logo/text on white. */
  variant?: SiteHeaderVariant
}

export function SiteHeader({
  links = NAV_LINKS,
  inlineLinks = HEADER_INLINE_LINKS,
  activePath,
  variant = 'purple',
  className,
  ...rest
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const accent = variant === 'light' ? 'purple' : 'white'

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const classes = [
    'site-header',
    `site-header--${variant}`,
    open && 'site-header--open',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={classes} ref={headerRef} {...rest}>
      <div className="site-header__inner">
        <Link
          to="/"
          aria-label="Startseite"
          color={accent}
          className="site-header__logo"
          {...{'data-umami-event': 'header-logo-click'}}
        >
          <Logo variant={accent} height="1.75rem" />
        </Link>

        <nav className="site-header__nav" aria-label="Schnellzugriff">
          {inlineLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              href={item.href}
              active={activePath === item.to}
              color={accent}
              className="site-header__link"
              {...{'data-umami-event': 'header-nav-link-click'}}
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
          {...{'data-umami-event': 'toggle-menu'}}
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
            {...{'data-umami-event': 'header-nav-link-click'}}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  )
}

export default SiteHeader
