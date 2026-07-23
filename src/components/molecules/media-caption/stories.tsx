import type { Meta, StoryObj } from '@storybook/react-vite'
import { MediaCaption } from './index'

const meta = {
  title: 'Molecules/MediaCaption',
  component: MediaCaption,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-white)', padding: '1.5rem', maxWidth: '28rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    src: '/pics/paulAnnaWahlsystem.png',
    alt: 'Paul und Anna',
    captionLabel: 'Spitzenduo Volt kennenlernen',
    captionTo: '/kandidierende',
  },
} satisfies Meta<typeof MediaCaption>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
