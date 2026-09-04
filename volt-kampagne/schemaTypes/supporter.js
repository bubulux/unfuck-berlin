import { defineField, defineType } from 'sanity'
import { UsersIcon } from '@sanity/icons/Users'

export default defineType({
  name: 'supporter',
  title: 'Wall of Support',
  type: 'document',
  icon: UsersIcon,

  orderings: [
    {
      title: 'Name',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      name: 'name',
      foto: 'foto',
    },
    prepare(selection) {
      const { name, foto } = selection
      return {
        title: name || '???',
        media: foto,
      }
    },
  },

  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'foto',
      type: 'image',
      validation: Rule => Rule.required(),
    }),

    defineField({
      title: 'LinkedIn-Post',
      name: 'linkedin',
      type: 'url',
    }),
  ],
})
