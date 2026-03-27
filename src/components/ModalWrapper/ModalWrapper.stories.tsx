import type { Meta, StoryObj } from '@storybook/nextjs';
import ModalWrapper from './ModalWrapper';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const meta: Meta<typeof ModalWrapper> = {
  title: 'common/ModalWrapper/ModalWrapper',
  component: ModalWrapper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ModalWrapper>;

export const CenterModal: Story = {
  render: () => (
    <ModalWrapper onClose={() => {}}>
      <ConfirmModal
        title="삭제하시겠습니까?"
        confirmText="삭제하기"
        onConfirm={() => {}}
        onCancel={() => {}}
      />
    </ModalWrapper>
  ),
};
