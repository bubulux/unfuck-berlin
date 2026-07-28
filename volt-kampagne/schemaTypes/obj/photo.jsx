import { defineField, defineType } from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'
import {Stack, Text} from '@sanity/ui'


import { createImageUrlBuilder } from '@sanity/image-url'
import { createClient } from '@sanity/client'
const client = createClient({
  projectId: 'xzcgo5ky',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})
const builder = createImageUrlBuilder(client)
const urlFor = (source) => builder.image(source)

export default defineType({
  name: 'photo',
  title: 'Bild',
  type: 'object',
  icon: ImageIcon,

  preview: {
    select: {
      photo: 'photo',
      alt: 'alt',
    },
    prepare(selection) {
      const { photo, alt } = selection
      return {
        title: String(alt || '[Bild: Alternativ-Text fehlt.]'),
        // subtitle: alt,
        media: 'photo',

        photo,
        alt,
      }
    },
  },
  components: {
    preview: (props) => {
      const { title, photo } = props

      if (!photo) {
        return props.renderDefault(props)
      }

      return (
          <Stack paddingX={4} paddingY={2} gap={2}>
            <img
              style={{
                width: '100%',
                height: 'auto',
              }}
              src={urlFor(photo).width(400).quality(80).auto('format').url()}
              alt={title || ''}
            />
          </Stack>
      )
    },
  },

  fields: [
    defineField({
      name: 'photo',
      title: 'Bild',
      type: 'image',
    }),

    defineField({
      name: 'alt',
      title: 'Alternativ-Text',
      type: 'string',
    }),
  ],
})
