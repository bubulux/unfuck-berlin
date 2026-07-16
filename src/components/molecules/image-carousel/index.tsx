import { useState } from 'react'
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

export function ImageCarousel({ images, className, ...rest }: ImageCarouselProps) {
  const [index, setIndex] = useState(0)
  const count = images.length
  const go = (i: number) => setIndex((i + count) % count)

  const classes = ['carousel', className].filter(Boolean).join(' ')

  return (
    <div className={classes} {...rest}>
      <div className="carousel__viewport">
        <div
          className="carousel__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((image) => (
            <div className="carousel__slide" key={image.src}>
              <img className="carousel__img" src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              className="carousel__btn carousel__btn--prev"
              onClick={() => go(index - 1)}
              aria-label="Vorheriges Bild"
            >
              <Icon name="chevron-left" />
            </button>
            <button
              type="button"
              className="carousel__btn carousel__btn--next"
              onClick={() => go(index + 1)}
              aria-label="Nächstes Bild"
            >
              <Icon name="chevron-right" />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="carousel__dots">
          {images.map((image, i) => (
            <button
              type="button"
              key={image.src}
              className={`carousel__dot${i === index ? ' is-active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Bild ${i + 1} von ${count}`}
              aria-current={i === index}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default ImageCarousel
