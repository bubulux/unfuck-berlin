import { defineField, defineType } from 'sanity'
import {TextIcon} from '@sanity/icons/Text'
import {Stack, Heading} from '@sanity/ui'

export default defineType({
  name: 'headline',
  title: 'Überschrift',
  type: 'object',
  icon: TextIcon,

  preview: {
    select: {
      headlineZeilen: 'headlineZeilen',
      headline_theme: 'headline_theme',
    },
    prepare(selection) {
      const { headlineZeilen, headline_theme } = selection
      return {
        title: headlineZeilen.join(' '),
        subtitle: headline_theme ? `(${headline_theme})` : '',
      }
    },
  },
  components: {
    preview: (props) => {
      const { title } = props
      return (
        <Stack paddingX={4} paddingY={2} gap={2}>
          <Heading as="h2" size={3}>{title}</Heading>
        </Stack>
      )
    },
  },

  fields: [
    defineField({
      name: 'headlineZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'headline_theme',
      type: 'string',
      options: {
        list: [
          'purple',
          'green',
          'pink',
          'white',
          'yellow',
          'orange',
          'blue',
        ]
      },
    }),
  ],
})
