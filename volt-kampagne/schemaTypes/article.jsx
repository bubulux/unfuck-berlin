import { defineField, defineType } from 'sanity'
import {EnvelopeIcon} from '@sanity/icons/Envelope'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: EnvelopeIcon,

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
          subtitle: `/news/${slug.current || ''}`,
        }
      }

      return {
        title: '',
        subtitle: `/news/${slug.current || ''}`,
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
      title: 'Sprache des Artikels',
      name: 'lang',
      type: 'string',
      description:
        'Setzt lang="…" auf der Artikelseite. Wichtig für Screenreader, Silbentrennung und ' +
        'Schriftwahl. Leer lassen, wenn der Artikel auf Deutsch ist.',
      options: {
        list: [
          { title: 'Deutsch (de)', value: 'de' },
          { title: 'English (en)', value: 'en' },
          { title: 'العربية — Arabisch (ar)', value: 'ar' },
          { title: 'Bosnisch / Kroatisch / Serbisch (bs)', value: 'bs' },
          { title: 'Čeština — Tschechisch (cs)', value: 'cs' },
          { title: 'Español — Spanisch (es)', value: 'es' },
          { title: 'Français — Französisch (fr)', value: 'fr' },
          { title: 'Italiano — Italienisch (it)', value: 'it' },
          { title: 'Nederlands — Niederländisch (nl)', value: 'nl' },
          { title: 'Polski — Polnisch (pl)', value: 'pl' },
          { title: 'Português — Portugiesisch (pt)', value: 'pt' },
          { title: 'Română — Rumänisch (ro)', value: 'ro' },
          { title: 'Русский — Russisch (ru)', value: 'ru' },
          { title: 'Українська — Ukrainisch (uk)', value: 'uk' },
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      title: 'Text von rechts nach links (RTL)',
      name: 'is_rtl',
      type: 'boolean',
      initialValue: false,
      description:
        'Nur für Sprachen, die von rechts nach links gesetzt werden – z. B. Arabisch, ' +
        'Hebräisch, Farsi. Dreht Textausrichtung, Listenpunkte und Einzüge des Artikels um.',
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
