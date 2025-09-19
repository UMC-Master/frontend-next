import type { Meta, StoryObj } from '@storybook/nextjs';
import Test2 from './Test2';

const meta = {
  title: 'Common/Components/Test',
  component: Test2,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Test2>;

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
