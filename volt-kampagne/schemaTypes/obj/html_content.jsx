import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'html_content',
  // title: '',
  type: 'object',

  preview: {
    select: {
      html_content: 'html_content',
    },
    prepare(selection) {
      const { html_content } = selection
      return {
        title: html_content,
        subtitle: '',
      }
    },
  },

  fields: [
    defineField({
      title: 'Text (HTML is allowed)',
      name: 'html_content',
      type: 'text',
    }),
  ],
})
