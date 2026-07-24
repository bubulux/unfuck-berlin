import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons/Link'

export default defineType({
  name: 'one_cta',
  title: 'Ein Button',
  type: 'object',
  icon: LinkIcon,

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
