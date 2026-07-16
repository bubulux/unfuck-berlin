import type { HTMLAttributes } from 'react'
import { Text } from '../../atoms/text'
import type { ColorToken } from '../../atoms/text'
import './styles.css'

export interface ExplainerBlockProps extends HTMLAttributes<HTMLElement> {
  title: string
  paragraphs: string[]
  titleColor?: ColorToken | (string & {})
  textColor?: ColorToken | (string & {})
}

export function ExplainerBlock({
  title,
  paragraphs,
  titleColor = 'purple',
  textColor = 'purple',
  className,
  ...rest
}: ExplainerBlockProps) {
  const classes = ['explainer', className].filter(Boolean).join(' ')
  return (
    <div className={classes} {...rest}>
      <Text as="h2" variant="subtitel" color={titleColor} className="explainer__title">
        {title}
      </Text>
      {paragraphs.map((paragraph, i) => (
        <Text key={i} as="p" variant="body" color={textColor}>
          {paragraph}
        </Text>
      ))}
    </div>
  )
}

export default ExplainerBlock
