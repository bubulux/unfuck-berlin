import type { Meta, StoryObj } from '@storybook/react-vite'
import { SocialIcon } from './index'

const meta = {
  title: 'Atoms/SocialIcon',
  component: SocialIcon,
  argTypes: {
    platform: {
      control: 'select',
      options: ['instagram', 'tiktok', 'youtube', 'linkedin', 'x', 'facebook'],
    },
  },
  args: { platform: 'instagram', href: 'https://instagram.com' },
} satisfies Meta<typeof SocialIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {}

export const AllPlatforms: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      {(['instagram', 'tiktok', 'youtube', 'linkedin', 'x', 'facebook'] as const).map(
        (p) => (
          <SocialIcon key={p} platform={p} href="#" />
        ),
      )}
    </div>
  ),
}
