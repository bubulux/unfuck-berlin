import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'hero_linear',
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
        media: <span style={{ fontSize: '1.5rem' }}>💬</span>,
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
      name: 'headline_theme',
      type: 'string',
      options: {
        list: [
          'yellow',
          'orange',
          'green',
          'blue',
        ]
      },
    }),

    defineField({
      name: 'heroText',
      type: 'text',
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
