import type { HTMLAttributes } from 'react'
import { HighlightText } from '../../atoms/highlight-text'
import { ExplainerBlock } from '../../molecules/explainer-block'
import { MediaCaption } from '../../molecules/media-caption'

import './styles.css'

interface Block {
  title: string
  paragraphs: string[]
}

export interface VotingSystemSectionProps extends HTMLAttributes<HTMLElement> {
  headingLines: string[]
  first: Block
  second: Block
  media: {
    src: string
    alt: string
    captionLabel?: string
    captionTo?: string
    captionHref?: string
  }
}

export function VotingSystemSection({
  headingLines,
  first,
  second,
  media,
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

        <MediaCaption
          src={media.src}
          alt={media.alt}
          captionLabel={media.captionLabel}
          captionTo={media.captionTo}
          captionHref={media.captionHref}
        />

        <ExplainerBlock title={second.title} paragraphs={second.paragraphs} />
      </div>
    </section>
  )
}

export default VotingSystemSection
