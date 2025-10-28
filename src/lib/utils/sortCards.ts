import type { CardListItem } from '@/common/components/Card/CardList';

export type SortFilterType = 'ALL' | 'LIKE' | 'SAVE' | 'SHARE';

const strategies: Record<
  SortFilterType,
  (a: CardListItem, b: CardListItem) => number
> = {
  LIKE: (a, b) =>
    Number(b.badges?.find(badge => badge.type === 'like')?.count ?? 0) -
    Number(a.badges?.find(badge => badge.type === 'like')?.count ?? 0),
  SAVE: (a, b) =>
    Number(b.badges?.find(badge => badge.type === 'save')?.count ?? 0) -
    Number(a.badges?.find(badge => badge.type === 'save')?.count ?? 0),
  SHARE: (a, b) =>
    Number(b.badges?.find(badge => badge.type === 'share')?.count ?? 0) -
    Number(a.badges?.find(badge => badge.type === 'share')?.count ?? 0),
  ALL: (a, b) => Number(a.id) - Number(b.id),
};

export function sortCards(items: CardListItem[], filter: SortFilterType) {
  return [...items].sort(strategies[filter]);
}
