'use client';

import TipListing from '@/features/main/components/cards/TipListing';

export default function MonthlyTipsPage() {
  return (
    <TipListing
      scope="monthly"
      defaultSort="likes"
      limit={10}
      paginate={false}
      notice="월간 집계 API는 미지원입니다. 현재는 최근 10개 팁 내 좋아요·저장순으로 표시하며, 전체 게시물의 월간 TOP10 순위가 아닙니다."
    />
  );
}
