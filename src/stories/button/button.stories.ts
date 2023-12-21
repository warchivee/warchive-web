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

export const SquareButton: Story = {
  args: {
    type: 'square',
    label: '보내기',
  },
};

export const RoundButton: Story = {
  args: {
    type: 'round',
    label: '검색초기화',
  },
};

export const Percent100Button: Story = {
  args: {
    type: 'round',
    label: '가로를 꽉 채웠어요',
  },
};

export const BigLabelButton: Story = {
  args: {
    size: 'big',
    label: '큰 라벨 적용했어요',
  },
};

export const SmallLabelButton: Story = {
  args: {
    size: 'small',
    label: '작은 라벨 적용했어요',
  },
};
