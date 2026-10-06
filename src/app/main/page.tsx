'use client';

import CardListHorizontal from '@/features/main/components/cards/CardListHorizontal';
import { useRouter } from 'next/navigation';
import CardStack, {
  CardStackItem,
} from '@/common/components/CardStack/CardStack';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTips, type TipSort } from '@/api/tip/tip.api';
import { getTipImage, toTipCard } from '@/api/tip/tip.mapper';

const useMainTips = (sort: TipSort, limit: number) =>
  useQuery({
    queryKey: ['tips', 'main', sort, limit],
    queryFn: () => getTips({ pageParam: 1, sorted: sort, limit }),
  });

export default function MainPage() {
  const router = useRouter();
  const latest = useMainTips('latest', 2);
  const liked = useMainTips('likes', 10);
  const saved = useMainTips('saves', 3);
  const stackCards =
    saved.data?.tips.map(tip => ({
      id: String(tip.tipId),
      imageUrl: getTipImage(tip),
      alt: tip.title,
    })) || [];

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
      {saved.isPending ? (
        <p role="status">추천 팁을 불러오는 중...</p>
      ) : saved.isError ? (
        <p role="alert">
          {saved.error.message}{' '}
          <button onClick={() => saved.refetch()}>다시 시도</button>
        </p>
      ) : stackCards.length ? (
        <CardStack cards={stackCards} onCardClick={handleCardClick} />
      ) : (
        <p>추천 팁이 없습니다.</p>
      )}
      <p className="my-3 text-caption1 text-gray-600">
        기간별 집계는 미지원입니다. 오늘의 꿀팁은 최신 목록, TOP10은 최근 10개
        내 좋아요순으로 표시됩니다.
      </p>
      <div className="flex flex-col">
        {latest.isPending && <p role="status">최신 팁을 불러오는 중...</p>}
        {latest.isError && (
          <p role="alert">
            {latest.error.message}{' '}
            <button onClick={() => latest.refetch()}>다시 시도</button>
          </p>
        )}
        {latest.isSuccess && !latest.data.tips.length && (
          <p>등록된 팁이 없습니다.</p>
        )}
        <CardListHorizontal
          items={latest.data?.tips.map(toTipCard) || []}
          title="오늘의 꿀팁"
          onClick={handleTodayTipsBtn}
          showBadge={false}
        />
        <div className="h-4" />
        {liked.isPending && <p role="status">인기 팁을 불러오는 중...</p>}
        {liked.isError && (
          <p role="alert">
            {liked.error.message}{' '}
            <button onClick={() => liked.refetch()}>다시 시도</button>
          </p>
        )}
        {liked.isSuccess && !liked.data.tips.length && (
          <p>등록된 팁이 없습니다.</p>
        )}
        <CardListHorizontal
          items={liked.data?.tips.slice(0, 2).map(toTipCard) || []}
          title="이달의 TOP10"
          onClick={handleMonthlyTipsBtn}
          showBadge={false}
        />
      </div>
    </main>
  );
}
