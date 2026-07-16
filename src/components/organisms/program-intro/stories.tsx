import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgramIntro } from './index'
import { Text } from '../../atoms/text'

const meta = {
  title: 'Organisms/ProgramIntro',
  component: ProgramIntro,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ProgramIntro>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <Text color="purple" weight="bold">
          Berlin ist pulsierend, aber sein Herzschlag erreicht die Politik nicht.
        </Text>
        <Text color="purple">
          Die Folgen spüren Berliner*innen täglich: Wohnungen, die unbezahlbar
          sind. Schulen, die marode sind.
        </Text>
        <Text color="purple">
          Mit unserem Wahlprogramm legen wir einen echten, konkreten Plan vor:{' '}
          <strong>pragmatisch, evidenzbasiert und europäisch.</strong>
        </Text>
      </>
    ),
  },
}
