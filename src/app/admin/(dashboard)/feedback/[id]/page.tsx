'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { AdminModal } from '@/features/admin/components';

export default function AdminFeedbackDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') === 'feedback' ? '피드백' : '문의';
  const [replying, setReplying] = useState(false);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);

  const handleBack = () => {
    if (replying && content) setLeaveOpen(true);
    else router.push('/admin/feedback');
  };

  return (
    <div className="flex flex-col gap-[60px]">
      <section className="flex flex-col gap-8">
        <button type="button" onClick={handleBack} className="flex items-center gap-4 self-start py-2 text-xl font-semibold text-gray-900">
          <Image src="/admin/arrow-forward.svg" alt="" width={16} height={16} className="rotate-180" />
          뒤로가기
        </button>

        {replying ? (
          <ReplyForm
            type={type}
            content={content}
            preview={preview}
            onContentChange={setContent}
            onPreview={() => setPreview((value) => !value)}
            onComplete={() => content && setCompleteOpen(true)}
          />
        ) : (
          <>
            <div className="flex flex-col gap-2.5">
              <h1 className="text-[32px] font-bold text-gray-1000">서비스 이용 관련 {type}입니다.</h1>
              <div className="flex items-center justify-between font-semibold">
                <p className="text-[22px] text-gray-800">사용자01</p>
                <time className="text-xl text-gray-600">2025/04/01 00:00:00</time>
              </div>
            </div>
            <hr className="border-gray-400" />
            <div className="grid grid-cols-4 gap-[51px]">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="h-[360px] rounded-[32px] bg-gray-200" aria-label={`첨부 이미지 ${index + 1}`} />
              ))}
            </div>
            <p className="text-lg font-semibold leading-[1.7] text-gray-900">
              서비스를 이용하면서 궁금한 점이 있어 문의드립니다. 상세 내용을 확인한 뒤 답변 부탁드립니다.
              이용 과정에서 확인한 내용과 개선 의견을 함께 전달드립니다.
            </p>
          </>
        )}
      </section>

      {!replying && (
        <button type="button" onClick={() => setReplying(true)} className="h-12 self-center rounded-lg bg-main-500 px-6 text-base text-gray-200">
          답변하기
        </button>
      )}

      <AdminModal
        open={leaveOpen}
        title="답변 작성을 종료할까요?"
        description="뒤로 가면 작성 중인 내용이 삭제됩니다."
        confirmLabel="뒤로가기"
        onConfirm={() => router.push('/admin/feedback')}
        onCancel={() => setLeaveOpen(false)}
      />
      <AdminModal
        open={completeOpen}
        title="작성이 완료되었습니다."
        confirmLabel="확인"
        onConfirm={() => router.push('/admin/feedback')}
      />
    </div>
  );
}

type ReplyFormProps = {
  type: string;
  content: string;
  preview: boolean;
  onContentChange: (value: string) => void;
  onPreview: () => void;
  onComplete: () => void;
};

function ReplyForm({ type, content, preview, onContentChange, onPreview, onComplete }: ReplyFormProps) {
  return (
    <div className="flex flex-col gap-[50px]">
      <div className="flex flex-col gap-2.5">
        <h1 className="text-[32px] font-bold text-gray-1000">{type} 답변</h1>
        <div className="flex justify-between font-semibold">
          <p className="text-[22px] text-gray-800">사용자01</p>
          <time className="text-xl text-gray-600">2025/04/01 00:00:00</time>
        </div>
      </div>

      {preview ? (
        <section className="min-h-[360px] rounded-2xl border border-gray-400 p-6">
          <h2 className="text-xl font-semibold">RE: 서비스 이용 관련 {type}입니다.</h2>
          <p className="mt-6 whitespace-pre-wrap text-base leading-[1.7] text-gray-900">{content || '내용을 입력해 주세요.'}</p>
        </section>
      ) : (
        <div className="flex flex-col gap-[30px]">
          <label className="flex flex-col gap-5 text-xl font-semibold text-gray-1000">
            제목
            <input readOnly value={`RE: 서비스 이용 관련 ${type}입니다.`} className="h-12 rounded-lg border border-gray-500 bg-gray-200 px-3 text-base font-normal text-gray-800" />
          </label>
          <label className="flex flex-col gap-5 text-xl font-semibold text-gray-1000">
            내용
            <textarea value={content} onChange={(event) => onContentChange(event.target.value)} placeholder="내용을 입력해 주세요." className="h-60 resize-none rounded-lg border border-gray-500 p-3 text-base font-normal outline-none focus:border-main-500" />
          </label>
          <div className="flex flex-col gap-5 text-xl font-semibold text-gray-1000">
            이미지 첨부
            <label className="flex size-28 cursor-pointer items-center justify-center rounded-[10px] border border-gray-500 bg-gray-200 text-[32px] font-normal text-gray-700">
              +
              <input type="file" accept="image/*" className="sr-only" />
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-4">
        <button type="button" onClick={onPreview} className="h-12 rounded-lg border border-main-500 px-6 text-base text-main-500">
          {preview ? '작성하기' : '미리보기'}
        </button>
        <button type="button" onClick={onComplete} disabled={!content} className="h-12 rounded-lg bg-main-500 px-6 text-base text-gray-100 disabled:bg-gray-400">
          작성 완료
        </button>
      </div>
    </div>
  );
}
