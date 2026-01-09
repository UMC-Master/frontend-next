import type { Meta, StoryObj } from '@storybook/nextjs';
import SmallButton from './SmallButton';

const meta = {
  title: 'Components/Button/SmallButton',
  component: SmallButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '버튼에 표시될 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 실행될 함수',
    },
  },
} satisfies Meta<typeof SmallButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  args: {
    text: '버튼',
    disabled: false,
    onClick: () => console.log('Default button clicked'),
  },
};

// 비활성화된 버튼
export const Disabled: Story = {
  args: {
    text: '비활성화',
    disabled: true,
    onClick: () => console.log('Disabled button clicked'),
  },
};

// 인증하기 버튼
export const Verify: Story = {
  args: {
    text: '인증하기',
    disabled: false,
    onClick: () => console.log('인증하기 clicked'),
  },
};

// 인증완료 버튼
export const Complete: Story = {
  args: {
    text: '인증완료',
    disabled: false,
    onClick: () => console.log('인증완료 clicked'),
  },
};
