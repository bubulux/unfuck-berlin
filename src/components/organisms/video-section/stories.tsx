import type { Meta, StoryObj } from '@storybook/react-vite'
import { VideoSection } from './index'

const meta = {
  title: 'Organisms/VideoSection',
  component: VideoSection,
  parameters: { layout: 'fullscreen' },
  args: {
    videoSrc: '/vids/20260715_VOLT_UNFCK_REVEAL_LONG_VERSION_FINAL_XtraSmall.mp4',
    videoPoster: '/vids/unfck_reveal_poster.jpg',
    videoTitle: '15. Juli 2026',
    videoAspect: '9 / 16',
  },
} satisfies Meta<typeof VideoSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
