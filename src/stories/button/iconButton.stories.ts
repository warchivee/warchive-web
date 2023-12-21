import type { Meta, StoryObj } from '@storybook/react';
import IconButton from '@components/button/IconButton';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Button/IconButton',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const IconWithText: Story = {
  args: { children: '즐겨찾기 목록', icon: 'star' },
};

export const IconWithTextReverse: Story = {
  args: {
    children: '즐겨찾기 목록',
    icon: 'star',
    align: 'reverse',
  },
};

export const OnlyIcon: Story = {
  args: {
    icon: 'star',
  },
};
