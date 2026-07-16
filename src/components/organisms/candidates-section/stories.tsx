import type { Meta, StoryObj } from '@storybook/react-vite'
import { CandidatesSection } from './index'

const meta = {
  title: 'Organisms/CandidatesSection',
  component: CandidatesSection,
  parameters: { layout: 'fullscreen' },
  args: {
    imageSrc: '/pics/unsereKandidatenPortraitCluster.png',
    imageAlt: 'Die Kandidatinnen und Kandidaten von Volt Berlin',
    ctaTo: '/kandidaten',
  },
} satisfies Meta<typeof CandidatesSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
