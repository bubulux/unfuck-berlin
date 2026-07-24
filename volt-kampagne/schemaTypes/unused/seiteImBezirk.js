import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seiteImBezirk',
  title: 'Im Bezirk',
  type: 'document',

  fields: [
    defineField({ name: 'heroZeilen', type: 'array', of: [{ type: 'string' }] }),

    defineField({ name: 'heroText', type: 'text' }),

    defineField({
      name: 'werteWorte',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({ name: 'werteText', type: 'text' }),

    defineField({ name: 'kalenderTitel', type: 'string' }),

    defineField({ name: 'voteTitel', type: 'string' }),
    defineField({ name: 'voteText', type: 'text' }),
    defineField({ name: 'voteButton', type: 'string' }),
    defineField({ name: 'voteBild', type: 'image' }),
  ],
})
