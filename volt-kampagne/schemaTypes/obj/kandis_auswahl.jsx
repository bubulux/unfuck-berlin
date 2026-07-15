import { defineType } from 'sanity'
import {ThLargeIcon} from '@sanity/icons/ThLarge'

export default defineType({
  name: 'kandis_auswahl',
  title: 'Kandidierende AGH',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'amount',
      title: 'Menge (Angabe wird nicht verwendet)',
      type: 'number',
    }),
  ],
})
