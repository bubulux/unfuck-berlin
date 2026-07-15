import { defineType } from 'sanity'

export default defineType({
  name: 'kandis_grid',
  title: 'Kandidierende AGH',
  type: 'object',
  fields: [
    defineField({
      name: 'amount',
      title: 'Menge (Angabe wird nicht verwendet)',
      type: 'number',
    }),
  ],
})
