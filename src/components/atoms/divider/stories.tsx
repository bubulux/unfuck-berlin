import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider } from './index'

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    color: {
      control: 'select',
      options: ['purple', 'white', 'yellow', 'neon', 'green', 'blue', 'pink'],
    },
    height: { control: 'text' },
  },
  args: { color: 'neon' },
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Neon: Story = {}
