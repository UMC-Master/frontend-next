'use client';

import Image from 'next/image';
import SearchIcon from '@/assets/svgs/search.svg';
import { useRouter } from 'next/navigation';

interface MainHeaderLayoutProps {
  title?: string;
}

export default function MainHeaderLayout({ title }: MainHeaderLayoutProps) {
  const router = useRouter();

  const handleSearchBtn = () => {
    router.push('/main/search');
  };

  return (
    <div className="relative flex flex-row items-center w-full my-3">
      {/* 가운데 타이틀 */}
      {title && <span className="text-title2 text-gray-1000">{title}</span>}
      {/* 뒤로가기 버튼 */}
      <button onClick={handleSearchBtn} className="absolute right-0">
        <Image
          src={SearchIcon}
          alt={'search icon btn'}
          width={32}
          height={32}
        />
      </button>
    </div>
  );
}
