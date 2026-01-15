import type { Meta, StoryObj } from '@storybook/nextjs';
import TitleSection from './TitleSection';
import { useTipWriteStore } from '../../stores/tipWriteStore';
import { useEffect } from 'react';

const meta = {
  title: 'TIPS/TipCreate/TitleSection',
  component: TitleSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    Story => {
      useEffect(() => {
        useTipWriteStore.setState({
          title: '',
          content: '',
          images: [],
          categories: [],
          isModalOpen: false,
        });
      }, []);

      return <Story />;
    },
  ],
} satisfies Meta<typeof TitleSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
