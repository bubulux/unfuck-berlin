import type { HTMLAttributes } from 'react'
import './styles.css'

export interface StackImage {
  src: string
  alt: string
}

export interface ImageStackProps extends HTMLAttributes<HTMLElement> {
  images: StackImage[]
  /** Add a gap between images. Defaults to false (seamless stack). */
  gap?: boolean
}

export function ImageStack({ images, gap = false, className, ...rest }: ImageStackProps) {
  const classes = ['image-stack', gap && 'image-stack--gap', className]
    .filter(Boolean)
    .join(' ')
  return (
    <section className={classes} {...rest}>
      <div className="image-stack__inner">
        {images.map((image) => (
          <img
            key={image.src}
            className="image-stack__image"
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>
    </section>
  )
}

export default ImageStack
