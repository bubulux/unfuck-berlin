const _new_line_ = `\n
`

export function getFullBodyText(content_modules) {
  const full_body = [
    ...content_modules.map(c => {
      if (c._type === 'md_content') {
        return c.md_content
      } else if (c._type === 'html_content') {
        return c.html_content
      } else if (c._type === 'hero_linear') {
        return [
          c.heroZeilen.join('').length > 0 ? `# ${c.heroZeilen.join(' ')}` : '',
          c.heroText
        ]
          .filter(Boolean)
          .join(`${_new_line_}`)
      } else if (c._type === 'headline') {
        if (c.headlineZeilen.join('').length > 0) {
          return `## ${c.headlineZeilen.join(' ')}${_new_line_}`
        }
      } else if (c._type === 'one_cta') {
        return `[${c.ctaLabel}](${c.ctaHref})`
      }

      return ''
    })
    ]
      .filter(Boolean)
      .join(_new_line_)

  return full_body
}
