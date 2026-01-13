import ProfileSection from '@/features/mypage/components/ProfileSection';
import InfoCardList from '@/features/mypage/components/InfoCardList';
import BottomActions from '@/features/mypage/components/BottomActions';
import TitleHeader from '@/features/main/components/headers/TitleHeaderLayout';

export default function MyPage() {
  return (
    <>
      <TitleHeader
        title="마이페이지"
        showLeftIcon={false}
        sticky
      />
      <div className="flex flex-col gap-6 pb-8">
          <ProfileSection />
          <InfoCardList />
          <span className="h-5" />
          <BottomActions />
      </div>
    </>
  );
}
