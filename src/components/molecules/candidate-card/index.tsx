import type { HTMLAttributes } from 'react'
import './styles.css'

export interface CandidateCardProps extends HTMLAttributes<HTMLElement> {
  name: string
  image: string
  imageAlt?: string
  listenplatz: number
  bezirk: string
}

export function CandidateCard({
  name,
  image,
  imageAlt,
  listenplatz,
  bezirk,
  className,
  ...rest
}: CandidateCardProps) {
  const classes = ['kandi-card', className].filter(Boolean).join(' ')
  return (
    <article className={classes} {...rest}>
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
    </article>
  )
}

export default CandidateCard
