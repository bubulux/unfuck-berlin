import { defineField, defineType } from 'sanity'
import {UserIcon} from '@sanity/icons/User'

export default defineType({
  name: 'kandis_teaser',
  // title: '',
  type: 'object',
  icon: UserIcon,

  preview: {
    select: {
      kandidatenZeilen: 'kandidatenZeilen',
      kandidatenText: 'kandidatenText'
    },
    prepare(selection) {
      const { kandidatenZeilen, kandidatenText } = selection
      return {
        title: kandidatenZeilen.join(' '),
        subtitle: kandidatenText,
        // media: 'userPortrait',
        media: <span style={{ fontSize: '1.5rem' }}>🙋</span>,
      }
    },
  },

  fields: [
    defineField({
      name: 'kandidatenZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'kandidatenText',
      type: 'text',
    }),

    defineField({
      name: 'kandidatenLink',
      type: 'string',
    }),
  ],
})
