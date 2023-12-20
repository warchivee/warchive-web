import type { Meta, StoryObj } from '@storybook/react';
import { Title } from '@components/text/index';

const meta: Meta<typeof Title> = {
  component: Title,
  title: 'Text/Title',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Title>;

export const H1: Story = {
  args: {
    type: 'h1',
    value: '제목1',
  },
};

export const H2: Story = {
  args: {
    type: 'h2',
    value: '제목2',
  },
};

export const H3: Story = {
  args: {
    type: 'h3',
    value: '제목3',
  },
};

export const H4: Story = {
  args: {
    type: 'h4',
    value: '제목4',
  },
};
