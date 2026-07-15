import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'one_cta',
  title: 'Ein Button',
  type: 'object',

  preview: {
    select: {
      ctaLabel: 'ctaLabel',
      ctaHref: 'ctaHref',
    },
    prepare(selection) {
      const { ctaLabel, ctaHref } = selection
      return {
        title: ctaLabel,
        subtitle: ctaHref,
      }
    },
  },

  fields: [
    defineField({
      name: 'ctaLabel',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      type: 'string',
    }),
  ],
})
