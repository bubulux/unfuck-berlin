import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'

/**
 * Singleton-Dokument (festes _id "seiteBezirke") für die Bezirks-Übersicht
 * unter /bezirke. Die Seite selbst wird im Code zusammengebaut – hier liegen
 * nur die Inhalte, die die Redaktion pflegen soll.
 * Wird im Studio über den Menüpunkt "Bezirks-Übersicht" geöffnet
 * (siehe sanity.config.js).
 */
export default defineType({
  name: 'seiteBezirke',
  title: 'Bezirks-Übersicht',
  type: 'document',
  icon: ImageIcon,

  fields: [
    defineField({
      name: 'photo_unten',
      title: 'Bild unter der Übersicht',
      type: 'photo',
      description:
        'Steht auf /bezirke unterhalb der Karte und der Bezirksliste, ' +
        'zum Beispiel das Gruppenbild aller BVV-Kandidierenden. ' +
        'Bitte den Alternativ-Text ausfüllen.',
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Bezirks-Übersicht' }
    },
  },
})
