import type { Meta, StoryObj } from '@storybook/react-vite'
import { RichText } from './index'

const meta = {
  title: 'Molecules/RichText',
  component: RichText,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div
        style={{
          background: 'var(--color-white)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          maxWidth: '40rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    color: 'purple',
    text: '<strong>Berlin ist pulsierend, aber sein Herzschlag erreicht die\nPolitik nicht.</strong>\n\nDie Folgen spüren Berliner*innen täglich: Wohnungen, die unbezahlbar sind. Schulen, die marode sind.\n\nMit unserem Wahlprogramm legen wir einen konkreten Plan vor: <strong>pragmatisch, evidenzbasiert und europäisch.</strong>',
  },
} satisfies Meta<typeof RichText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
