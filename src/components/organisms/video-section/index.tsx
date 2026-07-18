import type { HTMLAttributes } from 'react'
import { VideoPlayer } from '../../molecules/video-player'
import './styles.css'

export interface VideoSectionProps extends HTMLAttributes<HTMLElement> {
  /** Self-hosted video file (MP4/H.264). */
  videoSrc: string
  videoTitle: string
  /** Poster shown before playback. */
  videoPoster?: string
  /** Aspect ratio, e.g. "9 / 16" (portrait, default) or "16 / 9". */
  videoAspect?: string
}

export function VideoSection({
  videoSrc,
  videoTitle,
  videoPoster,
  videoAspect = '9 / 16',
  className,
  ...rest
}: VideoSectionProps) {
  const classes = ['video-section', className].filter(Boolean).join(' ')
  return (
    <section className={classes} {...rest}>
      <VideoPlayer
        className="video-section__frame"
        src={videoSrc}
        poster={videoPoster}
        title={videoTitle}
        aspect={videoAspect}
      />
    </section>
  )
}

export default VideoSection
