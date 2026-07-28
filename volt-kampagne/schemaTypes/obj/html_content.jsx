import { defineField, defineType } from 'sanity'
import {BlockContentIcon} from '@sanity/icons/BlockContent'
import {Stack, Text} from '@sanity/ui'

export default defineType({
  name: 'html_content',
  title: 'HTML Inhalt',
  type: 'object',
  icon: BlockContentIcon,

  preview: {
    select: {
      html_content: 'html_content',
    },
    prepare(selection) {
      const { html_content } = selection
      return {
        title: html_content,
        subtitle: '',
      }
    },
  },
  components: {
    preview: (props) => {
      const { title } = props
      return (
        <Stack paddingX={4} paddingY={2} gap={2}>
          <Text size={1}>{title}</Text>
        </Stack>
      )
    },
  },

  fields: [
    defineField({
      title: 'Text (HTML is allowed)',
      name: 'html_content',
      type: 'text',
    }),
  ],
})
