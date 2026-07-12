import type { Meta, StoryObj } from '@storybook/nextjs';
import ChallengeHeroCarousel from './ChallengeHeroCarousel';
import card1 from '@/assets/images/mocks/card1.png';
import card2 from '@/assets/images/mocks/card2.png';
import card3 from '@/assets/images/mocks/card3.png';

const meta = {
  title: 'Challenges/ChallengeHeroCarousel',
  component: ChallengeHeroCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className="bg-white px-6 py-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChallengeHeroCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '이번 주 인증샷은 아이스크림이에요',
    images: [card1.src, card2.src, card3.src],
  },
};

export const TwoSlides: Story = {
  args: {
    title: '이번 주 인증샷은 아이스크림이에요',
    images: [card1.src, card2.src],
  },
};
