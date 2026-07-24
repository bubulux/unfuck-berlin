import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero_video',
  // title: '',
  type: 'object',

  preview: {
    select: {
      heroZeilen: 'heroZeilen',
      heroText: 'heroText'
    },
    prepare(selection) {
      const { heroZeilen, heroText } = selection
      return {
        title: heroZeilen.join(' '),
        subtitle: heroText,
        media: <span style={{ fontSize: '1.5rem' }}>🎥</span>,
      }
    },
  },

  fields: [
    defineField({
      name: 'heroZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'heroText',
      type: 'text',
    }),

    defineField({
      name: 'youtube_link',
      type: 'url',
    }),
    defineField({
      name: 'heroBild',
      type: 'image',
    }),

    defineField({
      name: 'heroCtaLabel',
      type: 'string',
    }),
    defineField({
      name: 'heroCtaHref',
      type: 'string',
    }),
  ],
})
