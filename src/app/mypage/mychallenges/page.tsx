import type { CardListItem } from '@/common/components/CardList/CardList';
import CardList from '@/common/components/CardList/CardList';
import EmptyChallenges from '@/features/mypage/components/EmptyChallenges';

export default function MyChallengesPage() {
  const challenges: CardListItem[] = [];

  if (challenges.length === 0) {
    return <EmptyChallenges />;
  }

  return (
    <CardList
      items={challenges}
      showBadge={false}
      className="gap-x-4 gap-y-3"
    />
  );
}
