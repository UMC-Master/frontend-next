'use client';

import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { getChallengeById, type VerifyMode } from '../data/mockChallenges';
import ChallengeNoticeList from './ChallengeNoticeList/ChallengeNoticeList';
import ChallengeStateModal from './ChallengeStateModal/ChallengeStateModal';
import ChallengeVerifyUploader from './ChallengeVerifyUploader/ChallengeVerifyUploader';

function VerifyHeader({ backHref }: { backHref: string }) {
  return (
    <header className="sticky top-0 z-20 bg-white">
      <div className="flex h-[54px] items-center justify-between">
        <Link href={backHref} className="w-10 text-[28px] leading-none text-gray-1000">
          ←
        </Link>
        <h1 className="text-title2 text-gray-1000">챌린지 인증하기</h1>
        <div className="w-10" />
      </div>
    </header>
  );
}

export default function ChallengeVerifyPage() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const challenge = getChallengeById(params.id);
  const mode = (searchParams.get('result') as VerifyMode | null) ?? 'default';

  return (
    <div className="pb-44">
      <VerifyHeader backHref={`/challenges/${challenge.id}?state=active`} />

      <div className="space-y-8 pt-4">
        <section className="rounded-2xl bg-white p-4 shadow-[0_0_16px_0_rgba(234,234,234,1)]">
          <h2 className="mb-2 text-title3 text-gray-1000">챌린지 진행 시 유의사항</h2>
          <ChallengeNoticeList notices={challenge.notices} />
        </section>

        <ChallengeVerifyUploader />
      </div>

      <div className="fixed bottom-24 left-1/2 z-20 w-full max-w-[428px] -translate-x-1/2 bg-white px-6 py-5">
        <Link
          href={`/challenges/${challenge.id}/verify?result=success`}
          className="flex h-[52px] items-center justify-center rounded-2xl bg-main-500 text-title3 text-gray-200"
        >
          인증 완료
        </Link>
      </div>

      {mode === 'success' && (
        <ChallengeStateModal
          title="인증이 완료되었습니다."
          primaryLabel="확인"
          primaryHref={`/challenges/${challenge.id}?state=active`}
        />
      )}
      {mode === 'fail' && (
        <ChallengeStateModal
          title={
            <>
              <span className="block">인증에 실패하였습니다.</span>
              <span className="block">재도전 해보세요.</span>
            </>
          }
          primaryLabel="재도전"
          primaryHref={`/challenges/${challenge.id}/verify`}
        />
      )}
    </div>
  );
}
