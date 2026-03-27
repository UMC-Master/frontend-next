import type { Meta, StoryObj } from '@storybook/nextjs';
import ImageGrid from './ImageGrid';

const meta: Meta<typeof ImageGrid> = {
  title: 'TIPS/TipDetail/ImageGrid',
  component: ImageGrid,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ImageGrid>;

export const Default: Story = {
  args: {
    images: [
      'https://picsum.photos/400',
      'https://picsum.photos/401',
      'https://picsum.photos/402',
      'https://picsum.photos/403',
    ],
  },
};
