import { defineField, defineType } from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

export default defineType({
  name: 'photo',
  title: 'Bild',
  type: 'object',
  icon: ImageIcon,

  preview: {
    select: {
      // photo: 'photo',
      alt: 'alt',
    },
    prepare(selection) {
      const { alt } = selection
      return {
        title: alt || '',
        // subtitle: alt,
        // media: 'photo',
      }
    },
  },

  fields: [
    defineField({
      name: 'photo',
      title: 'Bild',
      type: 'image',
    }),

    defineField({
      name: 'alt',
      title: 'Alternativ-Text',
      type: 'string',
    }),
  ],
})
