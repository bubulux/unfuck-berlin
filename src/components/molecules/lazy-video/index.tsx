import { useEffect, useRef, useState } from 'react'
import './styles.css'

export interface LazyVideoProps {
  /** Video file URL (e.g. a self-hosted MP4/H.264). */
  src: string
  /** Poster image shown immediately (keeps layout intact while lazy-loading). */
  poster?: string
  /** Accessible title for the video. */
  title?: string
  className?: string
}

const PlayGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PauseGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
)

/**
 * A lazily-loaded, autoplaying (muted, looped) video. The file is only fetched
 * once the element nears the viewport; until the first frame is ready a poster
 * keeps the layout intact. Native controls are hidden — a single overlay button
 * toggles play/pause.
 */
export function LazyVideo({ src, poster, title, className }: LazyVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // Without IntersectionObserver support, load eagerly.
  const [load, setLoad] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(true)

  // Defer loading the video until it's about to enter the viewport.
  useEffect(() => {
    if (load) return
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [load])

  // Ensure muted (required for autoplay) and kick off playback once mounted.
  useEffect(() => {
    if (!load) return
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => setPlaying(false))
  }, [load])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => setPlaying(false))
    } else {
      v.pause()
    }
  }

  const classes = ['lazy-video', className].filter(Boolean).join(' ')
  return (
    <div ref={rootRef} className={classes}>
      {poster ? (
        <img
          className={`lazy-video__poster${ready ? ' is-hidden' : ''}`}
          src={poster}
          alt=""
          aria-hidden="true"
        />
      ) : null}

      {load ? (
        <video
          ref={videoRef}
          className={`lazy-video__el${ready ? ' is-ready' : ''}`}
          src={src}
          poster={poster}
          title={title}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      ) : null}

      {ready ? (
        <button
          type="button"
          className="lazy-video__toggle"
          onClick={toggle}
          aria-label={playing ? 'Video pausieren' : 'Video abspielen'}
        >
          {playing ? <PauseGlyph /> : <PlayGlyph />}
        </button>
      ) : null}
    </div>
  )
}

export default LazyVideo
