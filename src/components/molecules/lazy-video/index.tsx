import { useCallback, useEffect, useRef, useState } from 'react'
import './styles.css'

export interface LazyVideoProps {
  /** Video file URL (e.g. a self-hosted MP4/H.264). */
  src: string
  /** Poster image shown immediately (keeps layout intact while lazy-loading). */
  poster?: string
  /** Accessible title for the video. */
  title?: string
  className?: string
  prio?: boolean
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

const MuteGlyph = () => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-43 681-148q-22 13-53 25t-59 16v-101q8-2 20-6.5t20-8.5L497-336v245L248-341H78v-276h147L39-810l68-68 746 766-69 69Zm37-242-71-73q13-28 21.5-58.5T780-479q0-95-60-169.5T569-751v-101q135 24 222 130t87 243q0 52-15 100.5T821-285ZM676-433 569-542v-105q51 23 84 68t33 100q0 12-2 23.5t-8 22.5ZM497-617 375-744l122-123v250Z"/></svg>
)

const UnmuteGlyph = () => (
  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M572-107v-102q93-25 151.5-100.5T782-480q0-95-59.5-169.5T572-752v-102q134 26 220.5 131T879-481q0 136-86 242.5T572-107ZM81-343v-276h169l250-250v776L250-343H81Zm491 30v-335q51 24 83 68t32 99q0 56-32 100t-83 68Z"/></svg>
)

/**
 * A lazily-loaded, autoplaying (muted, looped) video. The file is only fetched
 * once the element nears the viewport; until the first frame is ready a poster
 * keeps the layout intact. Native controls are hidden — a single overlay button
 * toggles play/pause.
 */
export function LazyVideo({ src, poster, title, className, prio = false }: LazyVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  // Without IntersectionObserver support, load eagerly.
  const [load, setLoad] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(false)

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

  const toggleMuted = () => {
    const v = videoRef.current
    if (!v) return
    if (v.muted || v.volume === 0) {
      v.muted = false
      v.volume = 1
    } else {
      v.muted = true
      v.volume = 0
    }

    setMuted(muted => {
      return muted ? false : true
    })
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
          fetch-priority={prio ? 'high' : 'low'}
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
          fetch-priority={prio ? 'high' : 'low'}
        />
      ) : null}

      {ready ? (
        <div className="lazy-video__buttons">
        <button
          type="button"
          className="lazy-video__toggle"
          onClick={toggle}
          aria-label={playing ? 'Video pausieren' : 'Video abspielen'}
          {...{'data-umami-event': 'toggle-video-playing'}}
        >
          {playing ? <PauseGlyph /> : <PlayGlyph />}
        </button>
        <button
          type="button"
          className="lazy-video__toggle"
          onClick={toggleMuted}
          aria-label={muted ? 'Ton einschalten' : 'Ton ausschalten'}
          {...{'data-umami-event': 'toggle-video-muted'}}
        >
          {muted ? <UnmuteGlyph /> : <MuteGlyph />}
        </button>
        </div>
      ) : null}
    </div>
  )
}

export default LazyVideo
