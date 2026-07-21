import type { Meta, StoryObj } from '@storybook/react-vite'
import { VotingSystemSection } from './index'

const meta = {
  title: 'Organisms/VotingSystemSection',
  component: VotingSystemSection,
  parameters: { layout: 'fullscreen' },
  args: {
    headingLines: ['Erste & Zweite', 'Stimme:', 'Vote Volt'],
    first: {
      title: 'Die Erststimme – Deine Wahl für eine Person',
      paragraphs: [
        'Mit der Erststimme wählst du eine Kandidatin oder einen Kandidaten aus deinem Wahlkreis. Diese Person vertritt deine Region im Parlament und setzt sich dort für die Interessen der Menschen vor Ort ein.',
        'Wer die meisten Stimmen im Wahlkreis erhält, gewinnt das Direktmandat.',
      ],
    },
    media: {
      src: '/pics/paulAnnaWahlsystem.png',
      alt: 'Paul Löper und Anna Auerbach',
      captionLabel: 'Spitzenduo Volt kennenlernen',
      captionTo: '/kandidierende',
    },
    second: {
      title: 'Die Zweitstimme – Deine Wahl für VOLT',
      paragraphs: [
        'Mit der Zweitstimme entscheidest du, welche Partei wie stark im Parlament vertreten ist. Sie ist ausschlaggebend für die Sitzverteilung und bestimmt damit maßgeblich die politischen Mehrheiten.',
      ],
    },
  },
} satisfies Meta<typeof VotingSystemSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
