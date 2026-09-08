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
      job: 'job',
      foto: 'foto',
    },
    prepare(selection) {
      const { name, job, foto } = selection
      return {
        title: name || '???',
        subtitle: job || '',
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
      title: 'Job',
      name: 'job',
      type: 'string',
      description: 'Optional: Rolle oder Beruf, erscheint unter dem Namen auf der Wall of Support.',
    }),

    defineField({
      name: 'foto',
      type: 'image',
      validation: Rule => Rule.required(),
    }),

    // Bewusst `string` statt `url`: LinkedIn-Post-Links werden meist ohne
    // "https://" und mit langen Tracking-Parametern kopiert, was die
    // url-Validierung ablehnt. Der Build ergaenzt fehlendes https://.
    defineField({
      title: 'LinkedIn-Post',
      name: 'linkedin',
      type: 'string',
      description:
        'Optional: Link zum LinkedIn-Post, so einfügen wie kopiert – "https://" darf fehlen. ' +
        'Ein Klick auf das Plakat öffnet ihn in einem neuen Tab.',
    }),
  ],
})
