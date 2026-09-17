'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AdminModal, AdminStatusBadge } from '@/features/admin/components';

const actionOptions = ['조치 없음', '콘텐츠 조치', '사용자 조치', '기록 조치'];

export default function AdminReportDetailPage() {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [action, setAction] = useState('기록 조치');
  const [completed, setCompleted] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);

  const completeAction = () => {
    setCompleteOpen(false);
    setCompleted(true);
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-8 pb-16">
      <button type="button" onClick={() => router.push('/admin/reports')} className="flex items-center gap-4 self-start py-2 text-xl font-semibold text-gray-900">
        <Image src="/admin/arrow-forward.svg" alt="" width={16} height={16} className="rotate-180" />
        뒤로가기
      </button>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-4">
          <h1 className="text-[32px] font-bold text-gray-1000">부적절한 게시물 신고 요청입니다.</h1>
          {completed && <AdminStatusBadge tone="primary">처리 완료</AdminStatusBadge>}
        </div>
        <div className="flex justify-between font-semibold">
          <p className="text-[22px] text-gray-800">신고자01</p>
          <time className="text-xl text-gray-600">2025/04/01 00:00:00</time>
        </div>
      </div>

      <hr className="border-gray-400" />
      <ReadOnlyField label="관련 게시물 링크" value="https://example.com/posts/1024" />
      <ReadOnlyField label="사유" value="서비스 운영 정책을 위반한 게시물입니다. 내용 확인 후 적절한 조치를 요청드립니다." multiline />

      {editing && !completed && (
        <section className="flex flex-col gap-7 border-t border-gray-400 pt-7">
          <h2 className="text-xl font-semibold text-gray-1000">신고 처리</h2>
          <label className="flex items-center gap-3 text-lg text-gray-900">
            <input type="checkbox" defaultChecked className="size-5 accent-main-500" />
            참고
          </label>
          <div className="rounded-lg border border-gray-400 p-5 text-base leading-7 text-gray-900">
            <p>• 조치 없음: 위반 아님, 신고 기각</p>
            <p>• 콘텐츠 조치: 숨김, 삭제, 노출 제한, 경고 라벨 부착</p>
            <p>• 사용자 조치: 경고, 일시 제한, 영구 정지</p>
            <p>• 기록 조치: 검토자, 처리 일시, 사유, 증거 링크 저장</p>
          </div>
          <fieldset className="flex gap-8">
            <legend className="sr-only">신고 처리 방식</legend>
            {actionOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-base text-gray-900">
                <input type="radio" name="action" checked={action === option} onChange={() => setAction(option)} className="size-5 accent-main-500" />
                {option}
              </label>
            ))}
          </fieldset>

          <h2 className="text-xl font-semibold text-gray-1000">콘텐츠 처리</h2>
          <div className="flex gap-8">
            {['경고', '일시 제한', '영구 정지'].map((option, index) => (
              <label key={option} className="flex items-center gap-2 text-base">
                <input type="checkbox" defaultChecked={index === 0} className="size-5 accent-main-500" />
                {option}
              </label>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-gray-1000">사용자 처리</h2>
          <TextField label="인증 방법" placeholder="내용 입력" />
          <div className="grid grid-cols-2 gap-4">
            <TextField label="담당자" placeholder="이름 입력" />
            <TextField label="처리 일시" placeholder="2026.00.00." />
          </div>
          <TextField label="증거 링크" placeholder="내용 입력" />
          <TextField label="사유" placeholder="내용 입력" />
        </section>
      )}

      {!completed && (
        <button type="button" onClick={() => editing ? setCompleteOpen(true) : setEditing(true)} className="h-12 self-center rounded-lg bg-main-500 px-6 text-base text-gray-200">
          {editing ? '처리 완료' : '처리하러 가기'}
        </button>
      )}

      <AdminModal
        open={completeOpen}
        title="신고 처리가 완료되었습니다."
        description={`선택한 조치: ${action}`}
        onConfirm={completeAction}
      />
    </div>
  );
}

function ReadOnlyField({ label, value, multiline = false }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold text-gray-1000">{label}</h2>
      <div className={`rounded-lg border border-gray-500 p-3 text-base text-gray-900 ${multiline ? 'h-60' : 'h-12'}`}>{value}</div>
    </div>
  );
}

function TextField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="flex flex-col gap-3 text-lg font-semibold text-gray-1000">
      {label}
      <input type="text" placeholder={placeholder} className="h-12 rounded-lg border border-gray-400 px-3 text-base font-normal outline-none focus:border-main-500" />
    </label>
  );
}
