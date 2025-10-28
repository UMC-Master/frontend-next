'use client';

import { CardBadgeType } from '@/common/components/Card/CardBadge';
import CardListHorizontal from '@/features/main/components/cards/CardListHorizontal';
import { useRouter } from 'next/navigation';
import TempImg from '@/assets/images/mocks/tempImg.png';
import Image from 'next/image';
import { mockCards } from '@/features/main/data/mockCards';

export default function MainPage() {
  const router = useRouter();

  const handleTodayTipsBtn = () => {
    router.push('/today-tips');
  };

  const handleMonthlyTipsBtn = () => {
    router.push('/monthly-tips');
  };

  return (
    <main className="">
      <h1 className="mb-6 text-title2 text-gray-1000 whitespace-pre-line">
        {`안녕하세요!${'\n'}오늘도 홈마스터에서 꿀팁을 얻어가세요:)`}
      </h1>
      {/* TODO: 디자인 수정 예정이므로 임시로 이미지 첨부  */}
      <Image
        src={TempImg}
        alt="main banner"
        width={378}
        height={372}
        className="mt-6 mb-4.5"
      />
      <div className="flex flex-col">
        <CardListHorizontal
          items={mockCards.slice(0, 2)}
          title="오늘의 꿀팁"
          onClick={handleTodayTipsBtn}
          showBadge={false}
        />
        <div className="h-4" />
        <CardListHorizontal
          items={mockCards.slice(0, 2)}
          title="이달의 TOP10"
          onClick={handleMonthlyTipsBtn}
          showBadge={false}
        />
      </div>
    </main>
  );
}
