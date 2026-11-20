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
    <header className="mb-4 flex h-[54px] w-full items-center justify-between">
      {title && <span className="text-title2 text-gray-1000">{title}</span>}
      <button
        type="button"
        onClick={handleSearchBtn}
        className="ml-auto"
        aria-label="검색"
      >
        <SearchIcon className="h-8 w-8" />
      </button>
    </header>
  );
}
