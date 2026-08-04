import { defineField, defineType } from 'sanity'
import { AddUserIcon } from '@sanity/icons/AddUser'

export default defineType({
  name: 'kandidatAgh',
  title: 'AGH Kandidat',
  type: 'document',
  icon: AddUserIcon,

  orderings: [
    {
      title: 'Listenplatz',
      name: 'listenplatz',
      by: [{ field: 'listenplatz', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      slug: 'slug',
      name: 'name',
      foto: 'foto',
    },
    prepare(selection) {
      const { slug, name, foto } = selection
      return {
        title: name || '',
        subtitle: `/person/${slug?.current || '???'}`,
        media: foto,
      }
    },
  },

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
      options: {
        list: [
          '01 Mitte',
          '02 Friedrichshain-Kreuzberg',
          '03 Pankow',
          '04 Charlottenburg-Wilmersdorf',
          '05 Spandau',
          '06 Steglitz-Zehlendorf',
          '07 Tempelhof-Schöneberg',
          '08 Neukölln',
          '09 Treptow-Köpenick',
          '10 Marzahn-Hellersdorf',
          '11 Lichtenberg',
          '12 Reinickendorf',
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'wahlkreis',
      type: 'string',
    }),

    defineField({
      title: 'SocialMedia Verlinkungen',
      name: 'socials',
      type: 'array',
      of: [
        { type: 'one_cta' },
      ],
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
