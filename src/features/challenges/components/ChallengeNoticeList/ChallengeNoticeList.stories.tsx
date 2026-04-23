import type { Meta, StoryObj } from '@storybook/nextjs';
import ChallengeNoticeList from './ChallengeNoticeList';

const meta = {
  title: 'Challenges/ChallengeNoticeList',
  component: ChallengeNoticeList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ChallengeNoticeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notices: [
      '00시 00분 ~ 23시 59분 사이에 인증하셔야 합니다.',
      '2주 동안 주 2일, 하루에 1번 인증샷을 촬영하셔야 합니다.',
      '기존에 저장된 사진은 사용하실 수 없습니다.',
      '인증샷은 외부에 노출되지 않습니다.',
    ],
  },
};
