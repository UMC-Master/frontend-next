'use client';

import InfoCard from './InfoCard';

export default function InfoCardList() {
  return (
    <div className="flex flex-col gap-3">
      <InfoCard
        title="현재 나의 등급은?"
        description="GOD입니다."
        href="/mypage/rank"
      />
      <InfoCard
        title="현재 내가 도전 중인 챌린지는?"
        description="3개 도전중이에요."
        href="/mypage/mychallenges"
      />
      <InfoCard
        title="이때까지 내가 쓴 글은?"
        description="16개를 작성했어요."
        href="/mypage/posts"
      />
      <InfoCard
        title="만든 사람들이 궁금하다면?"
        description="구경해 보세요."
        href="/mypage/about"
      />
    </div>
  );
}
