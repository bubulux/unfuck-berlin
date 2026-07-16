import type { HTMLAttributes } from 'react'
import { ImageCarousel, type CarouselImage } from '../../molecules/image-carousel'
import './styles.css'

export interface CarouselSectionProps extends HTMLAttributes<HTMLElement> {
  images: CarouselImage[]
}

export function CarouselSection({ images, className, ...rest }: CarouselSectionProps) {
  const classes = ['carousel-section', className].filter(Boolean).join(' ')
  return (
    <section className={classes} {...rest}>
      <div className="carousel-section__inner">
        <ImageCarousel images={images} />
      </div>
    </section>
  )
}

export default CarouselSection
