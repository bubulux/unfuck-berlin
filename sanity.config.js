import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {VideoIcon} from '@sanity/icons/Video'
import {ImageIcon} from '@sanity/icons/Image'
import {schemaTypes} from './schemaTypes'

// Singletons: genau ein Dokument mit festem _id, damit der Code es
// verlässlich wiederfindet. Sie werden als eigener Menüpunkt eingehängt und
// aus der normalen Typenliste entfernt – so kann niemand versehentlich ein
// zweites anlegen.
const SINGLETONS = ['videos', 'seiteBezirke']

export default defineConfig({
  name: 'default',
  title: 'Volt-Kampagne',

  projectId: 'xzcgo5ky',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhalt')
          .items([
            S.listItem()
              .title('Videos')
              .id('videos')
              .icon(VideoIcon)
              .child(S.document().schemaType('videos').documentId('videos').title('Videos')),
            S.listItem()
              .title('Bezirks-Übersicht')
              .id('seiteBezirke')
              .icon(ImageIcon)
              .child(
                S.document()
                  .schemaType('seiteBezirke')
                  .documentId('seiteBezirke')
                  .title('Bezirks-Übersicht'),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !SINGLETONS.includes(item.getId()),
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Singletons lassen sich nicht duplizieren oder löschen.
    actions: (prev, {schemaType}) =>
      SINGLETONS.includes(schemaType)
        ? prev.filter(({action}) => !['duplicate', 'delete', 'unpublish'].includes(action))
        : prev,
  },
})
