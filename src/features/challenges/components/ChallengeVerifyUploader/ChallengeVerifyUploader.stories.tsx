import type { Meta, StoryObj } from '@storybook/nextjs';
import ChallengeVerifyUploader from './ChallengeVerifyUploader';
import card1 from '@/assets/images/mocks/card1.png';

const meta = {
  title: 'Challenges/ChallengeVerifyUploader',
  component: ChallengeVerifyUploader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ChallengeVerifyUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithPreview: Story = {
  args: {
    initialPreviewUrl: card1.src,
  },
};
