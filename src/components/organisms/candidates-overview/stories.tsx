import type { Meta, StoryObj } from '@storybook/react-vite'
import { CandidatesOverview } from './index'
import { Text } from '../../atoms/text'
import { KANDIDATEN } from '../../../data/kandidaten'

const meta = {
  title: 'Organisms/CandidatesOverview',
  component: CandidatesOverview,
  parameters: { layout: 'fullscreen' },
  args: {
    heading: 'Gemeinsam für ein besseres Berlin',
    candidates: KANDIDATEN,
    children: (
      <Text color="purple">
        Unsere Kandidierenden stehen für frische Ideen,
        lösungsorientierte Politik und den Mut, neue Wege zu gehen.
      </Text>
    ),
  },
} satisfies Meta<typeof CandidatesOverview>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
