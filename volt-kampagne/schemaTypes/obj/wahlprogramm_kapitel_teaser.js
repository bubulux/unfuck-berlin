import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'wahlprogramm_kapitel_teaser',
  title: 'Programmkapitel',
  type: 'object',

  preview: {
    select: {
      titel: 'titel',
    },
    prepare(selection) {
      const { titel } = selection
      return {
        title: titel,
        // subtitle: '',
        // media: <span style={{ fontSize: '1.5rem' }}>📣</span>,
      }
    },
  },


  fields: [
    defineField({
      name: 'titel',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      layout: 'tags',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'text',
      type: 'text',
      // rows: 6,
    }),
  ],
})
