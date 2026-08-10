import { defineField, defineType } from 'sanity'
import {EarthAmericasIcon} from '@sanity/icons/EarthAmericas'

export default defineType({
  name: 'region',
  title: 'Region / Bezirk',
  type: 'document',
  icon: EarthAmericasIcon,

  preview: {
    select: {
      slug: 'slug',
      content_modules: 'content_modules',
    },
    prepare(selection) {
      const { slug, content_modules } = selection

      const hero_video = content_modules.find(({ _type }) => _type === 'hero_linear' || _type === 'hero_video')

      if (hero_video) {
        const { heroZeilen } = hero_video
        return {
          title: heroZeilen.join(' '),
          subtitle: `/bezirk/${slug.current || ''}`,
        }
      }

      return {
        title: '',
        subtitle: `/bezirk/${slug.current || ''}`,
      }
    },
  },

  fields: [
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
    }),

    defineField({
      title: 'Is Published',
      name: 'is_published',
      type: 'boolean',
      layout: 'switch',
    }),

    defineField({
      title: 'Date Published',
      name: 'published_at',
      type: 'date',
    }),

    defineField({
      title: 'Kandidierende',
      name: 'candidates',
      insertMenu: {
        filter: true,
        showIcons: true,
      },
      type: 'array',
      of: [
        { type: 'kandidatBvv' },
      ],
    }),

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
  ],
})
