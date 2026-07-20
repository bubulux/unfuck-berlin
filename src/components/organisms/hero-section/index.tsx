import { Link as RouterLink } from 'react-router'
import { Text } from '../../atoms/text'
import { Button } from '../../atoms/button'
import './styles.css'

export interface HeroSectionProps {
  /** YouTube embed URL (privacy: prefer the youtube-nocookie.com domain). */
  videoSrc: string
  videoTitle: string
  /** Optional headline logo shown over/next to the video (e.g. the "unf*ck
   * berlin" graphic). */
  logoSrc?: string
  logoAlt?: string
  text: string
  ctaLabel: string
  /** CTA target — internal route… */
  ctaTo?: string
  /** …or external URL. */
  ctaHref?: string
  /** Autoplay the video (muted + looped, as browsers require). Defaults to true. */
  autoplay?: boolean
}

/** Append autoplay params to a YouTube embed URL (muted is required for autoplay). */
function withAutoplay(src: string): string {
  const id = src.split('/embed/')[1]?.split(/[?&]/)[0]
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    playsinline: '1',
    controls: '0',
  })
  if (id) {
    params.set('loop', '1')
    params.set('playlist', id)
  }
  return `${src}${src.includes('?') ? '&' : '?'}${params.toString()}`
}

export function HeroSection({
  videoSrc,
  videoTitle,
  logoSrc,
  logoAlt,
  text,
  ctaLabel,
  ctaTo,
  ctaHref,
  autoplay = true,
}: HeroSectionProps) {
  const src = autoplay ? withAutoplay(videoSrc) : videoSrc
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__media">
          <iframe
            className="hero__video"
            src={src}
            title={videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          <div className="hero__gradient" aria-hidden="true" />
        </div>

        <div className="hero__content">
          {logoSrc ? (
            <img className="hero__logo" src={logoSrc} alt={logoAlt ?? ''} />
          ) : null}

          <Text as="p" variant="body" color="white" className="hero__text">
            {text}
          </Text>

          <div className="flex">
          {ctaHref ? (
            <Button as="a" href={ctaHref} color="neon" className="hero__cta">
              {ctaLabel}
            </Button>
          ) : ctaTo ? (
            <Button as={RouterLink} to={ctaTo} color="neon" className="hero__cta">
              {ctaLabel}
            </Button>
          ) : (
            <Button color="neon" className="hero__cta">
              {ctaLabel}
            </Button>
          )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
