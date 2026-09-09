import { defineField, defineType } from 'sanity'
import {BookmarkFilledIcon} from '@sanity/icons/BookmarkFilled'

export default defineType({
  name: 'press',
  title: 'Presse-Artikel-Verlinkung',
  type: 'document',
  icon: BookmarkFilledIcon,

  preview: {
    select: {
      title: 'title',
      published_at: 'published_at',
    },
    prepare(selection) {
      const { title, published_at } = selection
      return {
        title,
        subtitle: published_at ? (new Date(published_at)).toLocaleString("de-DE") : '',
      }
    },
  },

  fields: [
    defineField({
      title: 'Is Published',
      name: 'is_published',
      type: 'boolean',
      layout: 'switch',
    }),

    defineField({
      title: 'Date Published',
      name: 'published_at',
      type: 'datetime',
    }),

    defineField({
      title: 'Titel',
      name: 'title',
      type: 'text',
    }),

    defineField({
      title: 'URL',
      name: 'url',
      type: 'url',
    }),

    defineField({
      title: 'Screenshot',
      name: 'screenshot',
      type: 'image',
    }),
  ],
})
