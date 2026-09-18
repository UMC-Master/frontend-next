'use client';

import ProfileSection from '@/features/mypage/components/ProfileSection';
import InfoCardList from '@/features/mypage/components/InfoCardList';
import BottomActions from '@/features/mypage/components/BottomActions';
import TitleHeader from '@/features/main/components/headers/TitleHeaderLayout';
import BottomNav from '@/common/components/BottomNav/BottomNav';

export default function MyPage() {
  return (
    <>
      <TitleHeader
        title="마이페이지"
        showLeftIcon={false}
        sticky
        className="h-[54px]"
      />
      <main className="flex flex-col items-center gap-6 pb-8">
        <div className="flex w-full flex-col items-center gap-6">
          <ProfileSection />
          <div className="w-full">
            <InfoCardList />
          </div>
        </div>
        <div>
          <BottomActions />
        </div>
      </main>
      <BottomNav />
    </>
  );
}
