import type { Meta, StoryObj } from '@storybook/nextjs';
import ConfirmModal from './ConfirmModal';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Components/ConfirmModal/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  args: {
    title: '정말 삭제하시겠습니까?',
    description: '이 작업은 되돌릴 수 없습니다.',
    confirmText: '삭제',
    cancelText: '취소',
    onConfirm: () => alert('확인 클릭'),
    onCancel: () => alert('취소 클릭'),
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {};
