import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kalender_teaser',
  // title: '',
  type: 'object',

  preview: {
    select: {
      titel: 'titel',
      heroText: 'heroText'
    },
    prepare(selection) {
      const { titel } = selection
      return {
        title: titel,
        subtitle: '',
        media: <span style={{ fontSize: '1.5rem' }}>📆</span>,
      }
    },
  },

  fields: [
    defineField({
      name: 'titel',
      type: 'string',
    }),
  ],
})
