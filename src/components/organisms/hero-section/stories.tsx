import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeroSection } from './index'

const meta = {
  title: 'Organisms/HeroSection',
  component: HeroSection,
  parameters: { layout: 'fullscreen' },
  args: {
    videoSrc: 'https://www.youtube-nocookie.com/embed/ub8UIZ0FvRs',
    videoTitle: 'Anna und Paul',
    logoSrc: '/logos/unfckBerlin.svg',
    logoAlt: 'unf*ck berlin',
    text: 'Volt macht, was woanders funktioniert. Egal, ob die Idee aus Berlin, Kopenhagen oder Warschau kommt. So einfach. So selten.',
    ctaLabel: 'Wahlprogramm kurz',
    ctaTo: '/wahlprogramm',
  },
} satisfies Meta<typeof HeroSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
