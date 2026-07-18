import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarSection } from './index'

const meta = {
  title: 'Organisms/CalendarSection',
  component: CalendarSection,
  parameters: { layout: 'fullscreen' },
  args: {
    viewAllTo: '/termine',
    events: [
      {
        id: '1',
        day: '18-19',
        month: 'JUL',
        title: 'Lesbisch-Schwules Stadtfest',
        location: 'Motzstraßenfest',
      },
      {
        id: '2',
        day: '22',
        month: 'JUL',
        title: 'Infoabend Volt Reinickendorf',
        location: 'Restaurant Lucky Chinese, Alt-Tegel 27, 13507 Berlin',
        time: '18:00 Uhr',
      },
      {
        id: '3',
        day: '25',
        month: 'JUL',
        title: '💜 CSD mit Volt Berlin 🏳️‍🌈',
        time: '12:00 – 18:00 Uhr',
      },
    ],
  },
} satisfies Meta<typeof CalendarSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = { args: { events: [] } }
