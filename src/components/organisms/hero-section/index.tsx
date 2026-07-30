import { Link as RouterLink } from 'react-router'
import { Text } from '../../atoms/text'
import { Button } from '../../atoms/button'
import { LazyVideo } from '../../molecules/lazy-video'
import './styles.css'

export interface HeroSectionProps {
  /** Self-hosted video file (MP4/H.264). */
  videoSrc: string
  videoTitle: string
  /** Poster shown while the video lazy-loads. */
  videoPoster?: string
  /** Optional headline logo shown over/next to the video (e.g. the "unf*ck
   * berlin" graphic). */
  logoSrc?: string
  logoAlt?: string
  text: React.ReactNode
  ctaLabel: string
  /** CTA target — internal route… */
  ctaTo?: string
  /** …or external URL. */
  ctaHref?: string
}

export function HeroSection({
  videoSrc,
  videoTitle,
  videoPoster,
  logoSrc,
  logoAlt,
  text,
  ctaLabel,
  ctaTo,
  ctaHref,
}: HeroSectionProps) {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__media">
          <LazyVideo
            className="hero__video"
            src={videoSrc}
            poster={videoPoster}
            title={videoTitle}
          />
          <div className="hero__gradient" aria-hidden="true" />
        </div>

        <div className="hero__content">
          {logoSrc ? (
            <img className="hero__logo" src={logoSrc} alt={logoAlt ?? ''} />
          ) : null}

          <Text as="p" variant="body" color="white" className="hero__text" >
            {text}
          </Text>

          <div className="flex">
          {ctaHref ? (
            <Button as="a" href={ctaHref} color="neon" className="hero__cta"
              {...{'data-umami-event': 'hero-cta-click'}}
            >
              {ctaLabel}
            </Button>
          ) : ctaTo ? (
            <Button as={RouterLink} to={ctaTo} color="neon" className="hero__cta"
              {...{'data-umami-event': 'hero-cta-click'}}
            >
              {ctaLabel}
            </Button>
          ) : (
            <Button color="neon" className="hero__cta"
              {...{'data-umami-event': 'hero-cta-click'}}
            >
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
