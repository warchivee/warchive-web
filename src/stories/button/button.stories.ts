import type { Meta, StoryObj } from '@storybook/react';
import Button from '@components/button/index';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button/Button',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = {
  args: {
    children: '버튼',
    icon: undefined,
    iconColor: undefined,
    labelColor: 'white',
    background: 'purple',
    border: 'default',
    align: 'default',
    width: 'default',
  },
};

export const IconWithText: Story = {
  args: { children: '즐겨찾기 목록', icon: 'star' },
};

export const IconWithTextReverse: Story = {
  args: {
    children: '위로',
    icon: 'angles-up',
    align: 'reverse',
    iconColor: 'purple',
    labelColor: 'purple',
  },
};

export const OnlyIcon: Story = {
  args: {
    icon: 'star',
    background: 'selago',
    border: 'round',
  },
};

export const RoundButton: Story = {
  args: {
    children: '검색초기화',
    border: 'round',
    background: 'purple',
    labelColor: 'selago',
  },
};

export const Percent100Button: Story = {
  args: {
    children: '가로를 꽉 채웠어요',
    width: 'full',
    background: 'purple',
    labelColor: 'selago',
  },
};

export const BigLabelButton: Story = {
  args: {
    children: '큰 라벨 적용했어요',
    size: 'big',
    background: 'purple',
    labelColor: 'selago',
  },
};

export const SmallLabelButton: Story = {
  args: {
    children: '작은 라벨 적용했어요',
    size: 'small',
    background: 'purple',
    labelColor: 'selago',
  },
};
