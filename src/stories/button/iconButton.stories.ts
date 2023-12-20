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

export const OnlyIcon: Story = {
  args: {
    icon: 'star',
  },
};

export const IconWithText: Story = {
  args: {
    icon: 'star',
    label: '즐겨찾기 목록',
  },
};

export const IconWithTextReverse: Story = {
  args: {
    icon: 'star',
    label: '즐겨찾기 목록',
    align: 'reverse',
  },
};
