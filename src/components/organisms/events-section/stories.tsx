import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventsSection } from './index'
import { Text } from '../../atoms/text'

const meta = {
  title: 'Organisms/EventsSection',
  component: EventsSection,
  parameters: { layout: 'fullscreen' },
  args: {
    intro: [
      'Lern unsere AGH und BVV Kandidierenden kennen oder mach direkt bei Volt mit!',
      'Wir freuen uns auf Dich auf Podien, Meet&Greets, und anderen Veranstaltungen zu begrüßen.',
    ],
    events: [
      { id: '1', day: '18-19', month: 'JUL', title: 'Lesbisch-Schwules Stadtfest', details: 'Motzstraßenfest' },
      { id: '2', day: '22', month: 'JUL', title: 'Infoabend Volt Reinickendorf', details: 'Restaurant Lucky Chinese, Alt-Tegel 27, 13507 Berlin, 18:00 Uhr' },
      { id: '3', day: '24', month: 'JUL', title: 'FLINTA* Stammtisch', details: 'Choriner Str. 34, 13189 Berlin, 19:00 Uhr' },
    ],
    children: (
      <Text as="p" variant="body" color="white">
        Du vermisst hier ein Event? <strong>Dann lad' uns ein!</strong>
      </Text>
    ),
  },
} satisfies Meta<typeof EventsSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
