import type { Meta, StoryObj } from '@storybook/react-vite'
import { DateBadge } from './index'

const meta = {
  title: 'Atoms/DateBadge',
  component: DateBadge,
  parameters: { backgrounds: { default: 'light' } },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-white)', padding: '1rem' }}>
        <Story />
      </div>
    ),
  ],
  args: { day: '18-19', month: 'JUL', color: 'purple' },
} satisfies Meta<typeof DateBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Range: Story = {}
export const SingleDay: Story = { args: { day: '22', month: 'JUL' } }
