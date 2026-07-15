import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'html_text',
  // title: '',
  type: 'object',

  preview: {
    select: {
      html_text: 'html_text',
    },
    prepare(selection) {
      const { html_text } = selection
      return {
        title: html_text,
        subtitle: '',
      }
    },
  },

  fields: [
    defineField({
      title: 'Text (HTML is allowed)',
      name: 'html_text',
      type: 'text',
    }),
  ],
})
