import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router'
import { CandidateDetail } from './index'

const DEMO = {
  name: 'Paul Löper',
  image: '/pics/spitzen/paulMain.png',
  imageAlt: 'Paul Löper',
  meta: [
    'Kandidat der Landesliste Volt Berlin',
    'Listenplatz: 2 | Alter: 36 | Bezirk: Pankow',
  ],
  followLabel: 'Folge Paul',
  socials: [
    { platform: 'linkedin' as const, href: 'https://de.linkedin.com/in/paul-loeper' },
    { platform: 'instagram' as const, href: 'https://www.instagram.com/paul.loeper.eu/' },
  ],
  blocks: [
    {
      heading: 'Herzensthema',
      body: 'Ich will Berlin zu einem Leuchtturm der Hoffnung für eine innovative, gerechte und nachhaltige europäische Zukunft machen.',
    },
    {
      heading: 'Beruf',
      body: 'Organisations- und IT-Berater für den öffentlichen Sektor.',
    },
  ],
}

const meta = {
  title: 'Organisms/CandidateDetail',
  component: CandidateDetail,
  parameters: { layout: 'fullscreen' },
  args: DEMO,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof CandidateDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** White background, black text, purple subtitles. */
export const Light: Story = { args: { variant: 'light' } }
