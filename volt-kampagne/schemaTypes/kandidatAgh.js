import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'kandidatAgh',
  title: 'AGH Kandidat',
  type: 'document',

  orderings: [
    {
      title: 'Listenplatz',
      name: 'listenplatz',
      by: [{ field: 'listenplatz', direction: 'asc' }],
    },
  ],

  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),

    defineField({
      name: 'foto',
      type: 'image',
    }),

    defineField({
      name: 'listenplatz',
      type: 'number',
    }),

    defineField({
      name: 'alter',
      type: 'number',
    }),

    defineField({
      name: 'bezirk',
      type: 'string',
    }),

    defineField({
      name: 'wahlkreis',
      type: 'string',
    }),

    defineField({
      name: 'themen',
      type: 'string',
    }),

    defineField({
      name: 'herzensthema',
      type: 'text',
    }),

    defineField({
      name: 'ueberMich',
      type: 'text',
      rows: 8,
    }),

    defineField({
      name: 'foto2',
      type: 'image',
    }),

    defineField({
      name: 'berlinIst',
      type: 'text',
    }),
  ],
})
