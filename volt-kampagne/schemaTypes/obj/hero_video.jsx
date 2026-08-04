import { defineField, defineType } from 'sanity'
import {VideoIcon} from '@sanity/icons/Video'

export default defineType({
  name: 'hero_video',
  title: 'Seiten-Kopf mit Video',
  type: 'object',
  icon: VideoIcon,

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
        media: <span style={{ fontSize: '1.5rem' }}>🎥</span>,
      }
    },
  },
  components: {
    preview: (props) => {
      return props.renderDefault(props)
      // const { title, subtitle, ...restProps } = props
      // return (
      //   <Stack paddingX={4} paddingY={2} gap={4}>
      //     <Heading as="h1" size={4}>{title}</Heading>
      //     <Text muted size={1}>{subtitle}</Text>
      //     {props.renderDefault(restProps)}
      //   </Stack>
      // )
    },
  },

  fields: [
    defineField({
      name: 'heroZeilen',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'heroText',
      type: 'text',
    }),

    defineField({
      name: 'video_file',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*'
      }
    }),
    defineField({
      name: 'video_coverphoto',
      title: 'Video Coverphoto',
      type: 'file',
      options: {
        accept: 'image/*'
      }
    }),
    defineField({
      name: 'youtube_link',
      type: 'url',
    }),
    defineField({
      name: 'heroBild',
      type: 'image',
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
