'use client';

import { useMemo, useState } from 'react';
import FilterBar from '@/common/components/FilterBar/FilterBar';
import CardList from '@/common/components/CardList/CardList';
import EmptySavedTips from '@/features/mypage/components/EmptySavedTips';
import { useSavedTipList } from '@/api/tip/useSavedTipList';
import { toTipCard } from '@/api/tip/tip.mapper';
import type { TipSort } from '@/api/tip/tip.api';
import Link from 'next/link';

export default function SavedTipsPage() {
  const [filter, setFilter] = useState<TipSort>('latest');
  const query = useSavedTipList();
  const sorted = useMemo(
    () =>
      [...(query.data?.tips || [])]
        .sort((a, b) =>
          filter === 'likes'
            ? b.likesCount - a.likesCount
            : filter === 'saves'
              ? b.savesCount - a.savesCount
              : new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
        )
        .map(toTipCard),
    [query.data, filter],
  );

  const filteredWithBadges = useMemo(() => {
    if (filter === 'latest') {
      return sorted.map(card => ({ ...card, badges: [] }));
    }
    const target = filter === 'likes' ? 'like' : 'save';
    return sorted.map(card => ({
      ...card,
      badges: card.badges?.filter(b => b.type === target),
    }));
  }, [sorted, filter]);

  if (query.isPending) return <p role="status">저장한 팁을 불러오는 중...</p>;
  if (query.isError)
    return (
      <div role="alert">
        {query.error.message}{' '}
        <button type="button" onClick={() => query.refetch()}>
          다시 시도
        </button>{' '}
        <Link href="/auth/sign-in">로그인</Link>
      </div>
    );
  if (!query.data.tips.length) {
    return <EmptySavedTips />;
  }

  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        defaultValue="latest"
        options={[
          { label: '최신순', value: 'latest' },
          { label: '좋아요순', value: 'likes' },
          { label: '저장많은순', value: 'saves' },
        ]}
        onChange={v => setFilter(v as TipSort)}
      />
      <CardList items={filteredWithBadges} showBadge={filter !== 'latest'} />
    </div>
  );
}
