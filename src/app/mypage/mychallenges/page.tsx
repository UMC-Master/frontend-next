import type { CardListItem } from '@/common/components/CardList/CardList';
import CardList from '@/common/components/CardList/CardList';
import EmptyChallenges from '@/features/mypage/components/EmptyChallenges';

const challenges: CardListItem[] = Array.from({ length: 3 }, (_, index) => ({
  id: index + 1,
  imageSrc: '/mypage/challenge-card.png',
  imageAlt: '또띠아 샐러드 랩',
  title: '오늘은 맛있는 반찬을 만들어볼거에용!',
  href: `/challenges/${index + 1}`,
}));

export default function MyChallengesPage() {
  if (challenges.length === 0) {
    return <EmptyChallenges />;
  }

  return <CardList items={challenges} showBadge={false} />;
}
