import type { Meta, StoryObj } from '@storybook/react-vite'
import { LazyVideo } from './index'

const meta = {
  title: 'Molecules/LazyVideo',
  component: LazyVideo,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: '13.5rem', height: '24rem', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    src: '/vids/anna_paul_intro.mp4',
    poster: '/vids/anna_paul_intro_poster.jpg',
    title: 'Anna und Paul',
  },
} satisfies Meta<typeof LazyVideo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
