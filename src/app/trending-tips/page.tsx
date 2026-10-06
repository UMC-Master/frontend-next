'use client';

import TipListing from '@/features/main/components/cards/TipListing';

export default function TrendingTipsPage() {
  return (
    <TipListing
      scope="trending"
      defaultSort="likes"
      notice="현재 좋아요·저장순은 조회 페이지 내 정렬입니다. 전체 팁의 인기순 집계는 백엔드 개선이 필요합니다."
    />
  );
}
