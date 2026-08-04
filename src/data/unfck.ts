import { UNFCK_COLLAGE_CMS } from './unfck.generated'

export interface CollageImage {
  src: string
  alt: string
}

/**
 * Lokale Kopien in public/pics/unfck als Notnagel, falls der Sanity-Abruf beim
 * Build fehlschlaegt. Im Normalfall gewinnt die CMS-Collage (seiteUnfck.collage1).
 */
const FALLBACK: CollageImage[] = []

const CMS = UNFCK_COLLAGE_CMS as CollageImage[]

export const UNFCK_COLLAGE: CollageImage[] = CMS.length ? CMS : FALLBACK
