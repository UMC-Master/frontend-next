'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import clsx from 'clsx';

import AfterCheckBox from '@/assets/svgs/AfterCheckBox.svg';
import ArrowDownIcon from '@/assets/svgs/arrow_downward.svg';
import AuthPageHeader from '@/features/auth/components/AuthPageHeader/AuthPageHeader';
import LargeButton from '@/components/Button/LargeButton/LargeButton';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';
import SuccessModal from '@/common/components/Modal/SuccessModal';

interface ReportReason {
  id: string;
  label: string;
  descriptions: string[];
}

const REPORT_REASONS: ReportReason[] = [
  {
    id: 'hate',
    label: '혐오/차별적/생명경시/욕설 표현입니다.',
    descriptions: [
      '직·간접적인 욕설을 사용하여 타인에게 모욕감을 주는 내용',
      '생명을 경시여기거나 비하하는 내용',
      '계층/지역/종교/성별 등을 혐오하거나 비하하는 표현',
      '신체/외모/취향 등을 경멸하는 표현',
    ],
  },
  {
    id: 'spam',
    label: '스팸홍보/도배입니다.',
    descriptions: [
      '사행성 오락이나 도박을 홍보하거나 권장하는 내용 등의 부적절한 스팸 홍보 행위',
    ],
  },
  {
    id: 'illegal',
    label: '불법정보를 포함하고 있습니다.',
    descriptions: [
      '불법 행위, 불법 링크에 대한 정보 제공',
      '불법 상품을 판매하거나 유도하는 내용',
    ],
  },
  {
    id: 'adult',
    label: '음란물입니다.',
    descriptions: [
      '성적 수치심을 일으키는 내용',
      '아동이나 청소년을 성 대상화한 표현',
      '과도하거나 의도적인 신체 노출',
      '음란한 행위와 관련된 부적절한 내용',
    ],
  },
  {
    id: 'unpleasant',
    label: '불쾌한 표현이 있습니다.',
    descriptions: ['불쾌한 표현 포함'],
  },
];

export default function ReportPage() {
  const router = useRouter();
  const [selectedReasonId, setSelectedReasonId] = useState<string | null>(null);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const selectedReason = REPORT_REASONS.find(
    reason => reason.id === selectedReasonId,
  );

  const handleBack = () => {
    setIsExitModalOpen(true);
  };

  const handleSubmit = () => {
    if (!selectedReason) return;
    setIsSuccessModalOpen(true);
  };

  return (
    <main className="flex min-h-[calc(100svh-6rem)] w-full flex-col items-center bg-white">
      <AuthPageHeader title="신고하기" onBack={handleBack} />

      <section className="mt-6 flex w-full max-w-[380px] flex-1 flex-col">
        <h2 className="text-title2 text-gray-900">사유 선택</h2>

        <div className="mt-6 flex flex-col gap-4">
          {REPORT_REASONS.map(reason => {
            const isSelected = selectedReasonId === reason.id;

            return (
              <div key={reason.id} className="flex flex-col">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedReasonId(prev =>
                      prev === reason.id ? null : reason.id,
                    )
                  }
                  className="flex min-h-6 w-full items-center justify-between gap-3 text-left outline-none"
                  aria-expanded={isSelected}
                >
                  <span className="flex min-w-0 flex-1 items-center gap-2">
                    <span
                      className="flex size-6 shrink-0 items-center justify-center"
                      aria-hidden
                    >
                      {isSelected ? (
                        <AfterCheckBox className="size-6" />
                      ) : (
                        <span className="size-6 rounded border border-gray-400 bg-white" />
                      )}
                    </span>
                    <span className="min-w-0 break-words text-title4 text-gray-1000">
                      {reason.label}
                    </span>
                  </span>

                  <ArrowDownIcon
                    className={clsx(
                      'size-7 shrink-0 overflow-visible transition-transform',
                      isSelected && 'rotate-180',
                    )}
                    aria-hidden
                  />
                </button>

                {isSelected && (
                  <div className="px-6 pb-4 pt-2">
                    <ul className="list-disc pl-5 text-body2 text-gray-800">
                      {reason.descriptions.map(description => (
                        <li key={description}>{description}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="w-full max-w-[380px] pb-6 pt-8">
        <LargeButton
          text="신고하기"
          disabled={!selectedReason}
          onClick={handleSubmit}
          className="text-title3"
        />
      </div>

      <ConfirmModal
        isOpen={isExitModalOpen}
        title="신고하기를 그만두시겠어요?"
        cancelText="취소하기"
        confirmText="그만두기"
        onClose={() => setIsExitModalOpen(false)}
        onConfirm={() => router.back()}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        title="신고하기가 완료되었습니다."
        buttonText="확인"
        onClose={() => setIsSuccessModalOpen(false)}
        redirectPath="/main"
      />
    </main>
  );
}
