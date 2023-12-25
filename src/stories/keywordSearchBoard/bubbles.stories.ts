import type { Meta, StoryObj } from '@storybook/react';
import Bubbles from 'src/pages/home/components/keywordSearchBoard/bubbles/index';
import { testData } from './testData';

const meta: Meta<typeof Bubbles> = {
  component: Bubbles,
  title: 'KeywordSearchBorad/Bubbles',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Bubbles>;

export const Example: Story = {
  args: {
    title: '장르',
    bubbles: testData,
  },
};
