import type { Meta, StoryObj } from '@storybook/react';
import { Content } from '@components/text/index';

const meta: Meta<typeof Content> = {
  component: Content,
  title: 'Text/Content',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Content>;

export const Example: Story = {
  args: {
    value: '내용',
  },
};
