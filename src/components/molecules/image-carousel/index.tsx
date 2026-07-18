import { useEffect, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Icon } from '../../atoms/icon'
import './styles.css'

export interface CarouselImage {
  src: string
  alt: string
}

export interface ImageCarouselProps extends HTMLAttributes<HTMLDivElement> {
  images: CarouselImage[]
}

/** Slides shown at once: 1 (mobile), 2 (tablet ≥48rem), 3 (desktop ≥64rem). */
function readPerView(): number {
  if (typeof window === 'undefined') return 1
  if (window.matchMedia('(min-width: 64rem)').matches) return 3
  if (window.matchMedia('(min-width: 48rem)').matches) return 2
  return 1
}

export function ImageCarousel({ images, className, ...rest }: ImageCarouselProps) {
  const [perView, setPerView] = useState(readPerView)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const queries = [
      window.matchMedia('(min-width: 48rem)'),
      window.matchMedia('(min-width: 64rem)'),
    ]
    const update = () => setPerView(readPerView())
    queries.forEach((q) => q.addEventListener('change', update))
    return () => queries.forEach((q) => q.removeEventListener('change', update))
  }, [])

  const count = images.length
  const maxIndex = Math.max(0, count - perView)
  // Derived so a shrinking maxIndex (on resize) can't leave us past the end.
  const current = Math.min(index, maxIndex)
  const step = 100 / perView

  const go = (i: number) => setIndex(Math.max(0, Math.min(i, maxIndex)))
  const hasControls = count > perView

  const classes = ['carousel', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="carousel__viewport">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${current * step}%)` }}
        >
          {images.map((image) => (
            <div
              className="carousel__slide"
              key={image.src}
              style={{ flex: `0 0 ${step}%` }}
            >
              <img className="carousel__img" src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>

      {hasControls ? (
        <div className="carousel__controls">
          <button
            type="button"
            className="carousel__btn"
            onClick={() => go(current - 1)}
            disabled={current === 0}
            aria-label="Vorherige Bilder"
          >
            <Icon name="chevron-left" />
          </button>

          <div className="carousel__dots">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                type="button"
                key={i}
                className={`carousel__dot${i === current ? ' is-active' : ''}`}
                onClick={() => go(i)}
                aria-label={`Position ${i + 1} von ${maxIndex + 1}`}
                aria-current={i === current}
              />
            ))}
          </div>

          <button
            type="button"
            className="carousel__btn"
            onClick={() => go(current + 1)}
            disabled={current === maxIndex}
            aria-label="Nächste Bilder"
          >
            <Icon name="chevron-right" />
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default ImageCarousel
