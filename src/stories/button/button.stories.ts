import type { Meta, StoryObj } from '@storybook/react';
import Button from '@components/button/Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Button/Button',
  tags: ['autodocs'],

  // layout = centered 옵션을 주면 부모 width/height 을 받아오지 못해 width=100% 적용이 안 된다.
};

export default meta;
type Story = StoryObj<typeof Button>;

export const DefaultButton: Story = {
  args: {
    children: '버튼',
    type: 'default',
  },
};

export const RoundButton: Story = {
  args: {
    children: '검색초기화',
    type: 'round',
  },
};

export const Percent100Button: Story = {
  args: {
    children: '가로를 꽉 채웠어요',
    type: 'round',
    width: 'full',
  },
};

export const BigLabelButton: Story = {
  args: {
    children: '큰 라벨 적용했어요',
    size: 'big',
  },
};

export const SmallLabelButton: Story = {
  args: {
    children: '작은 라벨 적용했어요',
    size: 'small',
  },
};
