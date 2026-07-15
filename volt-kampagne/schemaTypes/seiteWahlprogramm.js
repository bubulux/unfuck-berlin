import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seiteWahlprogramm',
  title: 'Wahlprogramm',
  type: 'document',

  fields: [
    defineField({
      name: 'titel',
      type: 'string',
    }),

    defineField({
      name: 'introBold',
      type: 'string',
    }),

    defineField({
      name: 'introText',
      type: 'text',
    }),

    defineField({
      name: 'programmButton',
      type: 'string',
    }),

    defineField({
      name: 'programmUrl',
      type: 'url',
    }),

    defineField({
      name: 'kapitel',
      type: 'array',
      of: [{ type: 'wahlprogrammKapitel' }],
    }),

    defineField({
      name: 'europaZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'europaText',
      type: 'text',
    }),

    defineField({
      name: 'kalenderTitel',
      type: 'string',
    }),
  ],
})
