'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTipWriteStore } from '../../stores/tipWriteStore';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';

export default function SubmitFooter() {
  const router = useRouter();
  const reset = useTipWriteStore(s => s.reset);
  const [open, setOpen] = useState(false);

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0">
        <div className="mx-auto max-w-[430px] bg-white px-5 py-4">
          <button
            onClick={() => setOpen(true)}
            className="w-full rounded-xl bg-main-500 py-4 text-white"
          >
            작성완료
          </button>
        </div>
      </footer>

      {open && (
        <ModalWrapper onClose={() => setOpen(false)}>
          <ConfirmModal
            title="꿀팁이 등록되었습니다."
            confirmText="확인"
            onConfirm={() => {
              reset();
              router.push('/tips');
            }}
            onCancel={() => {
              reset();
              router.push('/tips');
            }}
          />
        </ModalWrapper>
      )}
    </>
  );
}
