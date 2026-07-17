import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './index'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    color: {
      control: 'select',
      options: ['purple', 'white', 'yellow', 'neon', 'green', 'blue', 'pink'],
    },
    variant: { control: 'inline-radio', options: ['solid', 'outline'] },
    size: { control: 'inline-radio', options: ['default', 'cta'] },
    fullWidth: { control: 'boolean' },
  },
  args: {
    children: 'Jetzt mitmachen',
    color: 'neon',
    variant: 'solid',
    size: 'default',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: { children: 'Wahlprogramm ansehen', iconRight: '→' },
}

export const Outline: Story = {
  args: { variant: 'outline', color: 'neon', children: 'Mehr erfahren' },
}

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      {(['neon', 'yellow', 'green', 'blue', 'pink', 'purple', 'white'] as const).map(
        (c) => (
          <Button key={c} color={c}>
            {c}
          </Button>
        ),
      )}
    </div>
  ),
}
