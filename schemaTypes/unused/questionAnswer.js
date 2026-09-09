import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'questionAnswer',
  title: 'Frage + Antwort',
  type: 'object',
  fields: [
    defineField({
      name: 'frage',
      type: 'string',
    }),
    defineField({
      name: 'antwort',
      type: 'text',
      rows: 5,
    }),
  ],
})
