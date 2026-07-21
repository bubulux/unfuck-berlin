import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { CandidatesSection } from './index'

const meta = {
  title: 'Organisms/CandidatesSection',
  component: CandidatesSection,
  parameters: { layout: 'fullscreen' },
  args: {
    ctaTo: '/kandidierende',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof CandidatesSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
