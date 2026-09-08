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
 * Notnagel, falls der Sanity-Abruf beim Build keine Video-Dateien liefert:
 * leere URLs, damit die Komponenten nichts Kaputtes laden. Gepflegt werden die
 * Videos im Sanity Studio unter "Videos" (Dokumenttyp `videos`).
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
