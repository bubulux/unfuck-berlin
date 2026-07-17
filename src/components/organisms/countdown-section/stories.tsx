import type { Meta, StoryObj } from '@storybook/react-vite'
import { CountdownSection } from './index'

const meta = {
  title: 'Organisms/CountdownSection',
  component: CountdownSection,
  parameters: { layout: 'fullscreen' },
  args: {
    target: '2026-09-20T00:00:00',
    ctaTo: '/wahlsystem',
  },
} satisfies Meta<typeof CountdownSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
