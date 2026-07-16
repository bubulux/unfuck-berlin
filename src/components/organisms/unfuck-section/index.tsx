import { Link as RouterLink } from 'react-router'
import { Text } from '../../atoms/text'
import { Button } from '../../atoms/button'
import './styles.css'

export interface UnfuckSectionProps {
  logoSrc: string
  logoAlt: string
  videoSrc: string
  videoTitle: string
  /** Aspect ratio of the video, e.g. "9 / 16" (portrait) or "16 / 9". */
  videoAspect?: string
  text: string
  ctaLabel: string
  ctaTo?: string
  ctaHref?: string
}

export function UnfuckSection({
  logoSrc,
  logoAlt,
  videoSrc,
  videoTitle,
  videoAspect = '9 / 16',
  text,
  ctaLabel,
  ctaTo,
  ctaHref,
}: UnfuckSectionProps) {
  return (
    <section className="unfuck">
      <div className="unfuck__inner">
        <img className="unfuck__logo" src={logoSrc} alt={logoAlt} />

        <div className="unfuck__video" style={{ aspectRatio: videoAspect }}>
          <iframe
            src={videoSrc}
            title={videoTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <Text as="p" variant="body" color="white" align="center" className="unfuck__text">
          {text}
        </Text>

        {ctaHref ? (
          <Button as="a" href={ctaHref} color="neon">
            {ctaLabel}
          </Button>
        ) : ctaTo ? (
          <Button as={RouterLink} to={ctaTo} color="neon">
            {ctaLabel}
          </Button>
        ) : (
          <Button color="neon">{ctaLabel}</Button>
        )}
      </div>
    </section>
  )
}

export default UnfuckSection
