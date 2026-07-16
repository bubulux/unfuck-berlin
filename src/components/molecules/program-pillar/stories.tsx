import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgramPillar } from './index'

const meta = {
  title: 'Molecules/ProgramPillar',
  component: ProgramPillar,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-white)', padding: '1.5rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Berlin funktioniert',
    tags: ['Verwaltung', 'Digitalisierung', 'Beteiligung'],
    body: '…ist die Grundlage von allem: eine digitale Verwaltung, die an Ergebnissen gemessen wird. Mit dem Once-Only-Prinzip geben Berliner:innen ihre Daten nur einmal an, mit der Genehmigungsfiktion gelten vollständige Anträge nach Fristablauf automatisch als genehmigt.',
  },
} satisfies Meta<typeof ProgramPillar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
