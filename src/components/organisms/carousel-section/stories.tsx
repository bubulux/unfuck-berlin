import type { Meta, StoryObj } from '@storybook/react-vite'
import { CarouselSection } from './index'

const meta = {
  title: 'Organisms/CarouselSection',
  component: CarouselSection,
  parameters: { layout: 'fullscreen' },
  args: {
    images: [
      { src: '/pics/meets/1.png', alt: 'Meet & Greet 1' },
      { src: '/pics/meets/2.png', alt: 'Meet & Greet 2' },
      { src: '/pics/meets/3.png', alt: 'Meet & Greet 3' },
    ],
  },
} satisfies Meta<typeof CarouselSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
