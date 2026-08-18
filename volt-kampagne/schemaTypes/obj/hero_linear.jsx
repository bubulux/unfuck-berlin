import { defineField, defineType } from 'sanity'
import {ConfettiIcon} from '@sanity/icons/Confetti'
import {Stack, Heading, Text} from '@sanity/ui'

export default defineType({
  name: 'hero_linear',
  title: 'Seiten-Kopf',
  type: 'object',
  icon: ConfettiIcon,

  preview: {
    select: {
      heroZeilen: 'heroZeilen',
      heroText: 'heroText'
    },
    prepare(selection) {
      const { heroZeilen, heroText } = selection
      return {
        title: heroZeilen.join(' '),
        subtitle: heroText,
        media: <span style={{ fontSize: '1.5rem' }}>💬</span>,
      }
    },
  },
  components: {
    preview: (props) => {
      const { title, subtitle } = props
      return (
        <Stack paddingX={4} paddingY={2} gap={4}>
          <Heading as="h1" size={4}>{title}</Heading>
          <Text muted size={1}>{subtitle}</Text>
        </Stack>
      )
    },
  },

  fields: [
    defineField({
      name: 'photo',
      type: 'image',
    }),

    defineField({
      name: 'heroZeilen',
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

    defineField({
      name: 'heroText',
      type: 'text',
    }),

    defineField({
      name: 'heroCtaLabel',
      type: 'string',
    }),
    defineField({
      name: 'heroCtaHref',
      type: 'string',
    }),
  ],
})
