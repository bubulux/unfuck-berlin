import { defineField, defineType } from 'sanity'
import {ClockIcon} from '@sanity/icons/Clock'

export default defineType({
  name: 'wahlsystem_teaser',
  // title: '',
  type: 'object',
  icon: ClockIcon,

  preview: {
    select: {
      title: 'title',
      text: 'text'
    },
    prepare(selection) {
      const { title, text } = selection
      return {
        title,
        subtitle: text,
        media: <span style={{ fontSize: '1.5rem' }}>⏲️</span>,
      }
    },
  },

  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),

    defineField({
      name: 'text',
      type: 'text',
    }),

    defineField({
      name: 'link',
      type: 'string',
    }),
  ],
})
