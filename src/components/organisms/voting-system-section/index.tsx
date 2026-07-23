import type { HTMLAttributes, ReactNode } from 'react'
import { HighlightText } from '../../atoms/highlight-text'
import { ExplainerBlock } from '../../molecules/explainer-block'
import { MediaOverlay } from '../../molecules/media-overlay'

import './styles.css'

interface Block {
  title: string
  paragraphs: string[]
}

export interface VotingSystemSectionProps extends HTMLAttributes<HTMLElement> {
  headingLines: string[]
  first: Block
  second: Block
  media?: {
    src: string
    alt: string
    captionLabel?: string
    captionTo?: string
    captionHref?: string
  }
  /** Custom media block shown between the two explainers (takes precedence over `media`). */
  mediaNode?: ReactNode
}

export function VotingSystemSection({
  headingLines,
  first,
  second,
  media,
  mediaNode,
  className,
  ...rest
}: VotingSystemSectionProps) {
  const classes = ['voting', className].filter(Boolean).join(' ')
  return (
    <section className={classes} {...rest}>
      <div className="voting__inner">
        <HighlightText
          as="h1"
          lines={headingLines}
          variant="titel"
          color="yellow"
          textColor="purple"
          align="left"
          uppercase
          className="voting__heading"
        />

        <ExplainerBlock title={first.title} paragraphs={first.paragraphs} />

        {mediaNode ? (
          mediaNode
        ) : media ? (
          <MediaOverlay
            src={media.src}
            alt={media.alt}
            captionLabel={media.captionLabel}
            captionTo={media.captionTo}
            captionHref={media.captionHref}
          />
        ) : null}

        <ExplainerBlock title={second.title} paragraphs={second.paragraphs} />
      </div>
    </section>
  )
}

export default VotingSystemSection
