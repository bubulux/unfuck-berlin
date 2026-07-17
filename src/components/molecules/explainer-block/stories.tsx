import type { Meta, StoryObj } from '@storybook/react-vite'
import { ExplainerBlock } from './index'

const meta = {
  title: 'Molecules/ExplainerBlock',
  component: ExplainerBlock,
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-white)', padding: '1.5rem', maxWidth: '32rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: 'Die Erststimme – Deine Wahl für eine Person',
    paragraphs: [
      'Mit der Erststimme wählst du eine Kandidatin oder einen Kandidaten aus deinem Wahlkreis. Diese Person vertritt deine Region im Parlament und setzt sich dort für die Interessen der Menschen vor Ort ein.',
      'Wer die meisten Stimmen im Wahlkreis erhält, gewinnt das Direktmandat.',
    ],
  },
} satisfies Meta<typeof ExplainerBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
