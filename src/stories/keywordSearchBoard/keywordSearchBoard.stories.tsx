import type { Meta, StoryObj } from '@storybook/react';
import KeywordSearchBorad from 'src/pages/home/components/keywordSearchBoard';
import { testData, testData2 } from './testData';

const meta: Meta<typeof KeywordSearchBorad> = {
  component: KeywordSearchBorad,
  title: 'KeywordSearchBorad/KeywordSearchBorad',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KeywordSearchBorad>;

export const Example: Story = {
  args: {
    keywords: [
      {
        value: '전체',
        label: '전체',
        genres: testData2,
        platforms: testData2,
        keywords: testData,
      },
      {
        value: '서적',
        label: '서적',
        genres: testData,
        platforms: testData,
        keywords: testData,
      },
      {
        value: '만화',
        label: '만화',
        genres: testData,
        platforms: testData,
        keywords: testData,
      },
      {
        value: '게임',
        label: '게임',
        genres: testData,
        platforms: testData,
        keywords: testData,
      },
      {
        value: '영상',
        label: '영상',
        genres: testData,
        platforms: testData,
        keywords: testData,
      },
    ],
    selectKeywords: testData,
    addSelectKeyword: () => {},
    removeSelectKeyword: () => {},
  },
};
