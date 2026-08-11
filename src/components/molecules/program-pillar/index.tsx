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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Text as="h2" variant="titel" lang="de" color={textColor} className="pillar__title">
            {title}
          </Text>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {tags.map((line, index) => <HighlightText
              key={`${line}-${index}`}
              lines={[line]}
              variant="body"
              direction="row"
              color={tagColor}
              textColor={tagTextColor}
            />)}
          </div>
          <Text as="p" variant="body" color={textColor} className="pillar__body">
            {body}
          </Text>
      </div>
    </article>
  )
}

export default ProgramPillar
