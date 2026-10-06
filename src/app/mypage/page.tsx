'use client';

import { useRouter } from 'next/navigation';
import ProfileSection from '@/features/mypage/components/ProfileSection';
import BottomActions from '@/features/mypage/components/BottomActions';
import TitleHeader from '@/features/main/components/headers/TitleHeaderLayout';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getProfile, getStatistics } from '@/api/auth/auth.api';
import { useAuthStore } from '@/features/auth/stores/authStore';

export default function MyPage() {
  const router = useRouter();
  const accessToken = useAuthStore(state => state.accessToken);
  const profile = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!accessToken,
  });
  const statistics = useQuery({
    queryKey: ['statistics'],
    queryFn: getStatistics,
    enabled: !!accessToken,
  });

  return (
    <>
      <TitleHeader
        title="마이페이지"
        onIconClick={() => router.back()}
        sticky
        className="h-[70px]"
        titleClassName="text-[24px] leading-[1.2]"
      />
      <div className="flex flex-col pb-8 pt-5">
        {!accessToken ? (
          <Link href="/auth/sign-in">로그인 후 마이페이지 이용하기</Link>
        ) : (
          <>
            {profile.isPending && <p role="status">프로필을 불러오는 중...</p>}
            {profile.isError && (
              <div role="alert">
                {profile.error.message}{' '}
                <button onClick={() => profile.refetch()}>다시 시도</button>
              </div>
            )}
            {profile.data && (
              <ProfileSection
                nickname={profile.data.nickname}
                imageUrl={profile.data.profile_image_url}
              />
            )}
            <section className="mt-6 flex flex-col gap-3">
              <h2 className="text-title3">사용자 통계</h2>
              <p className="text-caption1 text-gray-600">
                현재 서버 통계는 실제 집계가 아닌 임시 고정값입니다.
              </p>
              {statistics.isPending && (
                <p role="status">통계를 불러오는 중...</p>
              )}
              {statistics.isError && (
                <div role="alert">
                  {statistics.error.message}{' '}
                  <button onClick={() => statistics.refetch()}>
                    다시 시도
                  </button>
                </div>
              )}
              {statistics.data && (
                <dl className="grid grid-cols-2 gap-2">
                  <dt>퀴즈 점수</dt>
                  <dd>{statistics.data.quizScore}</dd>
                  <dt>공유한 팁</dt>
                  <dd>{statistics.data.tipsSharedCount}</dd>
                  <dt>받은 좋아요</dt>
                  <dd>{statistics.data.likesReceived}</dd>
                </dl>
              )}
            </section>
            <div className="mt-10">
              <BottomActions />
            </div>
          </>
        )}
      </div>
    </>
  );
}
