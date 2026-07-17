import type { Meta, StoryObj } from '@storybook/react-vite'
import { CandidateDetail } from './index'
import { PAUL } from '../../../data/candidates'

const meta = {
  title: 'Organisms/CandidateDetail',
  component: CandidateDetail,
  parameters: { layout: 'fullscreen' },
  args: PAUL,
} satisfies Meta<typeof CandidateDetail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/** White background, black text, purple subtitles. */
export const Light: Story = { args: { variant: 'light' } }
