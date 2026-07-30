import type { HTMLAttributes } from 'react'
import { KANDIDATEN_CLUSTER, type ClusterImage } from '../../../data/kandidaten-cluster'
import './styles.css'

export interface CandidateClusterProps extends HTMLAttributes<HTMLDivElement> {
  /** Nine images (default: the CMS cluster selection). Extra entries are ignored. */
  images?: ClusterImage[]
}

/**
 * Festes 3x3-Raster aus Kandidierenden-Portraits mit einem sehr dezenten lila
 * Schleier darueber. Die Kacheln sind quadratisch, das Raster fuellt die Breite
 * und behaelt so eine feste, vorhersehbare Hoehe (kein Layout-Shift).
 */
export function CandidateCluster({
  images = KANDIDATEN_CLUSTER,
  className,
  ...rest
}: CandidateClusterProps) {
  const classes = ['cluster', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      {images.slice(0, 9).map((img, i) => (
        <img key={i} className="cluster__cell" src={img.image} alt={img.alt} />
      ))}
      {/*<span className="cluster__veil" aria-hidden="true" />*/}
    </div>
  )
}

export default CandidateCluster
