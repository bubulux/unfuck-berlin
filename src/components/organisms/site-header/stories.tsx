import type { Meta, StoryObj } from '@storybook/react-vite'
import { SiteHeader } from './index'

const meta = {
  title: 'Organisms/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
  args: { activePath: '/wahlprogramm' },
} satisfies Meta<typeof SiteHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
