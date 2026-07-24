import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteTexte',
  title: 'Site Texte',
  type: 'document',

  fields: [
    defineField({
      name: 'ziele',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'platzhalter',
      type: 'text',
    }),

    defineField({
      name: 'platzhalterLang',
      type: 'text',
    }),
  ],
})
