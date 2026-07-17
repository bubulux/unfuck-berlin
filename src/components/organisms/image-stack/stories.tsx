import type { Meta, StoryObj } from '@storybook/react-vite'
import { ImageStack } from './index'

const meta = {
  title: 'Organisms/ImageStack',
  component: ImageStack,
  parameters: { layout: 'fullscreen' },
  args: {
    images: [
      { src: '/pics/unfck/1.png', alt: 'unf*ck berlin 1' },
      { src: '/pics/unfck/2.png', alt: 'unf*ck berlin 2' },
      { src: '/pics/unfck/3.png', alt: 'unf*ck berlin 3' },
      { src: '/pics/unfck/4.png', alt: 'unf*ck berlin 4' },
    ],
  },
} satisfies Meta<typeof ImageStack>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
