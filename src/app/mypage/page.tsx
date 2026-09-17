'use client';

import { useRouter } from 'next/navigation';
import ProfileSection from '@/features/mypage/components/ProfileSection';
import BottomActions from '@/features/mypage/components/BottomActions';
import TitleHeader from '@/features/main/components/headers/TitleHeaderLayout';

export default function MyPage() {
  const router = useRouter();

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
        <ProfileSection />
        <div className="mt-10">
          <BottomActions />
        </div>
      </div>
    </>
  );
}
