import type { Meta, StoryObj } from '@storybook/react-vite'
import { CandidateCard } from './index'

const meta = {
  title: 'Molecules/CandidateCard',
  component: CandidateCard,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-white)', padding: '1.5rem', width: '12rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    name: 'Anna Auerbach',
    image: '/pics/kandis/anna-auerbach.jpg',
    listenplatz: 1,
    bezirk: 'Mitte',
  },
} satisfies Meta<typeof CandidateCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
