import type { Meta, StoryObj } from '@storybook/nextjs';
import ContentSection from './ContentSection';
import { useTipWriteStore } from '../../stores/tipWriteStore';

const meta: Meta<typeof ContentSection> = {
  title: 'TIPS/TipCreate/ContentSection',
  component: ContentSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentSection>;

export const Default: Story = {
  render: () => {
    useTipWriteStore.setState({
      content: '',
      setContent: () => {},
    });
    return <ContentSection />;
  },
};
