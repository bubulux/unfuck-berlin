import { defineField, defineType } from 'sanity'
import { VideoIcon } from '@sanity/icons/Video'

/**
 * Singleton-Dokument (festes _id "videos") für alle Videos, die fest im Code
 * platziert sind – also nicht über content_modules einer Seite laufen.
 * Wird im Studio über den Menüpunkt "Videos" geöffnet (siehe sanity.config.js).
 */
export default defineType({
  name: 'videos',
  title: 'Videos',
  type: 'document',
  icon: VideoIcon,

  fields: [
    defineField({
      name: 'annaPaulIntro',
      title: 'Intro-Video Anna & Paul (Startseite)',
      type: 'video_asset',
      description: 'Läuft im Seitenkopf der Startseite.',
    }),

    defineField({
      name: 'reveal',
      title: 'Reveal-Video (Seite „Unf*ck Berlin“)',
      type: 'video_asset',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Videos' }
    },
  },
})
