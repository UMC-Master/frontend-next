'use client';

import { mockCards } from '@/features/main/data/mockCards';
import CardList from '@/common/components/CardList/CardList';
import EmptyChallenges from '@/features/mypage/components/EmptyChallenges';

export default function MyChallengesPage() {
  // TODO: Replace with actual user's challenges data
  const challenges = mockCards.slice(0, 3); // Mock data for now
  const hasChallenges = challenges.length > 0;

  if (!hasChallenges) {
    return <EmptyChallenges />;
  }

  return (
    <div className="flex flex-col gap-4">
      <CardList items={challenges} showBadge={false} />
    </div>
  );
}
