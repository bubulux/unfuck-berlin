import type { HTMLAttributes } from 'react'
import { Text } from '../../atoms/text'
import { HighlightText } from '../../atoms/highlight-text'
import type { ColorToken } from '../../atoms/text'
import './styles.css'

export interface ProgramPillarProps extends HTMLAttributes<HTMLElement> {
  /** Big topic name, e.g. "Berlin funktioniert". */
  title: string
  /** Topic tags, shown as one wrapping row of highlight boxes. */
  tags: string[]
  body: string
  /** Highlight box color for the tags. */
  tagColor?: ColorToken
  /** Tag text color. */
  tagTextColor?: ColorToken
  /** Title & body color. */
  textColor?: ColorToken | (string & {})
}

export function ProgramPillar({
  title,
  tags,
  body,
  tagColor = 'purple',
  tagTextColor = 'white',
  textColor = 'purple',
  className,
  ...rest
}: ProgramPillarProps) {
  const classes = ['pillar', className].filter(Boolean).join(' ')

  return (
    <article className={classes} {...rest}>
      <HighlightText
        lines={tags}
        variant="cta"
        direction="row"
        color={tagColor}
        textColor={tagTextColor}
        className="pillar__tags"
      />

      <div className="pillar__cols">
        <Text as="h2" variant="titel" lang="de" color={textColor} className="pillar__title">
          {title}
        </Text>
        <Text as="p" variant="body" color={textColor} className="pillar__body">
          {body}
        </Text>
      </div>
    </article>
  )
}

export default ProgramPillar
