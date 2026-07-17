import type { Meta, StoryObj } from '@storybook/react-vite'
import { ProgramSection } from './index'
import { PROGRAM_PILLARS } from '../../../data/program'

const meta = {
  title: 'Organisms/ProgramSection',
  component: ProgramSection,
  parameters: { layout: 'fullscreen' },
  args: { pillars: PROGRAM_PILLARS },
} satisfies Meta<typeof ProgramSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
