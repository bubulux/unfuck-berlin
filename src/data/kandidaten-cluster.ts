import { KANDIDATEN_CLUSTER_CMS } from './kandidaten-cluster.generated'

export interface ClusterImage {
  image: string
  alt: string
}

/**
 * Notnagel (lokale Portraits), falls der Sanity-Abruf beim Build fehlschlaegt.
 * Reihenfolge wie im CMS-Build (siehe CLUSTER_SLUGS in fetch-content.mjs).
 */
const FALLBACK: ClusterImage[] = [
  { image: '/pics/kandis/rainer-seider.png', alt: 'Rainer Seider' },
  { image: '/pics/kandis/aiga-marie-senftleben.png', alt: 'Aiga Marie Senftleben' },
  { image: '/pics/kandis/rafael-kaaz.png', alt: 'Rafael Kaaz' },
  { image: '/pics/kandis/ingo-partey.png', alt: 'Ingo Partey' },
  { image: '/pics/kandis/juliane-kalbacher.png', alt: 'Juliane Kalbacher' },
  { image: '/pics/kandis/cara-seeberg.png', alt: 'Cara Seeberg' },
  { image: '/pics/kandis/theresa-schueltken.png', alt: 'Theresa Schültken' },
  { image: '/pics/kandis/pia-voltz.png', alt: 'Pia Voltz' },
  { image: '/pics/kandis/sascha-hellwig.png', alt: 'Sascha Hellwig' },
]

const CMS = KANDIDATEN_CLUSTER_CMS as ClusterImage[]

export const KANDIDATEN_CLUSTER: ClusterImage[] = CMS.length ? CMS : FALLBACK
