import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageCarousel } from './index'

const meta = {
  title: 'Molecules/ImageCarousel',
  component: ImageCarousel,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '28rem', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    images: [
      { src: '/pics/meets/1.png', alt: 'Meet & Greet 1' },
      { src: '/pics/meets/2.png', alt: 'Meet & Greet 2' },
      { src: '/pics/meets/3.png', alt: 'Meet & Greet 3' },
    ],
  },
} satisfies Meta<typeof ImageCarousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
