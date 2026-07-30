import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons/Link'
import {Stack, Button} from '@sanity/ui'

export default defineType({
  name: 'one_cta',
  title: 'Ein Link als Button',
  type: 'object',
  icon: LinkIcon,

  preview: {
    select: {
      ctaLabel: 'ctaLabel',
      ctaHref: 'ctaHref',
    },
    prepare(selection) {
      const { ctaLabel, ctaHref } = selection
      return {
        title: ctaLabel,
        subtitle: ctaHref,
      }
    },
  },
    components: {
    preview: (props) => {
      const { title } = props
      return (
        <Stack paddingX={4} paddingY={2} gap={2}>
          <Button
            as="div"
            fontSize={[1]}
            mode="default"
            justify="flex-start"
            padding={[2]}
            text={title}
          />
        </Stack>
      )
    },
  },

  fields: [
    defineField({
      name: 'ctaLabel',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      type: 'string',
    }),
  ],
})
