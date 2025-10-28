'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import HashtagList from '@/features/search/components/HashtagList';
import { sortCards, type SortFilterType } from '@/lib/utils/sortCards';
import { mockCards } from '@/features/main/data/mockCards';
import FilterBar from '@/common/components/FilterBar';
import CardList from '@/common/components/Card/CardList';

export default function SearchPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const query = (sp.get('query') ?? '').trim();

  // 대문자 필터 사용
  const [filter, setFilter] = useState<SortFilterType>('ALL');

  // 1) 쿼리로 결과 필터링
  const results = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return mockCards.filter(c => c.title.toLowerCase().includes(q));
  }, [query]);

  // 2) 정렬 적용 (내림차순 정렬은 sortCards 내부에서 수행)
  const sorted = useMemo(() => sortCards(results, filter), [results, filter]);

  // 3) 현재 필터에 따라 보여줄 배지 필터링
  const filteredWithBadges = useMemo(() => {
    if (filter === 'ALL') {
      // 전체보기에서는 배지 숨김
      return sorted.map(card => ({ ...card, badges: [] }));
    }
    const target = filter.toLowerCase(); // 'LIKE' -> 'like'
    return sorted.map(card => ({
      ...card,
      badges: card.badges?.filter(b => b.type === target),
    }));
  }, [sorted, filter]);

  // mock 해시태그
  const popularTags = ['청소', '방', '정리', '인테리어', '가구', '청소도구'];
  const recommendTags = [
    '주방정리',
    '미니멀',
    '러그',
    '수납',
    '벽선반',
    '조명',
  ];
  const goTag = (tag: string) =>
    router.push(`/search?query=${encodeURIComponent(tag)}`);

  // 쿼리 없으면 추천 섹션
  if (!query) {
    return (
      <div className="flex flex-col gap-8">
        <HashtagList title="인기 관심사" tags={popularTags} onClick={goTag} />
        <HashtagList title="추천 관심사" tags={recommendTags} onClick={goTag} />
      </div>
    );
  }

  const hasResults = sorted.length > 0;

  // 결과 0건이면 텍스트만
  if (!hasResults) {
    return (
      <div className="flex min-h-screen items-start justify-center pt-[40%] text-title3 text-gray-800 whitespace-pre-line">
        {`검색 결과가 존재하지 않습니다.\n다른 검색어로 검색해 보세요!`}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* FilterBar가 소문자를 보낸다면 대문자로 변환해서 상태에 반영 ex) all -> ALL*/}
      <FilterBar
        defaultValue="all"
        onChange={v => setFilter(String(v).toUpperCase() as SortFilterType)}
      />

      <CardList items={filteredWithBadges} showBadge={filter !== 'ALL'} />
    </div>
  );
}
