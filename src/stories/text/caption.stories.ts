import type { Meta, StoryObj } from '@storybook/react';
import { Caption } from '@components/text/index';

const meta: Meta<typeof Caption> = {
  component: Caption,
  title: 'Text/Caption',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Caption>;

export const Example: Story = {
  args: {
    value: '캡션',
  },
};
