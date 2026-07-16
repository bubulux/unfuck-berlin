import type { Meta, StoryObj } from '@storybook/react-vite'
import { WasMehrNav } from './index'

const meta = {
  title: 'Organisms/WasMehrNav',
  component: WasMehrNav,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof WasMehrNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
