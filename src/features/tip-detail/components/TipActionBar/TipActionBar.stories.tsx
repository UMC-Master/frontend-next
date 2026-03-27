import type { Meta, StoryObj } from '@storybook/nextjs';
import TipActionBar from './TipActionBar';

const meta: Meta<typeof TipActionBar> = {
  title: 'TIPS/TipDetail/TipActionBar',
  component: TipActionBar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TipActionBar>;

export const Default: Story = {
  args: {
    stats: {
      like: 999,
      bookmark: 999,
      share: 999,
    },
    onDelete: () => alert('삭제 클릭'),
  },
};
