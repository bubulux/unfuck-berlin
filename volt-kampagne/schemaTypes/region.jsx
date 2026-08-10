import { defineField, defineType } from 'sanity'
import {EarthAmericasIcon} from '@sanity/icons/EarthAmericas'

export default defineType({
  name: 'region',
  title: 'Bezirk',
  type: 'document',
  icon: EarthAmericasIcon,

  preview: {
    select: {
      slug: 'slug',
      name: 'name',
    },
    prepare(selection) {
      const { slug, name } = selection
      return {
        title: name || '',
        subtitle: `/bezirke/${slug.current || ''}`,
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
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),

    // defineField({
    //   title: 'Is Published',
    //   name: 'is_published',
    //   type: 'boolean',
    //   layout: 'switch',
    // }),

    // defineField({
    //   title: 'Date Published',
    //   name: 'published_at',
    //   type: 'date',
    // }),

    defineField({
      title: 'BVV Kandidierende',
      name: 'candidates_ref',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'kandidatBvv'}],
        },
      ],
    }),

    /*
    defineField({
      title: 'Inhalts Blöcke',
      name: 'content_modules',
      insertMenu: {
        filter: true,
        showIcons: true,
      },
      type: 'array',
      of: [
        // { type: 'kandis_auswahl' },
        { type: 'hero_linear' },
        // { type: 'hero_video' },
        // { type: 'kalender_teaser' },
        // { type: 'kandis_teaser' },
        // { type: 'wahlsystem_teaser' },
        // { type: 'unfck_teaser' },
        { type: 'headline' },
        { type: 'md_content' },
        { type: 'html_content' },
        { type: 'one_cta' },
        { type: 'photo' },
        // { type: 'wahlprogramm_teaser' },
        { type: 'spitzenduo_teaser' },
      ],
    }),
    */
  ],
})
