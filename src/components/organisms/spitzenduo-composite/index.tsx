import type { CSSProperties, HTMLAttributes } from 'react'
import { Link as RouterLink } from 'react-router'
import { Text } from '../../atoms/text'
import { SPITZENDUO, type SpitzenPerson } from '../../../data/spitzenduo'
import './styles.css'

export interface SpitzenduoCompositeProps extends HTMLAttributes<HTMLElement> {
  /** Personen (Default: Anna & Paul aus dem spitzenduo-CMS). */
  people?: SpitzenPerson[]
}

/**
 * Zwei eigenstaendige Karten (Anna, Paul). Jede Karte: Name oben, Foto seitlich,
 * "kennen lernen"-Link unten. Die zweite Karte ist gespiegelt. Die ganze Karte
 * verlinkt auf die jeweilige Detailseite.
 */
export function SpitzenduoComposite({
  people = SPITZENDUO,
  className,
  ...rest
}: SpitzenduoCompositeProps) {
  const classes = ['spitzenduo', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      {people.map((person, i) => (
        <RouterLink
          key={person.to || `${person.vorname}-${i}`}
          to={person.to}
          className={`spitzenduo-card${i % 2 === 1 ? ' spitzenduo-card--reverse' : ''}`}
          style={{ '--card-bg': person.bg } as CSSProperties}
          aria-label={`${person.alt} kennen lernen`}
        >
          <img className="spitzenduo-card__img" src={person.image} alt={person.alt} />

          <div className="spitzenduo-card__text">
            <div className="spitzenduo-card__head">
              <Text
                as="span"
                variant="subtitel"
                color="white"
                uppercase
                className="spitzenduo-card__name"
              >
                {person.vorname}
                <br />
                {person.nachname}
              </Text>
              {person.role ? (
                <span className="spitzenduo-card__role">{person.role}</span>
              ) : null}
            </div>
            <span className="spitzenduo-card__cta">
              kennen lernen
              <span className="spitzenduo-card__arrow" aria-hidden="true">
                {' '}
                →
              </span>
            </span>
          </div>
        </RouterLink>
      ))}
    </div>
  )
}

export default SpitzenduoComposite
