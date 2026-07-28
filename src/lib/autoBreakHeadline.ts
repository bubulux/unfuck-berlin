export function autoBreakHeadline(text: string) {
  const fourRowsLength = Math.max(20, Math.round(text.length * 0.25)) // split into four lines, but max 20 chars per line
  const lineSplitRegex = new RegExp(`(.{${fourRowsLength}})\\s`, 'giu')

  const splittedText = text
    .replaceAll(lineSplitRegex, '$1|')
    .split('|')

  return splittedText
}
