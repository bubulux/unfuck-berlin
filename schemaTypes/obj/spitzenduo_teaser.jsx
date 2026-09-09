import { defineField, defineType } from 'sanity'
import {UsersIcon} from '@sanity/icons/Users'
// import {Stack, Button} from '@sanity/ui'

export default defineType({
  name: 'spitzenduo_teaser',
  title: 'Spitzenduo Teaser',
  type: 'object',
  icon: UsersIcon,

  preview: {
    // select: {
    //   ctaLabel: 'ctaLabel',
    //   ctaHref: 'ctaHref',
    // },
    prepare() {
      // const { ctaLabel, ctaHref } = selection
      return {
        title: 'Spitzenduo Teaster: Anna & Paul',
        // subtitle: ctaHref,
      }
    },
  },
  // components: {
  //   preview: (props) => {
  //     const { title } = props
  //     return (
  //       <Stack paddingX={4} paddingY={2} gap={2}>
  //         <Button
  //           as="div"
  //           fontSize={[1]}
  //           mode="default"
  //           justify="flex-start"
  //           padding={[2]}
  //           text={title}
  //         />
  //       </Stack>
  //     )
  //   },
  // },

  fields: [
    defineField({
      title: 'Du musst hier nichts eintragen.',
      name: 'nothing',
      type: 'string',
    }),
  ],
})
