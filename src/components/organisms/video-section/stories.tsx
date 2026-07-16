import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideoSection } from './index'

const meta = {
  title: 'Organisms/VideoSection',
  component: VideoSection,
  parameters: { layout: 'fullscreen' },
  args: {
    videoSrc: 'https://www.youtube-nocookie.com/embed/BwVBRkJxt-w',
    videoTitle: '15. Juli 2026',
    videoAspect: '9 / 16',
    autoplay: false,
  },
} satisfies Meta<typeof VideoSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
