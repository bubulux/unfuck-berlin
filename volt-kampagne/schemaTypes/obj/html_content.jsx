import { defineField, defineType } from 'sanity'
import {BlockContentIcon} from '@sanity/icons/BlockContent'

export default defineType({
  name: 'html_content',
  title: 'HTML Inhalt',
  type: 'object',
  icon: BlockContentIcon,

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
