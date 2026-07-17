import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './index'

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  argTypes: {
    variant: { control: 'inline-radio', options: ['pill', 'label'] },
    color: {
      control: 'select',
      options: ['purple', 'white', 'yellow', 'neon', 'green', 'blue', 'pink'],
    },
  },
  args: {
    children: 'Veranstaltung',
    variant: 'pill',
    color: 'neon',
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Pill: Story = {}

export const Label: Story = {
  args: { variant: 'label', color: 'neon', children: 'Was mehr?' },
}

export const Categories: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
      <Tag color="neon">Straßenwahlkampf</Tag>
      <Tag color="pink">Infoabend</Tag>
      <Tag color="yellow">Kundgebung</Tag>
      <Tag color="blue">Veranstaltung</Tag>
      <Tag color="green">Aktion</Tag>
    </div>
  ),
}
