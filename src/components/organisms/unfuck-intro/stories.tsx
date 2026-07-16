import type { Meta, StoryObj } from '@storybook/react-vite'
import { UnfuckIntro } from './index'
import { Text } from '../../atoms/text'

const meta = {
  title: 'Organisms/UnfuckIntro',
  component: UnfuckIntro,
  parameters: { layout: 'fullscreen' },
  args: {
    logoSrc: '/logos/unfckBerlin.svg',
    logoAlt: 'unf*ck berlin',
    headline:
      'Eine Politik, die unsere Zukunft gestaltet, statt die Gegenwart zu verwalten.',
    ctaLabel: 'Sticker abgreifen',
    ctaTo: '/sticker',
    children: (
      <>
        <Text color="white">
          Hinter unf*ck berlin steckt eine einfache Idee: Probleme verschwinden
          nicht, wenn man höflicher über sie spricht.
        </Text>
        <Text color="white">
          Deshalb ist das hier keine Protestkampagne. Es ist eine Einladung,
          wieder Erwartungen an diese Stadt zu haben.
        </Text>
      </>
    ),
  },
} satisfies Meta<typeof UnfuckIntro>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
