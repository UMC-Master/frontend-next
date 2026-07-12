import type { Meta, StoryObj } from '@storybook/nextjs';
import ChallengeStateModal from './ChallengeStateModal';

const meta = {
  title: 'Challenges/ChallengeStateModal',
  component: ChallengeStateModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className="relative h-[720px] bg-gray-900/40">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChallengeStateModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Started: Story = {
  args: {
    title: '챌린지가 시작되었습니다.',
    primaryLabel: '확인',
    primaryHref: '/',
  },
};

export const QuitConfirm: Story = {
  args: {
    title: '그만두시겠습니까?',
    primaryLabel: '그만두기',
    primaryHref: '/',
    secondaryLabel: '닫기',
    secondaryHref: '/',
  },
};

export const VerifyFail: Story = {
  args: {
    title: (
      <>
        <span className="block">인증에 실패하였습니다.</span>
        <span className="block">재도전 해보세요.</span>
      </>
    ),
    primaryLabel: '재도전',
    primaryHref: '/',
  },
};
