'use client';

import { useMemo, useState } from 'react';
import { sortCards, type SortFilterType } from '@/lib/utils/sortCards';
import { mockCards } from '@/features/main/data/mockCards';
import FilterBar from '@/common/components/FilterBar';
import CardList from '@/common/components/Card/CardList';

export default function TrendingTipsPage() {
  const [filter, setFilter] = useState<SortFilterType>('ALL');
  const results = mockCards;
  const sorted = useMemo(() => sortCards(results, filter), [results, filter]);

  const filteredWithBadges = useMemo(() => {
    if (filter === 'ALL') {
      return sorted.map(card => ({ ...card, badges: [] }));
    }
    const target = filter.toLowerCase();
    return sorted.map(card => ({
      ...card,
      badges: card.badges?.filter(b => b.type === target),
    }));
  }, [sorted, filter]);

  return (
    <div className="flex flex-col gap-4">
      <FilterBar
        defaultValue="all"
        onChange={v => setFilter(String(v).toUpperCase() as SortFilterType)}
      />
      <CardList items={filteredWithBadges} showBadge={filter !== 'ALL'} />
    </div>
  );
}
