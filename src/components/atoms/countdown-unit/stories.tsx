import type { Meta, StoryObj } from '@storybook/react-vite'
import { CountdownUnit } from './index'

const meta = {
  title: 'Atoms/CountdownUnit',
  component: CountdownUnit,
  args: { value: '100', label: 'Tage' },
} satisfies Meta<typeof CountdownUnit>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '6rem' }}>
      <CountdownUnit {...args} />
    </div>
  ),
}
