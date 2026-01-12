import type { Meta, StoryObj } from '@storybook/nextjs';
import LargeButton from './LargeButton';

const meta = {
  title: 'Common/Button/LargeButton',
  component: LargeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LargeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '다음',
  },
};

export const Disabled: Story = {
  args: {
    text: '다음',
    disabled: true,
  },
};
