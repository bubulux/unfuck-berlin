import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seiteAlleKandis',
  title: 'Alle Kandidierenden',
  type: 'document',

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
