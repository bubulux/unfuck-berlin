import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'seiteVoltomat',
  title: 'Volt-o-Mat',
  type: 'document',

  fields: [
    defineField({ name: 'titel', type: 'string' }),
    defineField({ name: 'text1', type: 'text' }),
    defineField({ name: 'text2', type: 'text' }),
    defineField({ name: 'button', type: 'string' }),
  ],
})
