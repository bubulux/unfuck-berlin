import { VIDEOS_CMS } from './videos.generated'

export interface VideoAsset {
  src: string
  poster: string
}

export interface VideosContent {
  annaPaulIntro: VideoAsset
  reveal: VideoAsset
}

/**
 * Lokale Kopien in public/vids als Notnagel, falls der Sanity-Abruf beim Build
 * fehlschlaegt. Im Normalfall gewinnen die aus dem CMS generierten URLs.
 */
const FALLBACK: VideosContent = {
  annaPaulIntro: {
    src: '/vids/anna_paul_intro.mp4',
    poster: '/vids/anna_paul_intro_poster.jpg',
  },
  reveal: {
    src: '/vids/20260715_VOLT_UNFCK_REVEAL_LONG_VERSION_FINAL_XtraSmall.mp4',
    poster: '/vids/unfck_reveal_poster.jpg',
  },
}

const CMS = VIDEOS_CMS as VideosContent

export const VIDEOS: VideosContent =
  CMS?.annaPaulIntro?.src && CMS?.reveal?.src ? CMS : FALLBACK
