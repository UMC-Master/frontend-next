'use client';

import { useRouter } from 'next/navigation';
import { useTipWriteStore } from '../../stores/tipWriteStore';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import LargeButton from '@/components/Button/LargeButton/LargeButton';

export default function SubmitFooter({
  onSubmit,
  pending,
  createdTipId,
  errorMessage,
}: {
  onSubmit: () => void;
  pending: boolean;
  createdTipId?: number;
  errorMessage?: string;
}) {
  const router = useRouter();
  const reset = useTipWriteStore(s => s.reset);
  const finish = () => {
    reset();
    router.replace(`/tips/${createdTipId}`);
  };

  return (
    <>
      <footer>
        {errorMessage && (
          <p role="alert" className="mb-2 text-caption1 text-red">
            {errorMessage}
          </p>
        )}
        <LargeButton
          text={pending ? '등록 중...' : '작성완료'}
          onClick={onSubmit}
          disabled={pending || !!createdTipId}
          className="text-title3"
        />
      </footer>

      {createdTipId && (
        <ModalWrapper onClose={finish}>
          <ConfirmModal
            title="꿀팁이 등록되었습니다."
            confirmText="확인"
            onConfirm={finish}
            onCancel={finish}
          />
        </ModalWrapper>
      )}
    </>
  );
}
