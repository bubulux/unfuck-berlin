import { defineField, defineType } from 'sanity'
import { DotIcon } from '@sanity/icons/Dot'

export default defineType({
  name: 'seiteCountDown',
  title: 'Countdown',
  type: 'document',
  icon: DotIcon,

  fields: [
    defineField({ name: 'heroZeilen', type: 'array', of: [{ type: 'string' }] }),

    defineField({ name: 'erststimmeTitel', type: 'string' }),
    defineField({ name: 'erststimmeText', type: 'text' }),

    defineField({ name: 'duoBild', type: 'image' }),
    defineField({ name: 'duoLinkText', type: 'string' }),

    defineField({ name: 'zweitstimmeTitel', type: 'string' }),
    defineField({ name: 'zweitstimmeText', type: 'text' }),

    defineField({ name: 'waehlenMit16Titel', type: 'string' }),
    defineField({ name: 'gehoertDirTitel', type: 'string' }),
    defineField({ name: 'waehlenMit16Text', type: 'text' }),

    defineField({ name: 'programmButton', type: 'string' }),

    defineField({ name: 'introText1', type: 'text' }),
    defineField({ name: 'introText2', type: 'text' }),

    defineField({ name: 'subFrageTitel', type: 'string' }),
    defineField({ name: 'subFrageText', type: 'text' }),

    defineField({ name: 'voltomatTitel', type: 'string' }),
    defineField({ name: 'voltomatText', type: 'text' }),
    defineField({ name: 'voltomatButton', type: 'string' }),
  ],
})
