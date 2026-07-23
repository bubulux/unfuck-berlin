import { Fragment, type ReactNode } from 'react'
import { Text, type ColorToken } from '../../atoms/text'

export interface RichTextProps {
  /**
   * Roher CMS-Text. Absaetze werden durch Leerzeilen getrennt, einzelne
   * Zeilenumbrueche innerhalb eines Absatzes zu Leerzeichen zusammengefasst.
   * Inline-<strong> wird als fettes <strong> gerendert.
   */
  text: string
  /** Farbe der Absaetze (Token oder roher CSS-Farbwert). */
  color?: ColorToken | (string & {})
  className?: string
}

/** Wandelt inline <strong>…</strong> in echte <strong>-Knoten um. */
function renderInline(paragraph: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const regex = /<strong>([\s\S]*?)<\/strong>/g
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(paragraph)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(paragraph.slice(lastIndex, match.index))
    }
    nodes.push(<strong key={key++}>{match[1]}</strong>)
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < paragraph.length) {
    nodes.push(paragraph.slice(lastIndex))
  }
  return nodes
}

export function RichText({ text, color = 'purple', className }: RichTextProps) {
  const paragraphs = (text || '')
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean)

  return (
    <Fragment>
      {paragraphs.map((paragraph, i) => (
        <Text key={i} as="p" color={color} className={className}>
          {renderInline(paragraph)}
        </Text>
      ))}
    </Fragment>
  )
}

export default RichText
