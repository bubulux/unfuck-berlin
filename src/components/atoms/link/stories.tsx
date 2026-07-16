import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from './index'

const meta = {
  title: 'Atoms/Link',
  component: Link,
  argTypes: {
    color: {
      control: 'select',
      options: ['purple', 'white', 'yellow', 'neon', 'green', 'blue', 'pink'],
    },
    active: { control: 'boolean' },
    underline: { control: 'boolean' },
  },
  args: {
    children: 'Wahlprogramm',
    to: '/wahlprogramm',
    color: 'white',
  },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>

export const Internal: Story = {}

export const Active: Story = { args: { active: true } }

export const External: Story = {
  args: { href: 'https://volteuropa.org', children: 'volteuropa.org', to: undefined },
}
