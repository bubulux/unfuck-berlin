import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'termin',
  title: 'Termin',
  type: 'document',

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
