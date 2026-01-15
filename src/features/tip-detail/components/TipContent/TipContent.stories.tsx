import type { Meta, StoryObj } from '@storybook/nextjs';
import TipContent from './TipContent';

const meta: Meta<typeof TipContent> = {
  title: 'TIPS/TipDetail/TipContent',
  component: TipContent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TipContent>;

export const Default: Story = {
  args: {
    content: `이건 꿀팁 본문 예시입니다.
줄바꿈도 그대로 적용됩니다.

- 여러 줄 텍스트
- whitespace-pre-line 확인용`,
  },
};
