import type { Meta, StoryObj } from '@storybook/react';
import Icon from '@components/icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'Icon/Icon',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Example: Story = {
  args: {
    type: 'star',
    color: 'purple',
    size: 'big',
  },
};
