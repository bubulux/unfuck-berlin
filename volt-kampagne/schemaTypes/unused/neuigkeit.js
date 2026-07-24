import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'neuigkeit',
  title: 'Neuigkeit',
  type: 'document',

  fields: [
    defineField({
      name: 'reihenfolge',
      type: 'number',
    }),

    defineField({
      name: 'titel',
      type: 'string',
    }),
  ],
})
