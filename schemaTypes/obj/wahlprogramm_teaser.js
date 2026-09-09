import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'wahlprogramm_teaser',
  title: 'Wahlprogramm Teaser',
  type: 'object',

  fields: [
    defineField({
      name: 'kapitel',
      type: 'array',
      of: [{ type: 'wahlprogramm_kapitel_teaser' }],
    }),
  ],
})
