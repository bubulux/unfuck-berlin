import type { HTMLAttributes } from 'react'
import { Link } from '../../atoms/link'
import './styles.css'

export interface MediaOverlayProps extends HTMLAttributes<HTMLElement> {
  src: string
  alt: string
  /** Caption link shown over the bottom of the image. */
  captionLabel?: string
  captionTo?: string
  captionHref?: string
}

/**
 * An image with a caption link laid over its bottom edge. A dark gradient scrim
 * sits behind the caption so the (white) text keeps sufficient contrast against
 * any photo.
 */
export function MediaOverlay({
  src,
  alt,
  captionLabel,
  captionTo,
  captionHref,
  className,
  ...rest
}: MediaOverlayProps) {
  const classes = ['media-overlay', className].filter(Boolean).join(' ')
  const hasLink = Boolean(captionLabel && (captionTo || captionHref))
  return (
    <figure className={classes} {...rest}>
      <img className="media-overlay__image" src={src} alt={alt} />
      {hasLink ? (
        <>
          <div className="media-overlay__scrim" aria-hidden="true" />
          <Link
            to={captionTo}
            href={captionHref}
            color="white"
            className="media-overlay__caption"
          >
            {captionLabel}
            <span className="media-overlay__arrow" aria-hidden="true">
              {' '}
              →
            </span>
          </Link>
        </>
      ) : null}
    </figure>
  )
}

export default MediaOverlay
