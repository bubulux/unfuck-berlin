import type { HTMLAttributes } from 'react'
import { Link } from '../../atoms/link'
import { Icon } from '../../atoms/icon'
import { HighlightText } from '../../atoms/highlight-text'
import { WAS_MEHR_LINKS } from '../../../config/navigation'
import './styles.css'

export interface WasMehrLink {
  label: string
  /** Internal route… */
  to?: string
  /** …or external URL. */
  href?: string
}

export interface WasMehrNavProps extends HTMLAttributes<HTMLElement> {
  links?: WasMehrLink[]
  /** Show the round scroll-to-top button. Defaults to true. */
  showScrollTop?: boolean
}

function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function WasMehrNav({
  links = WAS_MEHR_LINKS,
  showScrollTop = true,
  className,
  ...rest
}: WasMehrNavProps) {
  const classes = ['was-mehr', className].filter(Boolean).join(' ')
  return (
    <section className={classes} aria-labelledby="was-mehr-title" {...rest}>
      <div className="was-mehr__inner">
        {/* <HighlightText
          as="h2"
          id="was-mehr-title"
          className="was-mehr__title"
          lines={['Was', 'Mehr?']}
          variant="titel"
          color="neon"
          textColor="purple"
          slant={0.1}
          uppercase
        /> */}

        <nav className="was-mehr__links" aria-label="Was mehr?">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              href={link.href}
              color="neon"
              className="was-mehr__link"
            >
              {link.label}
              <span className="was-mehr__dot" aria-hidden="true">
                .
              </span>
            </Link>
          ))}
        </nav>

        {showScrollTop ? (
          <div className="was-mehr__scroll">
            <button
              type="button"
              className="was-mehr__scroll-btn"
              aria-label="Nach oben scrollen"
              onClick={scrollToTop}
            >
              <Icon name="arrow-up" size="1.75rem" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default WasMehrNav
