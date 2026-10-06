'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import FilterBar from '@/common/components/FilterBar/FilterBar';
import CardList from '@/common/components/CardList/CardList';
import { getTips, type TipSort } from '@/api/tip/tip.api';
import { toTipCard } from '@/api/tip/tip.mapper';

const options = [
  { label: '최신순', value: 'latest' },
  { label: '좋아요순', value: 'likes' },
  { label: '저장많은순', value: 'saves' },
];

interface TipListingProps {
  scope: string;
  defaultSort?: TipSort;
  limit?: number;
  paginate?: boolean;
  notice: string;
}

export default function TipListing({
  scope,
  defaultSort = 'latest',
  limit = 10,
  paginate = true,
  notice,
}: TipListingProps) {
  const [sort, setSort] = useState<TipSort>(defaultSort);
  const [page, setPage] = useState(1);
  const query = useQuery({
    queryKey: ['tips', scope, page, sort, limit],
    queryFn: () => getTips({ pageParam: page, sorted: sort, limit }),
  });
  const cards =
    query.data?.tips.map(tip => {
      const card = toTipCard(tip);
      return {
        ...card,
        badges: card.badges?.filter(badge =>
          sort === 'likes'
            ? badge.type === 'like'
            : sort === 'saves'
              ? badge.type === 'save'
              : false,
        ),
      };
    }) || [];

  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        defaultValue={defaultSort}
        options={options}
        onChange={value => {
          setSort(value as TipSort);
          setPage(1);
        }}
      />
      <p className="text-caption1 text-gray-600">{notice}</p>
      {query.isPending && <p role="status">팁을 불러오는 중...</p>}
      {query.isError && (
        <div role="alert">
          <p>{query.error.message}</p>
          <button type="button" onClick={() => query.refetch()}>
            다시 시도
          </button>
        </div>
      )}
      {query.isSuccess && !cards.length && <p>표시할 팁이 없습니다.</p>}
      {query.isSuccess && (
        <CardList items={cards} showBadge={sort !== 'latest'} />
      )}
      {paginate && (
        <nav
          aria-label="팁 목록 페이지"
          className="flex items-center justify-center gap-6"
        >
          <button
            type="button"
            disabled={page === 1 || query.isFetching}
            onClick={() => setPage(current => Math.max(1, current - 1))}
          >
            이전
          </button>
          <span aria-live="polite">{page} 페이지</span>
          <button
            type="button"
            disabled={!query.data?.hasMore || query.isFetching || query.isError}
            onClick={() => setPage(current => current + 1)}
          >
            다음
          </button>
        </nav>
      )}
    </div>
  );
}
