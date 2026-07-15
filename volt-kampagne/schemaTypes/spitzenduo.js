import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'spitzenduo',
  title: 'Spitzenduo',
  type: 'document',

  fields: [
    defineField({
      name: 'reihenfolge',
      type: 'number',
    }),

    defineField({
      name: 'vorname',
      type: 'string',
    }),

    defineField({
      name: 'nachname',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: doc => `${doc.vorname}-${doc.nachname}`,
      },
    }),

    defineField({
      name: 'foto',
      type: 'image',
    }),
  ],
})
