import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons/User'

export default defineType({
  name: 'kandidatBvv',
  title: 'Kandidierende (Less-Info)',
  type: 'document',
  icon: UserIcon,

  orderings: [
    {
      title: 'Name',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      name: 'name',
      foto: 'foto',
    },
    prepare(selection) {
      const { name, foto } = selection
      return {
        title: name || '???',
        subtitle: '',
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
      name: 'foto',
      type: 'image',
    }),

    defineField({
      name: 'foto2',
      type: 'image',
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
      name: 'schwerpunkte',
      type: 'string',
    }),
  ],
})
