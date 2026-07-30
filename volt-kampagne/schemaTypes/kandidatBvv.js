import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kandidatBvv',
  title: 'BVV Kandidat',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),

    defineField({
      name: 'wahlkreis',
      type: 'string',
    }),

    defineField({
      name: 'schwerpunkte',
      type: 'string',
    }),
  ],
})
