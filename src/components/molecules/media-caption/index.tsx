import type { HTMLAttributes } from 'react'
import { Link } from '../../atoms/link'
import { Icon } from '../../atoms/icon'
import './styles.css'

export interface MediaCaptionProps extends HTMLAttributes<HTMLElement> {
  src: string
  alt: string
  /** Optional caption link shown below the image. */
  captionLabel?: string
  captionTo?: string
  captionHref?: string
}

export function MediaCaption({
  src,
  alt,
  captionLabel,
  captionTo,
  captionHref,
  className,
  ...rest
}: MediaCaptionProps) {
  const classes = ['media-caption', className].filter(Boolean).join(' ')
  return (
    <figure className={classes} {...rest}>
      <img className="media-caption__image" src={src} alt={alt} />
      {captionLabel ? (
        <figcaption className="media-caption__caption">
          <Link
            to={captionTo}
            href={captionHref}
            color="purple"
            iconRight={<Icon name="arrow-right" />}
            className="media-caption__link"
          >
            {captionLabel}
          </Link>
        </figcaption>
      ) : null}
    </figure>
  )
}

export default MediaCaption
