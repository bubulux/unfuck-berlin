import { useRef, useState } from 'react'
import type { CSSProperties, HTMLAttributes } from 'react'
import './styles.css'

export interface VideoPlayerProps extends HTMLAttributes<HTMLDivElement> {
  /** Self-hosted video file (MP4/H.264). */
  src: string
  /** Poster image shown before playback (keeps the file unfetched until play). */
  poster?: string
  /** Accessible title for the video. */
  title?: string
  /** Aspect ratio, e.g. "9 / 16" (portrait, default) or "16 / 9". */
  aspect?: string
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

const VolumeGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4z" />
    <path
      d="M16 8.5a4 4 0 0 1 0 7M18.5 6a7 7 0 0 1 0 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

const MuteGlyph = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4z" />
    <path
      d="M16 9.5l5 5M21 9.5l-5 5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
)

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/**
 * A self-hosted video with a custom, on-brand player UI: a prominent centre
 * play/pause button plus a bottom bar with a play/pause toggle, a neon
 * scrubber and a timestamp. No native controls (no fullscreen/download/
 * settings). `preload="none"` keeps the file unfetched until the first play.
 */
export function VideoPlayer({
  src,
  poster,
  title,
  aspect = '9 / 16',
  className,
  ...rest
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
    } else {
      v.pause()
    }
  }

  const seek = (value: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = value
    setCurrent(value)
  }

  const changeVolume = (value: number) => {
    const v = videoRef.current
    if (!v) return
    v.volume = value
    v.muted = value === 0
    setVolume(value)
    setMuted(value === 0)
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    const next = !v.muted
    v.muted = next
    setMuted(next)
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0
  const level = muted ? 0 : volume

  const classes = [
    'video-player',
    playing ? 'is-playing' : 'is-paused',
    started ? 'is-started' : 'is-idle',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} style={{ aspectRatio: aspect }} {...rest}>
      <video
        ref={videoRef}
        className="video-player__el"
        src={src}
        poster={poster}
        title={title}
        preload="none"
        playsInline
        onClick={toggle}
        onPlay={() => {
          setPlaying(true)
          setStarted(true)
        }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onVolumeChange={(e) => {
          setVolume(e.currentTarget.volume)
          setMuted(e.currentTarget.muted)
        }}
      />

      <div className="video-player__scrim" aria-hidden="true" />

      <button
        type="button"
        className="video-player__center"
        onClick={toggle}
        aria-label={playing ? 'Video pausieren' : 'Video abspielen'}
      >
        {playing ? <PauseGlyph /> : <PlayGlyph />}
      </button>

      <div className="video-player__bar">
        <button
          type="button"
          className="video-player__btn"
          onClick={toggle}
          aria-label={playing ? 'Video pausieren' : 'Video abspielen'}
        >
          {playing ? <PauseGlyph /> : <PlayGlyph />}
        </button>

        <input
          type="range"
          className="video-player__scrubber"
          min={0}
          max={duration || 0}
          step="any"
          value={Math.min(current, duration || 0)}
          onChange={(e) => seek(Number(e.target.value))}
          style={{ '--progress': `${progress}%` } as CSSProperties}
          aria-label="Zeitachse"
        />

        <div className="video-player__volume">
          <button
            type="button"
            className="video-player__btn"
            onClick={toggleMute}
            aria-label={level === 0 ? 'Ton einschalten' : 'Ton ausschalten'}
          >
            {level === 0 ? <MuteGlyph /> : <VolumeGlyph />}
          </button>

          <input
            type="range"
            className="video-player__vol"
            min={0}
            max={1}
            step="any"
            value={level}
            onChange={(e) => changeVolume(Number(e.target.value))}
            style={{ '--progress': `${level * 100}%` } as CSSProperties}
            aria-label="Lautstärke"
          />
        </div>

        <span className="video-player__time">
          {formatTime(current)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  )
}

export default VideoPlayer
