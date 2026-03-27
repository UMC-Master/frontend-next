import type { Meta, StoryObj } from '@storybook/nextjs';
import ImageSection from './ImageSection';
import { useTipWriteStore } from '../../stores/tipWriteStore';

const meta: Meta<typeof ImageSection> = {
  title: 'TIPS/TipCreate/ImageSection',
  component: ImageSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImageSection>;

export const Empty: Story = {
  render: () => {
    useTipWriteStore.setState({
      images: [],
      addImage: () => {},
      removeImage: () => {},
    });
    return <ImageSection />;
  },
};

export const WithImages: Story = {
  render: () => {
    const dummyFile = new File([''], 'image.png');
    useTipWriteStore.setState({
      images: [dummyFile, dummyFile],
      addImage: () => {},
      removeImage: () => {},
    });
    return <ImageSection />;
  },
};
