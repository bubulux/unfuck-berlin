import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'headline',
  // title: '',
  type: 'object',

  preview: {
    select: {
      headlineZeilen: 'headlineZeilen',
      headline_theme: 'headline_theme',
    },
    prepare(selection) {
      const { headlineZeilen, headline_theme } = selection
      return {
        title: headlineZeilen.join(' '),
        subtitle: headline_theme ? `(${headline_theme})` : '',
      }
    },
  },

  fields: [
    defineField({
      name: 'headlineZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'headline_theme',
      type: 'string',
      options: {
        list: [
          'white',
          'yellow',
          'orange',
          'green',
          'blue',
        ]
      },
    }),
  ],
})
