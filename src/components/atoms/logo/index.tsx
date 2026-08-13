import type { ImgHTMLAttributes } from 'react'
import './styles.css'

export type LogoVariant = 'white' | 'purple'

export interface LogoProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  /** `white` on dark backgrounds, `purple` on light. */
  variant?: LogoVariant
  /** CSS height (the wordmark scales by height). Defaults to 1.5rem. */
  height?: string
  alt?: string
}

const SRC: Record<LogoVariant, string> = {
  white: '/logos/logoWhite.svg',
  purple: '/logos/logoLila.svg',
}

export function Logo({
  variant = 'white',
  height = '1.5rem',
  alt = 'Volt Berlin',
  className,
  style,
  ...rest
}: LogoProps) {
  const classes = ['logo', className].filter(Boolean).join(' ')
  return (
    <img
      className={classes}
      src={SRC[variant]}
      alt={alt}
      style={{ height, ...style }}
      {...rest}
    />
  )
}

export default Logo
