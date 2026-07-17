import type { Meta, StoryObj } from '@storybook/react-vite'
import { CountdownTimer } from './index'

const meta = {
  title: 'Molecules/CountdownTimer',
  component: CountdownTimer,
  args: { target: '2026-09-20T00:00:00' },
} satisfies Meta<typeof CountdownTimer>

export default meta
type Story = StoryObj<typeof meta>

/** Counts down to the election date (20 Sept 2026). */
export const Default: Story = {
  render: (args) => (
    <div style={{ maxWidth: '30rem' }}>
      <CountdownTimer {...args} />
    </div>
  ),
}
