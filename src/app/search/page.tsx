'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import HashtagList from '@/features/search/components/HashtagList';
import FilterBar from '@/common/components/FilterBar/FilterBar';
import CardList from '@/common/components/CardList/CardList';
import { useSearchList } from '@/api/search/useSearchList';
import { getPopularHashtags } from '@/api/search/search.api';
import { toTipCard } from '@/api/tip/tip.mapper';
import type { TipSort } from '@/api/tip/tip.api';

export default function SearchPage() {
  const params = useSearchParams();
  const query = (params.get('query') || '').trim();
  const tags = (params.get('hashtags') || '')
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean);
  return (
    <SearchContent
      key={JSON.stringify([query, tags])}
      query={query}
      tags={tags}
    />
  );
}

function SearchContent({ query, tags }: { query: string; tags: string[] }) {
  const router = useRouter();
  const [sort, setSort] = useState<TipSort>('latest');
  const [page, setPage] = useState(1);
  const limit = 10;
  const results = useSearchList({ query, tags, page, limit, sort });
  const searching = Boolean(query || tags.length);
  const popular = useQuery({
    queryKey: ['hashtags', 'popular'],
    queryFn: getPopularHashtags,
    enabled: !searching,
  });

  if (!searching)
    return (
      <div className="flex flex-col gap-4">
        {popular.isPending && <p role="status">인기 관심사를 불러오는 중...</p>}
        {popular.isError && (
          <div role="alert">
            {popular.error.message}{' '}
            <button type="button" onClick={() => popular.refetch()}>
              다시 시도
            </button>
          </div>
        )}
        {popular.isSuccess &&
          (popular.data.length ? (
            <HashtagList
              title="인기 관심사"
              tags={popular.data.map(tag => tag.name)}
              onClick={tag =>
                router.push(`/search?hashtags=${encodeURIComponent(tag)}`)
              }
            />
          ) : (
            <p>인기 관심사가 없습니다.</p>
          ))}
      </div>
    );

  const cards =
    results.data?.result.map(tip => {
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
      {!!tags.length && (
        <p className="text-body2">{tags.map(tag => `#${tag}`).join(' ')}</p>
      )}
      <FilterBar
        defaultValue="latest"
        options={[
          { label: '최신순', value: 'latest' },
          { label: '좋아요순', value: 'likes' },
          { label: '저장많은순', value: 'saves' },
        ]}
        onChange={value => {
          setSort(value as TipSort);
          setPage(1);
        }}
      />
      {results.isPending && <p role="status">검색 중...</p>}
      {results.isError && (
        <div role="alert">
          {results.error.message}{' '}
          <button type="button" onClick={() => results.refetch()}>
            다시 시도
          </button>
        </div>
      )}
      {results.isSuccess &&
        (!cards.length ? (
          <p className="py-12 text-center text-title3">
            검색 결과가 존재하지 않습니다. 다른 검색어로 검색해 보세요!
          </p>
        ) : (
          <CardList items={cards} showBadge={sort !== 'latest'} />
        ))}
      <nav aria-label="검색 결과 페이지" className="flex justify-center gap-6">
        <button
          type="button"
          disabled={page === 1 || results.isFetching}
          onClick={() => setPage(current => current - 1)}
        >
          이전
        </button>
        <span aria-live="polite">{page} 페이지</span>
        <button
          type="button"
          disabled={
            cards.length < limit || results.isFetching || results.isError
          }
          onClick={() => setPage(current => current + 1)}
        >
          다음
        </button>
      </nav>
    </div>
  );
}
