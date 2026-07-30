import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seiteAlleKandis',
  title: 'Alle Kandidierenden',
  type: 'document',

  preview: {
    select: {
      titelZeilen: 'titelZeilen',
      subtitle: 'subtitle'
    },
    prepare(selection) {
      const { titelZeilen, subtitle } = selection
      return {
        title: titelZeilen.join(' '),
        subtitle,
      }
    }
  },

  fields: [
    defineField({
      name: 'titelZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'subtitle',
      type: 'text',
    }),
  ],
})
