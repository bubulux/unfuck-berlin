import type { Meta, StoryObj } from '@storybook/react-vite'
import { EuropeStars } from './index'

const meta = {
  title: 'Atoms/EuropeStars',
  component: EuropeStars,
  argTypes: { size: { control: 'text' } },
  args: { size: '4rem' },
} satisfies Meta<typeof EuropeStars>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** Inherits currentColor — here neon. */
export const Colored: Story = {
  args: { size: '4rem' },
  render: (args) => (
    <div style={{ color: 'var(--color-neon)' }}>
      <EuropeStars {...args} />
    </div>
  ),
}
