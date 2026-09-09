import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {VideoIcon} from '@sanity/icons/Video'
import {schemaTypes} from './schemaTypes'

// "videos" ist ein Singleton: genau ein Dokument mit festem _id, damit der
// Code die Videos verlässlich unter demselben Dokument findet. Deshalb wird
// es als eigener Menüpunkt eingehängt und aus der normalen Typenliste
// entfernt – so kann niemand versehentlich ein zweites anlegen.
const SINGLETONS = ['videos']

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
