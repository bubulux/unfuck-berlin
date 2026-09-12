import { Link } from 'react-router'
import { Icon } from '../../atoms/icon'
import {
  CTA_VARIANT_LABELS,
  parseDocument,
  parseLanguage,
  type CtaCollectionKind,
  type CtaItem,
  type CtaVariant,
} from './model'
import './styles.css'

/** Interne Links bleiben im Router, externe gehen im neuen Tab auf. */
function CtaLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string
  className: string
  children: React.ReactNode
  ariaLabel?: string
}) {
  const isExternal = /^https?:\/\//.test(href)
  if (isExternal) {
    return (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }
  return (
    <Link className={className} to={href} aria-label={ariaLabel}>
      {children}
    </Link>
  )
}

export interface CtaCollectionProps {
  items: CtaItem[]
  kind: CtaCollectionKind
  variant: CtaVariant
}

/**
 * Ersetzt eine Reihe gleichfoermiger CTA-Buttons durch eine gestaltete
 * Sammlung. Drei Entwuerfe, jeweils getrennt fuer Sprachfassungen und
 * Dokumente – die beiden Sorten tragen sehr unterschiedlich viel Inhalt.
 */
export function CtaCollection({ items, kind, variant }: CtaCollectionProps) {
  if (!items.length) return null

  const classes = [
    'cta-collection',
    `cta-collection--${kind}`,
    `cta-collection--v${variant}`,
  ].join(' ')

  if (kind === 'sprachen') {
    return (
      <ul className={classes}>
        {items.map((item, index) => {
          const { flag, name, code } = parseLanguage(item)
          return (
            <li
              key={item.key}
              className="cta-collection__item"
              data-swatch={index % 5}
            >
              <CtaLink
                href={item.href}
                className="cta-card"
                ariaLabel={item.label}
              >
                <span className="cta-card__flag" aria-hidden="true">
                  {flag || code.slice(0, 2)}
                </span>
                <span className="cta-card__name" dir="auto">
                  {name}
                </span>
                <span className="cta-card__arrow" aria-hidden="true">
                  <Icon size="1em" name="arrow-right" />
                </span>
              </CtaLink>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <ul className={classes}>
      {items.map((item, index) => {
        const { eyebrow, topic } = parseDocument(item)
        return (
          <li
            key={item.key}
            className="cta-collection__item"
            data-swatch={index % 2}
          >
            <CtaLink href={item.href} className="cta-doc" ariaLabel={item.label}>
              <span className="cta-doc__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {eyebrow ? (
                <span className="cta-doc__eyebrow">{eyebrow}</span>
              ) : null}
              <span className="cta-doc__topic">{topic}</span>
              <span className="cta-doc__arrow">
                lesen
                <Icon size="1em" name="arrow-right" />
              </span>
            </CtaLink>
          </li>
        )
      })}
    </ul>
  )
}

export interface CtaVariantSwitcherProps {
  value: CtaVariant
  onChange: (variant: CtaVariant) => void
  /** Beschriftung fuer Screenreader, damit beide Umschalter unterscheidbar sind. */
  label: string
}

/**
 * Temporaerer Umschalter fuer das Review – gehoert nicht ins fertige Design.
 */
export function CtaVariantSwitcher({
  value,
  onChange,
  label,
}: CtaVariantSwitcherProps) {
  return (
    <div className="cta-switcher" role="group" aria-label={label}>
      <span className="cta-switcher__hint">Entwurf</span>
      {([1, 2, 3] as CtaVariant[]).map((variant) => (
        <button
          key={variant}
          type="button"
          className={[
            'cta-switcher__tab',
            value === variant && 'cta-switcher__tab--active',
          ]
            .filter(Boolean)
            .join(' ')}
          aria-pressed={value === variant}
          onClick={() => onChange(variant)}
        >
          {variant}. {CTA_VARIANT_LABELS[variant]}
        </button>
      ))}
    </div>
  )
}

export default CtaCollection
