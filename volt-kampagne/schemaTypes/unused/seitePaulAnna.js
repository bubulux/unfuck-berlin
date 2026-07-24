import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seitePaulAnna',
  title: 'Paul & Anna',
  type: 'document',

  fields: [
    defineField({ name: 'annaTitel', type: 'string' }),
    defineField({ name: 'annaBild', type: 'image' }),
    defineField({ name: 'annaBildJacke', type: 'image' }),
    defineField({ name: 'annaIntro', type: 'text' }),

    defineField({
      name: 'annaFragen',
      type: 'array',
      of: [{ type: 'questionAnswer' }],
    }),

    defineField({ name: 'annaSocialLabel', type: 'string' }),

    defineField({ name: 'medienTitelZeilen', type: 'array', of: [{ type: 'string' }] }),

    defineField({
      name: 'medienBilder',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    defineField({ name: 'medienButton', type: 'string' }),

    defineField({ name: 'paulTitel', type: 'string' }),
    defineField({ name: 'paulBild', type: 'image' }),
    defineField({ name: 'paulIntro', type: 'text' }),

    defineField({
      name: 'paulFragen',
      type: 'array',
      of: [{ type: 'questionAnswer' }],
    }),

    defineField({ name: 'paulSocialLabel', type: 'string' }),
  ],
})
