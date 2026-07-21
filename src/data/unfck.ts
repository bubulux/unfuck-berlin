import { UNFCK_COLLAGE_CMS } from './unfck.generated'

export interface CollageImage {
  src: string
  alt: string
}

/**
 * Lokale Kopien in public/pics/unfck als Notnagel, falls der Sanity-Abruf beim
 * Build fehlschlaegt. Im Normalfall gewinnt die CMS-Collage (seiteUnfck.collage1).
 */
const FALLBACK: CollageImage[] = [
  { src: '/pics/unfck/1.png', alt: 'unf*ck berlin 1' },
  { src: '/pics/unfck/2.png', alt: 'unf*ck berlin 2' },
  { src: '/pics/unfck/3.png', alt: 'unf*ck berlin 3' },
  { src: '/pics/unfck/4.png', alt: 'unf*ck berlin 4' },
  { src: '/pics/unfck/5.png', alt: 'unf*ck berlin 5' },
]

const CMS = UNFCK_COLLAGE_CMS as CollageImage[]

export const UNFCK_COLLAGE: CollageImage[] = CMS.length ? CMS : FALLBACK
