import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons/Document'

export default defineType({
  name: 'seite',
  title: 'Seite',
  type: 'document',
  icon: DocumentIcon,

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
          subtitle: `/${slug.current || ''}`,
        }
      }

      return {
        title: '',
        subtitle: `/${slug.current || ''}`,
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
      title: 'Seiten Farbschema',
      name: 'page_theme',
      type: 'string',
      options: {
        list: [
          { title: '🟣 Purple Background', value: 'purple' },
          { title: '⚪️ White Background', value: 'white' },
        ],
        layout: 'dropdown',
      },
      layout: 'dropdown',
    }),

        defineField({
      title: 'test kandis',
      name: 'test_kandis',
      insertMenu: {
        filter: true,
        showIcons: true,
      },
      type: 'array',
      of: [
        { type: 'kandis_grid' },
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
        { type: 'kandis_grid' },
        { type: 'hero_linear' },
        { type: 'hero_video' },
        { type: 'kalender_teaser' },
        { type: 'kandis_teaser' },
        { type: 'wahlsystem_teaser' },
        { type: 'unfck_teaser' },
        { type: 'headline' },
        { type: 'html_text' },
        { type: 'one_cta' },
        { type: 'wahlprogramm_teaser' },
      ],
    }),
  ],
})
