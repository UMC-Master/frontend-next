'use client';

import RankAccordion from '@/features/mypage/components/RankAccordion';
import ProfileSection from '@/features/mypage/components/ProfileSection';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getProfile } from '@/api/auth/auth.api';
import { useAuthStore } from '@/features/auth/stores/authStore';

export default function RankPage() {
  const accessToken = useAuthStore(state => state.accessToken);
  const profile = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!accessToken,
  });

  const rankLevels = [
    {
      id: 'beginner',
      title: '자취 새싹',
      description: '0 ~ 299pt이면 자취 새싹입니다.',
    },
    {
      id: 'challenger',
      title: '자취 도전자',
      description: '300 ~ 599pt이면 자취 도전자입니다.',
    },
    {
      id: 'expert',
      title: '자취 고수',
      description: '600 ~ 999pt이면 자취 고수입니다.',
    },
    {
      id: 'master',
      title: '자취 박사',
      description: '1000 ~ 1999pt이면 자취 박사입니다.',
    },
    {
      id: 'god',
      title: '자취 신',
      description: '2000pt 이상이면 자취 신입니다.',
    },
  ];

  if (!accessToken)
    return <Link href="/auth/sign-in">로그인 후 등급 정보 확인하기</Link>;
  if (profile.isPending)
    return <p role="status">사용자 정보를 불러오는 중...</p>;
  if (profile.isError)
    return (
      <div role="alert">
        <p>{profile.error.message}</p>
        <button type="button" onClick={() => profile.refetch()}>
          다시 시도
        </button>
      </div>
    );

  return (
    <div className="flex flex-col gap-6 pt-6 pb-8">
      <ProfileSection
        nickname={profile.data.nickname}
        imageUrl={profile.data.profile_image_url}
      />

      <div className="flex flex-col gap-3">
        <div className="bg-main-500 rounded-2xl px-4 py-3 shadow-[0px_0px_16px_0px_rgba(234,234,234,1)]">
          <p className="text-title3 text-gray-100">
            현재 등급·포인트 조회는 지원되지 않습니다.
          </p>
          <p className="text-body1 text-gray-200">
            서버 통계에는 총 포인트가 없어 등급을 계산할 수 없습니다.
          </p>
        </div>

        <h2 className="text-title3">등급 기준 안내</h2>
        <p className="text-caption1 text-gray-600">
          아래 기준은 기존 화면의 안내 기준이며, 서버의 실제 등급 정책과는
          확인이 필요합니다.
        </p>
        {rankLevels.map(level => (
          <RankAccordion
            key={level.id}
            title={level.title}
            description={level.description}
          />
        ))}
      </div>
    </div>
  );
}
