import type { Meta, StoryObj } from "@storybook/react-vite";
import { HighlightText } from "./index";

const meta = {
  title: "Atoms/HighlightText",
  component: HighlightText,
  argTypes: {
    variant: {
      control: "select",
      options: ["titel", "subtitel", "body", "cta", "fussnote", "kalender"],
    },
    color: {
      control: "select",
      options: ["purple", "white", "yellow", "neon", "green", "blue", "pink"],
    },
    textColor: {
      control: "select",
      options: ["purple", "white", "yellow", "neon", "green", "blue", "pink"],
    },
    direction: { control: "inline-radio", options: ["column", "row"] },
    align: { control: "inline-radio", options: ["left", "center", "right"] },
    slant: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    uppercase: { control: "boolean" },
  },
  args: {
    lines: ["UnF*ck", "Berlin"],
    variant: "titel",
    color: "neon",
    textColor: "purple",
    direction: "column",
    align: "left",
  },
} satisfies Meta<typeof HighlightText>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Interactive playground. */
export const Playground: Story = {};

/** White boxes / purple text — the section heading style. */
export const UnsereKandidaten: Story = {
  args: {
    as: "h2",
    lines: ["Unsere", "Kandidierenden"],
    variant: "titel",
    color: "white",
    textColor: "purple",
    align: "center",
    uppercase: true,
  },
};

/** Neon boxes / purple text, lowercase logo-style. */
export const UnfuckBerlin: Story = {
  args: {
    lines: ["unf*ck", "berlin"],
    variant: "titel",
    color: "neon",
    textColor: "purple",
  },
};

/** Stacked neon call-to-action links (each box is a real link). */
export const StackedActions: Story = {
  args: {
    lines: [
      { text: "Spenden", to: "https://voltdeutschland.org/berlin/spenden" },
      { text: "Mitmachen", to: "https://voltdeutschland.org/berlin/mitmachen" },
      { text: "Sticker abgreifen", to: "/sticker" },
    ],
    variant: "subtitel",
    color: "neon",
    textColor: "purple",
  },
};

/** Inline row of purple topic pills. Shown on a light backdrop (as in the design)
 * so the purple boxes are visible against the otherwise-purple canvas. */
export const TopicRow: Story = {
  args: {
    lines: ["Verwaltung", "Digitalisierung", "Beteiligung"],
    variant: "body",
    color: "purple",
    textColor: "white",
    direction: "row",
  },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--color-white)", padding: "1.5rem" }}>
        <Story />
      </div>
    ),
  ],
};

/** Single green heading box. */
export const Wahlprogramm: Story = {
  args: {
    as: "h2",
    lines: ["Wahlprogramm"],
    variant: "titel",
    color: "green",
    textColor: "purple",
    uppercase: true,
  },
};

/** Two-line yellow claim. */
export const EuropaeischDenken: Story = {
  args: {
    lines: ["Europäisch denken,", "lokal liefern"],
    variant: "subtitel",
    color: "yellow",
    textColor: "purple",
  },
};

/** Per-segment color + tilt overrides. */
export const MixedColors: Story = {
  args: {
    lines: [
      { text: "Berlin", color: "pink", textColor: "white" },
      { text: "besser", color: "blue", textColor: "purple" },
      { text: "machen", color: "neon", textColor: "purple" },
    ],
    variant: "titel",
  },
};

export const WasMehr: Story = {
  args: {
    lines: ["Was", "Mehr?"],
    variant: "titel",
    color: "neon",
    textColor: "purple",
    direction: "column",
    align: "left",
    slant: 0.1,
    style: { fontWeight: "bold" },
    uppercase: true,
  },
};
