'use client';

import CardListHorizontal from '@/features/main/components/cards/CardListHorizontal';
import { useRouter } from 'next/navigation';
import MockImg1 from '@/assets/images/mocks/card1.png';
import MockImg2 from '@/assets/images/mocks/card2.png';
import MockImg3 from '@/assets/images/mocks/card3.png';
import { mockCards } from '@/features/main/data/mockCards';
import CardStack, {
  CardStackItem,
} from '@/common/components/CardStack/CardStack';
import { useCallback } from 'react';

const DUMMY_CARDS: CardStackItem[] = [
  { id: '1', imageUrl: MockImg1.src },
  { id: '2', imageUrl: MockImg2.src },
  { id: '3', imageUrl: MockImg3.src },
];

export default function MainPage() {
  const router = useRouter();

  const handleCardClick = useCallback(
    (card: CardStackItem) => {
      router.push(`/tips/${card.id}`);
    },
    [router],
  );

  const handleTodayTipsBtn = () => {
    router.push('/today-tips');
  };

  const handleMonthlyTipsBtn = () => {
    router.push('/monthly-tips');
  };

  return (
    <main className="">
      <h1 className="mb-12 text-title2 text-gray-1000 whitespace-pre-line">
        {`안녕하세요!${'\n'}오늘도 홈마스터에서 꿀팁을 얻어가세요:)`}
      </h1>
      <CardStack cards={DUMMY_CARDS} onCardClick={handleCardClick} />
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
