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
    src: '',
    poster: '',
  },
  reveal: {
    src: '',
    poster: '',
  },
}

const CMS = VIDEOS_CMS as VideosContent

export const VIDEOS: VideosContent =
  CMS?.annaPaulIntro?.src && CMS?.reveal?.src ? CMS : FALLBACK
