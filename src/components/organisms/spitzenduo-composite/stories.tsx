import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { SpitzenduoComposite } from './index'

const DEMO = [
  {
    vorname: 'Anna',
    nachname: 'Auerbach',
    role: 'Volt Spitzenkandidatin',
    image: '/pics/spitzen/annaMain.png',
    alt: 'Anna Auerbach',
    bg: '#5b3381',
    to: '/kandidierende/anna-auerbach',
  },
  {
    vorname: 'Paul',
    nachname: 'Löper',
    role: 'Volt Spitzenkandidat',
    image: '/pics/spitzen/paulMain.png',
    alt: 'Paul Löper',
    bg: '#382255',
    to: '/kandidierende/paul-loeper',
  },
]

const meta = {
  title: 'Organisms/SpitzenduoComposite',
  component: SpitzenduoComposite,
  args: { people: DEMO },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ maxWidth: '40rem' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof SpitzenduoComposite>

export default meta
type Story = StoryObj<typeof meta>

/** On the purple home section. */
export const OnPurple: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-purple)', padding: '1.5rem' }}>
        <Story />
      </div>
    ),
  ],
}

/** On the light wahlsystem section. */
export const OnLight: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-white)', padding: '1.5rem' }}>
        <Story />
      </div>
    ),
  ],
}
