import { KANDIDATEN_CLUSTER_CMS } from './kandidaten-cluster.generated'

export interface ClusterImage {
  image: string
  alt: string
}

/**
 * Notnagel (lokale Portraits), falls der Sanity-Abruf beim Build fehlschlaegt.
 * Reihenfolge wie im CMS-Build (siehe CLUSTER_SLUGS in fetch-content.mjs).
 */
const FALLBACK: ClusterImage[] = []

const CMS = KANDIDATEN_CLUSTER_CMS as ClusterImage[]

export const KANDIDATEN_CLUSTER: ClusterImage[] = CMS.length ? CMS : FALLBACK
