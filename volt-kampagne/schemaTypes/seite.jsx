import { defineField, defineType } from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

export default defineType({
  name: 'seite',
  title: 'Seite',
  type: 'document',
  icon: DocumentTextIcon,

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
      title: 'Is Published',
      name: 'is_published',
      type: 'boolean',
      layout: 'switch',
    }),

    defineField({
      title: 'Seiten Farbschema',
      name: 'theme',
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
        { type: 'hero_video' },
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
