import type { Meta, StoryObj } from '@storybook/react-vite'
import { SocialRow } from './index'

const meta = {
  title: 'Molecules/SocialRow',
  component: SocialRow,
  args: {
    links: [
      { platform: 'instagram', href: '#' },
      { platform: 'tiktok', href: '#' },
      { platform: 'youtube', href: '#' },
      { platform: 'linkedin', href: '#' },
      { platform: 'x', href: '#' },
      { platform: 'facebook', href: '#' },
    ],
  },
} satisfies Meta<typeof SocialRow>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
