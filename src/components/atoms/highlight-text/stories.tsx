import type { Meta, StoryObj } from '@storybook/react-vite'
import { HighlightText } from './index'

const meta = {
  title: 'Atoms/HighlightText',
  component: HighlightText,
  argTypes: {
    variant: {
      control: 'select',
      options: ['titel', 'subtitel', 'body', 'cta', 'fussnote', 'kalender'],
    },
    color: {
      control: 'select',
      options: ['purple', 'white', 'yellow', 'neon', 'green', 'blue', 'pink'],
    },
    textColor: {
      control: 'select',
      options: ['purple', 'white', 'yellow', 'neon', 'green', 'blue', 'pink'],
    },
    direction: { control: 'inline-radio', options: ['column', 'row'] },
    align: { control: 'inline-radio', options: ['left', 'center', 'right'] },
    skew: { control: { type: 'range', min: 0, max: 20, step: 1 } },
    uppercase: { control: 'boolean' },
  },
  args: {
    lines: ['UnF*ck', 'Berlin'],
    variant: 'titel',
    color: 'neon',
    textColor: 'purple',
    direction: 'column',
    align: 'left',
    skew: 8,
  },
} satisfies Meta<typeof HighlightText>

export default meta
type Story = StoryObj<typeof meta>

/** Interactive playground. */
export const Playground: Story = {}

/** White boxes / purple text — the section heading style. */
export const UnsereKandidaten: Story = {
  args: {
    as: 'h2',
    lines: ['Unsere', 'Kandidaten'],
    variant: 'titel',
    color: 'white',
    textColor: 'purple',
    uppercase: true,
  },
}

/** Neon boxes / purple text, lowercase logo-style. */
export const UnfuckBerlin: Story = {
  args: {
    lines: ['unf*ck', 'berlin'],
    variant: 'titel',
    color: 'neon',
    textColor: 'purple',
  },
}

/** Stacked neon call-to-action links. */
export const StackedActions: Story = {
  args: {
    lines: ['Spenden', 'Newsletter', 'Volt Deutschland'],
    variant: 'subtitel',
    color: 'neon',
    textColor: 'purple',
  },
}

/** Inline row of purple topic pills. Shown on a light backdrop (as in the design)
 * so the purple boxes are visible against the otherwise-purple canvas. */
export const TopicRow: Story = {
  args: {
    lines: ['Verwaltung', 'Digitalisierung', 'Beteiligung'],
    variant: 'body',
    color: 'purple',
    textColor: 'white',
    direction: 'row',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-white)', padding: '1.5rem' }}>
        <Story />
      </div>
    ),
  ],
}

/** Single green heading box. */
export const Wahlprogramm: Story = {
  args: {
    as: 'h2',
    lines: ['Wahlprogramm'],
    variant: 'titel',
    color: 'green',
    textColor: 'purple',
    uppercase: true,
  },
}

/** Two-line yellow claim. */
export const EuropaeischDenken: Story = {
  args: {
    lines: ['Europäisch denken,', 'lokal liefern'],
    variant: 'subtitel',
    color: 'yellow',
    textColor: 'purple',
  },
}

/** Per-segment color + tilt overrides. */
export const MixedColors: Story = {
  args: {
    lines: [
      { text: 'Berlin', color: 'pink', textColor: 'white' },
      { text: 'besser', color: 'blue', textColor: 'purple' },
      { text: 'machen', color: 'neon', textColor: 'purple' },
    ],
    variant: 'titel',
  },
}
