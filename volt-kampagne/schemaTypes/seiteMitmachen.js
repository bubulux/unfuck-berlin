import { defineField, defineType } from 'sanity'
import { DotIcon } from '@sanity/icons/Dot'

export default defineType({
  name: 'seiteMitmachen',
  title: 'Mitmachen',
  type: 'document',
  icon: DotIcon,

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
