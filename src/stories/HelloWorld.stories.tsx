import type { Meta, StoryObj } from '@storybook/react-vite';

function HelloWorld() {
  return <h1>Hello World</h1>;
}

const meta = {
  title: 'Example/HelloWorld',
  component: HelloWorld,
} satisfies Meta<typeof HelloWorld>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
