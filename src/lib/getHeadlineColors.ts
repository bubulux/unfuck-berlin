import type { ColorToken } from "../components/atoms/highlight-text"

export function getHeadlineColors(headline_theme: ColorToken): {
  bgColor: ColorToken,
  textColor: ColorToken,
} {
  const possible_colors = ['purple', 'white', 'neon', 'pink', 'blue', 'green', 'yellow']
  const white_bg_color = ['purple', 'pink']

  const bgColor = headline_theme && possible_colors.includes(headline_theme) ? headline_theme : 'neon'

  return {
    bgColor,
    textColor: white_bg_color.includes(bgColor) ? 'white' : 'purple',
  }
}
