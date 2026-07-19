import { Link as RouterLink } from 'react-router'
import { Text } from '../../atoms/text'
import { Button } from '../../atoms/button'
import { VideoPlayer } from '../../molecules/video-player'
import './styles.css'

export interface UnfuckSectionProps {
  logoSrc: string
  logoAlt: string
  /** Self-hosted video file (MP4/H.264). */
  videoSrc: string
  videoTitle: string
  /** Poster shown before playback. */
  videoPoster?: string
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
  videoPoster,
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

        <VideoPlayer
          className="unfuck__video"
          src={videoSrc}
          poster={videoPoster}
          title={videoTitle}
          aspect={videoAspect}
        />

        <div className="unfuck__copy">
          <Text as="p" variant="body" color="white" className="unfuck__text">
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
      </div>
    </section>
  )
}

export default UnfuckSection
