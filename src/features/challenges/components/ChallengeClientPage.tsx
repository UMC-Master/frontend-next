'use client';

import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useOngoingChallenge } from '@/api/challenge/useOngoingChallenge';
import { startChallenge, stopChallenge } from '@/api/challenge/challenge.api';
import { getProfile } from '@/api/auth/auth.api';
import { useAuthStore } from '@/features/auth/stores/authStore';
import {
  attemptKey,
  useChallengeAttemptStore,
} from '../stores/challengeAttemptStore';
import ChallengeListPage from './ChallengeListPage/ChallengeListPage';
import ChallengeHeroSingle from './ChallengeHeroSingle/ChallengeHeroSingle';
import ChallengePageHeader from './ChallengePageHeader/ChallengePageHeader';
import ChallengeSectionCard from './ChallengeSectionCard/ChallengeSectionCard';
import ChallengeTagList from './ChallengeTagList/ChallengeTagList';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';

function ChallengeDetail({ id }: { id: string }) {
  const query = useOngoingChallenge();
  const accessToken = useAuthStore(state => state.accessToken);
  const profile = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!accessToken,
  });
  const attempts = useChallengeAttemptStore(state => state.attempts);
  const setAttempt = useChallengeAttemptStore(state => state.setAttempt);
  const attempt =
    profile.data && accessToken
      ? attempts[attemptKey(profile.data.user_id, Number(id))]
      : undefined;
  const [confirmStop, setConfirmStop] = useState(false);
  const [outcome, setOutcome] = useState('');
  const locked = useRef(false);
  const start = useMutation({
    mutationFn: startChallenge,
    onSuccess: result => {
      setAttempt(result);
      setOutcome('챌린지가 시작되었습니다.');
    },
  });
  const stop = useMutation({
    mutationFn: stopChallenge,
    onSuccess: result => {
      setAttempt(result);
      setConfirmStop(false);
      setOutcome('챌린지가 중단되었습니다.');
    },
  });
  const act = async (kind: 'start' | 'stop') => {
    if (locked.current || !accessToken || !profile.data) return;
    locked.current = true;
    try {
      if (kind === 'start') await start.mutateAsync(Number(id));
      else if (attempt?.status === 'START')
        await stop.mutateAsync(attempt.attempt_id);
    } catch {
      /* Render the mutation error without changing participation state. */
    } finally {
      locked.current = false;
    }
  };
  if (query.isPending) return <p role="status">챌린지를 불러오는 중...</p>;
  if (query.isError)
    return (
      <div role="alert">
        {query.error.message}{' '}
        <button onClick={() => query.refetch()}>다시 시도</button>
      </div>
    );
  const challenge = query.data;
  if (!challenge || challenge.challengeId !== Number(id))
    return (
      <p role="alert">
        현재 진행 중인 챌린지가 아닙니다. ID별 상세 조회는 아직 지원되지
        않습니다.
      </p>
    );
  const pending = start.isPending || stop.isPending;
  const error = start.error || stop.error;
  return (
    <div className="pb-52">
      <ChallengePageHeader title="챌린지" backHref="/challenges" />
      <ChallengeHeroSingle
        image={challenge.imageUrl || '/images/tip-placeholder.svg'}
        title={challenge.title}
      />
      <div className="space-y-6">
        <ChallengeSectionCard title={challenge.title}>
          <p>
            {new Date(challenge.startDate).toLocaleDateString('ko-KR')} ~{' '}
            {new Date(challenge.endDate).toLocaleDateString('ko-KR')}
          </p>
        </ChallengeSectionCard>
        <ChallengeSectionCard
          title={challenge.descriptionTitle || '어떤 챌린지일까요?'}
        >
          <p className="whitespace-pre-wrap">{challenge.descriptionContent}</p>
        </ChallengeSectionCard>
        <ChallengeSectionCard title="인증방법">
          <p className="whitespace-pre-wrap">{challenge.verificationMethod}</p>
        </ChallengeSectionCard>
        <ChallengeTagList tags={challenge.hashtags} />
        <p className="text-body2">
          좋아요 {challenge.likesCount} · 저장 {challenge.bookmarksCount} · 공유{' '}
          {challenge.sharesCount}
        </p>
        <p className="text-caption1 text-gray-600">
          참여 상태는 이 브라우저에서 성공한 요청 기준입니다. 서버 참여 상태
          조회·다른 기기 상태 복원은 아직 지원되지 않습니다.
        </p>
        {profile.isPending && accessToken && (
          <p role="status">사용자 정보를 확인하는 중...</p>
        )}
        {profile.isError && <p role="alert">{profile.error.message}</p>}
        {error && (
          <p role="alert" className="text-red">
            {error.message}
          </p>
        )}
      </div>
      <div className="fixed bottom-24 left-1/2 flex w-full max-w-[428px] -translate-x-1/2 justify-center gap-4 bg-main-500 px-6 py-4">
        {!accessToken ? (
          <Link href="/auth/sign-in">로그인 후 참여하기</Link>
        ) : attempt?.status === 'START' ? (
          <>
            <Link
              href={`/challenges/${challenge.challengeId}/verify`}
              className="rounded-lg bg-white px-4 py-3"
            >
              인증하기
            </Link>
            <button
              type="button"
              disabled={pending}
              onClick={() => setConfirmStop(true)}
              className="rounded-lg bg-white px-4 py-3"
            >
              그만두기
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={pending || !profile.data}
            onClick={() => act('start')}
            className="rounded-lg bg-white px-4 py-3"
          >
            {start.isPending ? '시작 중...' : '챌린지 시작하기'}
          </button>
        )}
      </div>
      {confirmStop && (
        <ModalWrapper
          onClose={() => {
            if (!pending) setConfirmStop(false);
          }}
        >
          <ConfirmModal
            title="그만두시겠습니까?"
            description={stop.error?.message}
            confirmText={pending ? '중단 중...' : '그만두기'}
            disabled={pending}
            onConfirm={() => act('stop')}
            onCancel={() => setConfirmStop(false)}
          />
        </ModalWrapper>
      )}
      {outcome && (
        <ModalWrapper onClose={() => setOutcome('')}>
          <ConfirmModal
            title={outcome}
            confirmText="확인"
            onConfirm={() => setOutcome('')}
            onCancel={() => setOutcome('')}
          />
        </ModalWrapper>
      )}
    </div>
  );
}

export default function ChallengeClientPage() {
  const params = useParams<{ id?: string }>();
  return params.id ? (
    <ChallengeDetail key={params.id} id={params.id} />
  ) : (
    <ChallengeListPage />
  );
}
