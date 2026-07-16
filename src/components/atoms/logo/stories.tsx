import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from './index'

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  argTypes: {
    variant: { control: 'inline-radio', options: ['white', 'purple'] },
    height: { control: 'text' },
  },
  args: { variant: 'white', height: '2rem' },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const White: Story = { args: { variant: 'white' } }

export const Purple: Story = {
  args: { variant: 'purple' },
  parameters: { backgrounds: { default: 'light' } },
  render: (args) => (
    <div style={{ background: '#fff', padding: '1rem' }}>
      <Logo {...args} />
    </div>
  ),
}
