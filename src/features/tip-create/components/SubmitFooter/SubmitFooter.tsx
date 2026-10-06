'use client';

import { useRouter } from 'next/navigation';
import { useTipWriteStore } from '../../stores/tipWriteStore';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';

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
      <footer className="fixed bottom-0 left-0 right-0">
        <div className="mx-auto max-w-[430px] bg-white px-5 py-4">
          {errorMessage && (
            <p role="alert" className="mb-2 text-caption1 text-red">
              {errorMessage}
            </p>
          )}
          <button
            type="button"
            onClick={onSubmit}
            disabled={pending || !!createdTipId}
            className="w-full rounded-xl bg-main-500 py-4 text-white"
          >
            {pending ? '등록 중...' : '작성완료'}
          </button>
        </div>
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
