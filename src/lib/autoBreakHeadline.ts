export function autoBreakHeadline({ text, size = 0.1 }: { text: string, size?: number }) {

  //const maxLetters = Math.ceil(text.length * size)
  const minLetters = Math.ceil(100 * size * 0.25)
  const maxLetters = Math.ceil(100 * size)
  const lineSplitRegex = new RegExp(`(.{${minLetters},${maxLetters}}[:&]|.{${minLetters},${maxLetters}})([\\s\-])(?=.{7,})`, 'g')

  const splittedText = text
    .replace(lineSplitRegex, '$1$2|')
    .split('|')

  return splittedText
}
