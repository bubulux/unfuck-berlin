import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seiteUnfck',
  title: 'Unf*ck Berlin',
  type: 'document',

  fields: [
    defineField({
      name: 'heroZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'introTitel',
      type: 'string',
    }),

    defineField({
      name: 'heroText',
      type: 'text',
    }),

    defineField({
      name: 'stickerButton',
      type: 'string',
    }),

    defineField({
      name: 'grossesBild',
      type: 'image',
    }),

    defineField({
      name: 'kraftTitel',
      type: 'string',
    }),

    defineField({
      name: 'textBlock1',
      type: 'text',
    }),

    defineField({
      name: 'programmButton',
      type: 'string',
    }),

    defineField({
      name: 'collage1',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    defineField({
      name: 'schlussTitel',
      type: 'string',
    }),

    defineField({
      name: 'textBlock2',
      type: 'text',
    }),

    defineField({
      name: 'stimmeButton',
      type: 'string',
    }),

    defineField({
      name: 'stickerBilder',
      type: 'array',
      of: [{ type: 'image' }],
    }),
  ],
})
