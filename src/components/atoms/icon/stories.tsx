import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './index'

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: 'select',
      options: [
        'arrow-right',
        'arrow-left',
        'arrow-up',
        'arrow-down',
        'chevron-right',
        'chevron-left',
        'menu',
        'close',
      ],
    },
    size: { control: 'text' },
  },
  args: { name: 'arrow-right', size: '2rem' },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {}

export const All: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      {(
        [
          'arrow-right',
          'arrow-left',
          'arrow-up',
          'arrow-down',
          'chevron-right',
          'chevron-left',
          'menu',
          'close',
        ] as const
      ).map(
        (n) => (
          <Icon key={n} name={n} size="2rem" />
        ),
      )}
    </div>
  ),
}
