import type { Meta, StoryObj } from '@storybook/react-vite'
import { CandidateCluster } from './index'

const DEMO = Array.from({ length: 9 }, (_, i) => ({
  image: `/pics/kandis/${['rainer-seider', 'aiga-marie-senftleben', 'rafael-kaaz', 'ingo-partey', 'juliane-kalbacher', 'cara-seeberg', 'theresa-schueltken', 'pia-voltz', 'sascha-hellwig'][i]}.png`,
  alt: 'Kandidierende:r',
}))

const meta = {
  title: 'Molecules/CandidateCluster',
  component: CandidateCluster,
  args: { images: DEMO },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-purple)', padding: '1.5rem', maxWidth: '24rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CandidateCluster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
