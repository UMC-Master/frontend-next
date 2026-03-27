import type { Meta, StoryObj } from '@storybook/nextjs';
import CategorySection from './CategorySection';
import { useTipWriteStore } from '../../stores/tipWriteStore';
import { useEffect } from 'react';

const meta = {
  title: 'TIPS/TipCreate/CategorySection',
  component: CategorySection,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof CategorySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
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
};

export const SingleTag: Story = {
  decorators: [
    Story => {
      useEffect(() => {
        useTipWriteStore.setState({
          categories: ['봄'],
        });
      }, []);
      return <Story />;
    },
  ],
};

export const MultipleTagsSameGroup: Story = {
  decorators: [
    Story => {
      useEffect(() => {
        useTipWriteStore.setState({
          categories: ['봄', '여름', '가을'],
        });
      }, []);
      return <Story />;
    },
  ],
};

export const MultipleGroups: Story = {
  decorators: [
    Story => {
      useEffect(() => {
        useTipWriteStore.setState({
          categories: ['봄', '청소', '냉장', '스티로폼'],
        });
      }, []);
      return <Story />;
    },
  ],
};

export const MaxSelected: Story = {
  decorators: [
    Story => {
      useEffect(() => {
        useTipWriteStore.setState({
          categories: ['봄', '여름', '가을', '청소', '냉장'],
        });
      }, []);
      return <Story />;
    },
  ],
};
