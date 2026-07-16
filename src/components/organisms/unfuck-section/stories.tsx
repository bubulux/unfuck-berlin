import type { Meta, StoryObj } from '@storybook/react-vite'
import { UnfuckSection } from './index'

const meta = {
  title: 'Organisms/UnfuckSection',
  component: UnfuckSection,
  parameters: { layout: 'fullscreen' },
  args: {
    logoSrc: '/logos/unfckBerlin.svg',
    logoAlt: 'unf*ck berlin',
    videoSrc: 'https://www.youtube-nocookie.com/embed/BwVBRkJxt-w',
    videoTitle: '15. Juli 2026',
    text: 'Hinter unf*ck Berlin steckt eine einfache Idee: Probleme verschwinden nicht, wenn man höflicher über sie spricht. Aber sie verschwinden auch nicht, wenn man nur über sie klagt. Deshalb ist das hier keine Protestkampagne.',
    ctaLabel: 'Worum geht es?',
    ctaTo: '/unfuck-berlin',
  },
} satisfies Meta<typeof UnfuckSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
