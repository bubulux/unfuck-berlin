import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './index'

const meta = {
  title: 'Atoms/Text',
  component: Text,
  argTypes: {
    variant: {
      control: 'select',
      options: ['titel', 'subtitel', 'body', 'cta', 'fussnote', 'kalender'],
    },
    color: {
      control: 'select',
      options: ['purple', 'white', 'yellow', 'neon', 'green', 'blue', 'pink'],
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'bold'],
    },
    align: { control: 'inline-radio', options: ['left', 'center', 'right'] },
    uppercase: { control: 'boolean' },
  },
  args: {
    children: 'unf*ck berlin',
    variant: 'body',
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const Body: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <Text variant="titel">Titel — 34px</Text>
      <Text variant="subtitel">Subtitel — 24px</Text>
      <Text variant="body">Body — the quick brown fox jumps over the lazy dog.</Text>
      <Text variant="cta" uppercase>
        CTA — Jetzt mitmachen
      </Text>
      <Text variant="kalender">Kalender — 18–19 JUL</Text>
      <Text variant="fussnote">Fussnote — Impressum · Datenschutz</Text>
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      {(['white', 'neon', 'yellow', 'green', 'blue', 'pink'] as const).map(
        (c) => (
          <Text key={c} variant="subtitel" color={c}>
            {c}
          </Text>
        ),
      )}
    </div>
  ),
}

export const SemanticOverride: Story = {
  args: {
    variant: 'titel',
    as: 'h2',
    children: 'Looks like titel, renders as <h2>',
  },
}
