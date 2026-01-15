import type { Meta, StoryObj } from '@storybook/nextjs';
import TagList from './TagList';

const meta: Meta<typeof TagList> = {
  title: 'TIPS/TipDetail/TagList',
  component: TagList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TagList>;

export const Default: Story = {
  args: {
    tags: ['청소', '방', '정리', '인테리어', '가구'],
  },
};
