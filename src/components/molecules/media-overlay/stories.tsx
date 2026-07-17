import type { Meta, StoryObj } from '@storybook/react-vite'
import { MediaOverlay } from './index'

const meta = {
  title: 'Molecules/MediaOverlay',
  component: MediaOverlay,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '24rem', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    src: '/pics/wahlsystem/paul-anna-portrait.png',
    alt: 'Paul Löper und Anna Auerbach',
    captionLabel: 'Spitzenduo Volt kennenlernen',
    captionTo: '/spitzenkandidaten',
  },
} satisfies Meta<typeof MediaOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
