import type { Meta, StoryObj } from '@storybook/nextjs';
import Test from './Test';

const meta = {
  title: 'Common/Components/Test',
  component: Test,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Test>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 Test 컴포넌트입니다. 버튼을 클릭할 수 있습니다.',
      },
    },
  },
};
