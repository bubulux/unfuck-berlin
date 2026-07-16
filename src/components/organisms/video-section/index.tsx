import type { HTMLAttributes } from 'react'
import './styles.css'

export interface VideoSectionProps extends HTMLAttributes<HTMLElement> {
  /** YouTube embed URL (privacy: prefer the youtube-nocookie.com domain). */
  videoSrc: string
  videoTitle: string
  /** Aspect ratio, e.g. "9 / 16" (portrait, default) or "16 / 9". */
  videoAspect?: string
  /** Autoplay (muted + looped, as browsers require). Defaults to false. */
  autoplay?: boolean
}

function withAutoplay(src: string): string {
  const id = src.split('/embed/')[1]?.split(/[?&]/)[0]
  const params = new URLSearchParams({ autoplay: '1', mute: '1', playsinline: '1' })
  if (id) {
    params.set('loop', '1')
    params.set('playlist', id)
  }
  return `${src}${src.includes('?') ? '&' : '?'}${params.toString()}`
}

export function VideoSection({
  videoSrc,
  videoTitle,
  videoAspect = '9 / 16',
  autoplay = false,
  className,
  ...rest
}: VideoSectionProps) {
  const src = autoplay ? withAutoplay(videoSrc) : videoSrc
  const classes = ['video-section', className].filter(Boolean).join(' ')
  return (
    <section className={classes} {...rest}>
      <div className="video-section__frame" style={{ aspectRatio: videoAspect }}>
        <iframe
          src={src}
          title={videoTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </section>
  )
}

export default VideoSection
