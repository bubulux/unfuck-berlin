import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'bezirkThema',
  title: 'Bezirksthema',
  type: 'document',

  fields: [
    defineField({
      name: 'bezirk',
      type: 'string',
    }),

    defineField({
      name: 'reihenfolge',
      type: 'number',
    }),

    defineField({
      name: 'tag',
      type: 'string',
    }),

    defineField({
      name: 'titel',
      type: 'string',
    }),

    defineField({
      name: 'beschreibung',
      type: 'text',
    }),
  ],
})
