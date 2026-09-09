import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seiteBezirk',
  title: 'Bezirk',
  type: 'document',

  fields: [
    defineField({ name: 'wasZuTunTitel', type: 'string' }),
    defineField({ name: 'sorgenTitel', type: 'string' }),
    defineField({ name: 'sorgenText', type: 'text' }),
    defineField({ name: 'kandidierendeTitel', type: 'string' }),
  ],
})
