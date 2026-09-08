import { defineField, defineType } from 'sanity'
import { VideoIcon } from '@sanity/icons/Video'

export default defineType({
  name: 'video_asset',
  title: 'Video mit Thumbnail',
  type: 'object',
  icon: VideoIcon,

  fields: [
    defineField({
      name: 'videoDatei',
      title: 'Video-Datei',
      type: 'file',
      options: { accept: 'video/*' },
      description:
        'MP4 (H.264). Die Datei wird direkt im Browser geladen – bitte möglichst klein halten (Richtwert: unter 10 MB).',
    }),

    defineField({
      name: 'posterBild',
      title: 'Thumbnail / Poster',
      type: 'image',
      description:
        'Standbild, das vor dem Abspielen angezeigt wird. Gleiches Seitenverhältnis wie das Video wählen, sonst springt das Layout.',
    }),
  ],

  preview: {
    select: { poster: 'posterBild', file: 'videoDatei.asset.originalFilename' },
    prepare({ poster, file }) {
      return {
        title: file || 'Kein Video hochgeladen',
        media: poster,
      }
    },
  },
})
