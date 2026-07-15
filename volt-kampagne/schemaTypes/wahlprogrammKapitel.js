import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'wahlprogrammKapitel',
  title: 'Programmkapitel',
  type: 'object',
  fields: [
    defineField({
      name: 'titel',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'text',
      type: 'text',
      rows: 6,
    }),
  ],
})
