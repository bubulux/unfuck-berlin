import type { Meta, StoryObj } from '@storybook/react-vite'
import { SiteHeader } from './index'

const meta = {
  title: 'Organisms/SiteHeader',
  component: SiteHeader,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['purple', 'light'] },
  },
  args: { activePath: '/wahlprogramm', variant: 'purple' },
} satisfies Meta<typeof SiteHeader>

export default meta
type Story = StoryObj<typeof meta>

/** White logo/text on purple. */
export const OnPurple: Story = { args: { variant: 'purple' } }

/** Purple logo/text on a light background (uses the lila logo). */
export const OnLight: Story = {
  args: { variant: 'light' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-white)', minHeight: '10rem' }}>
        <Story />
      </div>
    ),
  ],
}

/**
 * Resize the preview below ~768px to see the links collapse into the burger
 * menu (click it to open the drop-down panel).
 */
export const Responsive: Story = { args: { variant: 'purple' } }
