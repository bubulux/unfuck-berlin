import type { HTMLAttributes } from 'react'
import { Logo } from '../../atoms/logo'
import { Link } from '../../atoms/link'
import { NAV_LINKS } from '../../../config/navigation'
import './styles.css'

export interface NavItem {
  label: string
  to: string
}

export interface SiteHeaderProps extends HTMLAttributes<HTMLElement> {
  links?: NavItem[]
  /** Path of the current page, to highlight the active link. */
  activePath?: string
}

export function SiteHeader({
  links = NAV_LINKS,
  activePath,
  className,
  ...rest
}: SiteHeaderProps) {
  const classes = ['site-header', className].filter(Boolean).join(' ')
  return (
    <header className={classes} {...rest}>
      <div className="site-header__inner">
        <Link to="/" aria-label="Startseite" className="site-header__logo">
          <Logo variant="white" height="1.75rem" />
        </Link>
        <nav className="site-header__nav" aria-label="Hauptnavigation">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              active={activePath === item.to}
              className="site-header__link"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader
