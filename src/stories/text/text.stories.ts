import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@components/text/index';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Text/Text',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Example: Story = {
  args: {
    children: '내용',
  },
};
