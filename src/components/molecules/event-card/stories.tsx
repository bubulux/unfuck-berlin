import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventCard } from './index'

const meta = {
  title: 'Molecules/EventCard',
  component: EventCard,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-neon)', padding: '1.5rem', maxWidth: '32rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    day: '18-19',
    month: 'JUL',
    title: 'Lesbisch-Schwules Stadtfest',
    details: 'Motzstraßenfest',
  },
} satisfies Meta<typeof EventCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLocation: Story = {
  args: {
    day: '22',
    month: 'JUL',
    title: 'Infoabend Volt Reinickendorf',
    details: 'Restaurant Lucky Chinese, Alt-Tegel 27, 13507 Berlin, 18:00 Uhr',
  },
}

export const WithTime: Story = {
  args: {
    day: '25',
    month: 'JUL',
    title: '💜 CSD mit Volt Berlin 🏳️‍🌈',
    details: '12:00 – 18:00 Uhr',
  },
}
