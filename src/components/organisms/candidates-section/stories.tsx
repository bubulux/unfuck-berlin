import type { Meta, StoryObj } from '@storybook/react-vite'
import { CandidatesSection } from './index'

const meta = {
  title: 'Organisms/CandidatesSection',
  component: CandidatesSection,
  parameters: { layout: 'fullscreen' },
  args: {
    imageSrc: '/pics/unsereKandidatenPortraitCluster.png',
    imageAlt: 'Die Kandidierenden von Volt Berlin',
    ctaTo: '/kandidierende',
  },
} satisfies Meta<typeof CandidatesSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
