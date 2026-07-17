import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageLayout } from './index'
import { Text } from '../../atoms/text'

const meta = {
  title: 'Templates/PageLayout',
  component: PageLayout,
  parameters: { layout: 'fullscreen' },
  args: {
    activePath: '/wahlprogramm',
    children: (
      <div style={{ display: 'grid', gap: '1rem' }}>
        <Text as="h1" variant="titel" color="white">
          Seiteninhalt
        </Text>
        <Text variant="body" color="white">
          Der Seiteninhalt steht hier zwischen Header, „Was mehr?“-Block und
          Footer.
        </Text>
      </div>
    ),
  },
} satisfies Meta<typeof PageLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutWasMehr: Story = { args: { hideWasMehr: true } }
