import type { Meta, StoryObj } from '@storybook/nextjs';
import ChallengeBottomBar from './ChallengeBottomBar';

const meta = {
  title: 'Challenges/ChallengeBottomBar',
  component: ChallengeBottomBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className="relative h-[320px] bg-gray-100">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChallengeBottomBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    mode: 'preview',
    challengeId: 'recycle',
    periodLabel: '8. 18 ~ 8. 31',
    cadenceLabel: '주 2일, 2주 동안',
  },
};

export const Active: Story = {
  args: {
    mode: 'active',
    challengeId: 'recycle',
    periodLabel: '8. 18 ~ 8. 31',
    cadenceLabel: '주 2일, 2주 동안',
  },
};

export const ActiveWithQuit: Story = {
  args: {
    mode: 'active-quit-confirm',
    challengeId: 'recycle',
    periodLabel: '8. 18 ~ 8. 31',
    cadenceLabel: '주 2일, 2주 동안',
  },
};
