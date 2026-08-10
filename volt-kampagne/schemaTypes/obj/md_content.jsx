import { defineField, defineType } from 'sanity'
import {BlockContentIcon} from '@sanity/icons/BlockContent'
import {Stack, Text} from '@sanity/ui'

export default defineType({
  name: 'md_content',
  title: 'Markdown Inhalt',
  type: 'object',
  icon: BlockContentIcon,

  preview: {
    select: {
      md_content: 'md_content',
    },
    prepare(selection) {
      const { md_content } = selection
      return {
        title: md_content,
        subtitle: '',
      }
    },
  },
  components: {
    preview: (props) => {
      const { title } = props
      return (
        <Stack paddingX={4} paddingY={2} gap={2}>
          <Text size={1}>{(title || '').slice(0, 300)}{(title || '').length > 300 ? '…' : ''}</Text>
        </Stack>
      )
    },
  },

  fields: [
    defineField({
      title: 'Text (Markdown is allowed)',
      name: 'md_content',
      type: 'text',
    }),
  ],
})
