import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideoPlayer } from './index'

const meta = {
  title: 'Molecules/VideoPlayer',
  component: VideoPlayer,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '20rem', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    src: '/vids/20260715_VOLT_UNFCK_REVEAL_LONG_VERSION_FINAL_XtraSmall.mp4',
    poster: '/vids/unfck_reveal_poster.jpg',
    title: '15. Juli 2026',
    aspect: '9 / 16',
  },
} satisfies Meta<typeof VideoPlayer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
