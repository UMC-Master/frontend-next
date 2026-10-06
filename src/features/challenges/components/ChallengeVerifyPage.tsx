'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProfile } from '@/api/auth/auth.api';
import { verifyChallenge } from '@/api/challenge/challenge.api';
import { useOngoingChallenge } from '@/api/challenge/useOngoingChallenge';
import { useAuthStore } from '@/features/auth/stores/authStore';
import {
  attemptKey,
  useChallengeAttemptStore,
} from '../stores/challengeAttemptStore';
import ChallengeVerifyUploader from './ChallengeVerifyUploader/ChallengeVerifyUploader';
import ChallengePageHeader from './ChallengePageHeader/ChallengePageHeader';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';

export default function ChallengeVerifyPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const accessToken = useAuthStore(state => state.accessToken);
  const profile = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!accessToken,
  });
  const query = useOngoingChallenge();
  const attempts = useChallengeAttemptStore(state => state.attempts);
  const attempt =
    profile.data && accessToken
      ? attempts[attemptKey(profile.data.user_id, Number(id))]
      : undefined;
  const [files, setFiles] = useState<File[]>([]);
  const locked = useRef(false);
  const [outcome, setOutcome] = useState<'success' | 'error' | null>(null);
  const verification = useMutation({
    mutationFn: ({
      attemptId,
      images,
    }: {
      attemptId: number;
      images: File[];
    }) => verifyChallenge(attemptId, images),
    onSuccess: () => setOutcome('success'),
    onError: () => setOutcome('error'),
  });
  const submit = async () => {
    if (
      locked.current ||
      !attempt ||
      attempt.status !== 'START' ||
      !files.length
    )
      return;
    locked.current = true;
    try {
      await verification.mutateAsync({
        attemptId: attempt.attempt_id,
        images: [...files],
      });
    } catch {
      /* The failure modal preserves uploaded files for retry. */
    } finally {
      locked.current = false;
    }
  };
  if (query.isPending || (accessToken && profile.isPending))
    return <p role="status">챌린지 참여 정보를 확인하는 중...</p>;
  if (query.isError || profile.isError)
    return (
      <div role="alert">
        {query.error?.message || profile.error?.message}
        <Link href={`/challenges/${id}`}>상세로 돌아가기</Link>
      </div>
    );
  if (!query.data || query.data.challengeId !== Number(id))
    return <p role="alert">현재 챌린지의 인증만 지원됩니다.</p>;
  if (!accessToken) return <Link href="/auth/sign-in">로그인 후 인증하기</Link>;
  if (!attempt || attempt.status !== 'START')
    return (
      <div>
        <p>
          이 브라우저에서 확인된 진행 중 참여 ID가 없습니다. 다른 기기의 참여
          상태 조회는 아직 지원되지 않습니다.
        </p>
        <Link href={`/challenges/${id}`}>챌린지 상세로 이동</Link>
      </div>
    );
  const finish = () => {
    setFiles([]);
    router.replace(`/challenges/${id}`);
  };
  return (
    <div className="pb-44">
      <ChallengePageHeader
        title="챌린지 인증하기"
        backHref={`/challenges/${id}`}
      />
      <p className="my-4 whitespace-pre-wrap">
        {query.data.verificationMethod}
      </p>
      <ChallengeVerifyUploader
        files={files}
        onChange={setFiles}
        disabled={verification.isPending || verification.isSuccess}
      />
      <div className="fixed bottom-24 left-1/2 w-full max-w-[428px] -translate-x-1/2 bg-white px-6 py-5">
        <button
          type="button"
          disabled={
            verification.isPending || verification.isSuccess || !files.length
          }
          onClick={submit}
          className="h-13 w-full rounded-2xl bg-main-500 text-gray-100 disabled:bg-gray-500"
        >
          {verification.isPending ? '제출 중...' : '인증 제출'}
        </button>
      </div>
      {outcome && (
        <ModalWrapper
          onClose={outcome === 'success' ? finish : () => setOutcome(null)}
        >
          <ConfirmModal
            title={
              outcome === 'success'
                ? '인증 요청이 접수되었습니다.'
                : '인증 제출에 실패했습니다.'
            }
            description={
              outcome === 'success'
                ? '검토 대기 상태입니다. 제출 성공은 인증 승인 완료가 아닙니다.'
                : verification.error?.message
            }
            confirmText={outcome === 'success' ? '확인' : '다시 시도'}
            onConfirm={
              outcome === 'success'
                ? finish
                : () => {
                    setOutcome(null);
                    submit();
                  }
            }
            onCancel={outcome === 'success' ? finish : () => setOutcome(null)}
          />
        </ModalWrapper>
      )}
    </div>
  );
}
