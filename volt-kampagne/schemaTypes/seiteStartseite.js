import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seiteStartseite',
  title: 'Startseite',
  type: 'document',

  fields: [
    defineField({
      name: 'heroZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'heroText',
      type: 'text',
    }),

    defineField({
      name: 'heroButton',
      type: 'string',
    }),

    defineField({
      name: 'heroBild',
      type: 'image',
    }),

    defineField({
      name: 'erstwaehlerText',
      type: 'text',
    }),

    defineField({
      name: 'erstwaehlerLink',
      type: 'string',
    }),

    defineField({
      name: 'kalenderTitel',
      type: 'string',
    }),

    defineField({
      name: 'countdownTitel',
      type: 'string',
    }),

    defineField({
      name: 'kandidatenZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'kandidatenText',
      type: 'text',
    }),

    defineField({
      name: 'kandidatenLink',
      type: 'string',
    }),

    defineField({
      name: 'unfckZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'unfckText',
      type: 'text',
    }),

    defineField({
      name: 'unfckButton',
      type: 'string',
    }),

    defineField({
      name: 'unfckBild',
      type: 'image',
    }),
  ],
})
