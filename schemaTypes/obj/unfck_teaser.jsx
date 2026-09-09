import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'unfck_teaser',
  // title: '',
  type: 'object',

  preview: {
    select: {
      unfckZeilen: 'unfckZeilen',
      unfckText: 'unfckText'
    },
    prepare(selection) {
      const { unfckZeilen, unfckText } = selection
      return {
        title: unfckZeilen.join(' '),
        subtitle: unfckText,
        media: <span style={{ fontSize: '1.5rem' }}>📣</span>,
      }
    },
  },

  fields: [
    defineField({
      name: 'unfckZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'unfckText',
      type: 'text',
    }),

    defineField({
      name: 'unfckButton',
      type: 'string',
    }),

    defineField({
      name: 'unfckBild',
      type: 'image',
    }),
  ],
})
