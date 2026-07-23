import type { HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router'
import './styles.css'

export interface CandidateCardProps extends HTMLAttributes<HTMLElement> {
  name: string
  image: string
  imageAlt?: string
  listenplatz: number
  bezirk: string
  /** Wenn gesetzt, wird die Karte zu einem Link auf die Bio-Seite. */
  to?: string
}

export function CandidateCard({
  name,
  image,
  imageAlt,
  listenplatz,
  bezirk,
  to,
  className,
  ...rest
}: CandidateCardProps) {
  const classes = ['kandi-card', className].filter(Boolean).join(' ')
  const inner: ReactNode = (
    <>
      <div className="kandi-card__frame">
        <img
          className="kandi-card__img"
          src={image}
          alt={imageAlt ?? name}
          loading="lazy"
        />
      </div>
      <div className="kandi-card__name">{name}</div>
      <div className="kandi-card__meta">Listen Platz {listenplatz}</div>
      <div className="kandi-card__meta">{bezirk}</div>
    </>
  )
  return (
    <article className={classes} {...rest}>
      {to ? (
        <Link className="kandi-card__link" to={to}>
          {inner}
        </Link>
      ) : (
        inner
      )}
    </article>
  )
}

export default CandidateCard
