import type { Meta, StoryObj } from '@storybook/react';
import Bubble from '@components/bubbles/bubble/index';

const meta: Meta<typeof Bubble> = {
  component: Bubble,
  title: 'Bubble/Bubble',
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'keyword-borad',
      values: [
        {
          name: 'keyword-borad',
          value: '#9023d5',
        },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Bubble>;

export const Example: Story = {
  args: {
    value: '테스트',
    label: '테스트',
    type: 'default',
    size: 'normal',
  },
};
