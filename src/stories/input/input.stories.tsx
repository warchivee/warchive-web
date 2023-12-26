import type { Meta, StoryObj } from '@storybook/react';
import Input from '@components/input/index';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Input/Input',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Example: Story = {
  args: {
    value: '내용',
    type: 'text',
    style: 'outline',
    size: 'normal',
    placeholder: '검색 내용을 입력하세요.',
  },
};
