import type { Meta, StoryObj } from '@storybook/nextjs';
import ChallengeExampleGrid from './ChallengeExampleGrid';
import card1 from '@/assets/images/mocks/card1.png';
import card2 from '@/assets/images/mocks/card2.png';

const meta = {
  title: 'Challenges/ChallengeExampleGrid',
  component: ChallengeExampleGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ChallengeExampleGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    examples: [
      {
        id: 'ok-1',
        label: 'O',
        title: '성공 처리',
        description: '내용물을 깨끗하게 헹군 뒤, 부착물을 제거한 후 배출',
        imageSrc: card1.src,
      },
      {
        id: 'ok-2',
        label: 'O',
        title: '성공 처리',
        description: '부착물을 제거한 후 박스를 펼친 뒤 촬영',
        imageSrc: card2.src,
      },
      {
        id: 'fail-1',
        label: 'X',
        title: '실패 처리',
        description: '부착물을 제거해 주세요.',
        imageSrc: card1.src,
      },
      {
        id: 'fail-2',
        label: 'X',
        title: '실패 처리',
        description: '여러 재질이 섞여있는 플라스틱은 일반쓰레기로 분리하세요.',
        imageSrc: card2.src,
      },
    ],
  },
};
