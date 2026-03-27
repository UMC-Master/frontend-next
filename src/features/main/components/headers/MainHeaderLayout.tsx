'use client';

import SearchIcon from '@/assets/svgs/search.svg';
import { useRouter } from 'next/navigation';

interface MainHeaderLayoutProps {
  title?: string;
}

export default function MainHeaderLayout({ title }: MainHeaderLayoutProps) {
  const router = useRouter();

  const handleSearchBtn = () => {
    router.push('/search');
  };

  return (
    <div className="relative my-3 flex w-full flex-row items-center">
      {/* 가운데 타이틀 */}
      {title && <span className="text-title2 text-gray-1000">{title}</span>}
      {/* 검색 버튼 */}
      <button
        type="button"
        onClick={handleSearchBtn}
        className="absolute right-0"
        aria-label="검색"
      >
        <SearchIcon className="h-8 w-8" />
      </button>
    </div>
  );
}