import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'termin',
  title: 'Termin',
  type: 'document',

  preview: {
    select: {
      titel: 'titel',
      datum: 'datum',
      uhrzeit: 'uhrzeit',
    },
    prepare(selection) {
      const { titel, datum, uhrzeit } = selection
      return {
        title: titel,
        subtitle: `${datum} ${uhrzeit}`,
      }
    },
  },

  fields: [
    defineField({
      name: 'datum',
      type: 'date',
    }),

    defineField({
      name: 'uhrzeit',
      type: 'string',
    }),

    defineField({
      name: 'typ',
      type: 'string',
    }),

    defineField({
      name: 'typeColor',
      type: 'string',
      initialValue: 'pink',
      options: {
        list: ['pink', 'blue', 'orange', 'green'],
      },
    }),

    defineField({
      name: 'titel',
      type: 'string',
    }),

    defineField({
      name: 'ort',
      type: 'string',
    }),
  ],
})
