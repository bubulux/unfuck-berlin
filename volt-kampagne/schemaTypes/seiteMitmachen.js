import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seiteMitmachen',
  title: 'Mitmachen',
  type: 'document',

  fields: [
    defineField({ name: 'heroZeilen', type: 'array', of: [{ type: 'string' }] }),

    defineField({ name: 'heroText', type: 'text' }),

    defineField({ name: 'einladungText', type: 'text' }),

    defineField({ name: 'carouselTitel', type: 'string' }),

    defineField({
      name: 'carouselBilder',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    defineField({ name: 'carouselButton', type: 'string' }),
  ],
})
