'use client';

import TipListing from '@/features/main/components/cards/TipListing';

export default function TodayTipsPage() {
  return (
    <TipListing
      scope="today"
      notice="당일 필터는 미지원으로 전체 최신 목록을 표시합니다. 좋아요·저장순은 각 조회 페이지 내 정렬입니다."
    />
  );
}
