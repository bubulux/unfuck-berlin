import type { HTMLAttributes } from 'react'
import { Text } from '../../atoms/text'
import { Link } from '../../atoms/link'
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
}

export function WasMehrNav({
  links = WAS_MEHR_LINKS,
  className,
  ...rest
}: WasMehrNavProps) {
  const classes = ['was-mehr', className].filter(Boolean).join(' ')
  return (
    <section className={classes} aria-labelledby="was-mehr-title" {...rest}>
      <div className="was-mehr__inner">
        <Text
          as="h2"
          variant="titel"
          color="purple"
          uppercase
          id="was-mehr-title"
          className="was-mehr__title"
        >
          Was mehr?
        </Text>
        <ul className="was-mehr__list">
          {links.map((link) => (
            <li key={link.label} className="was-mehr__item">
              <Link
                to={link.to}
                href={link.href}
                color="purple"
                className="was-mehr__link"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default WasMehrNav
