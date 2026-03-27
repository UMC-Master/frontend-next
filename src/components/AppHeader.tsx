'use client';

import { useRouter } from 'next/navigation';
import LeftArrowIcon from '@/assets/svgs/LeftArrow.svg';

interface AppHeaderProps {
  showBack?: boolean;
  title?: string;
  onBackClick?: () => void;
}

export default function AppHeader({
  showBack = false,
  title,
  onBackClick,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 h-[56px] bg-white">
      <div className="grid h-full grid-cols-[40px_1fr_40px] items-center px-4">
        <div>
          {showBack && (
            <button
              onClick={onBackClick ?? router.back}
              className="flex h-8 w-8 items-center justify-center"
            >
              <LeftArrowIcon />
            </button>
          )}
        </div>

        <div className="text-center">
          {title && (
            <h1 className="text-title2 font-semibold text-gray-1000">
              {title}
            </h1>
          )}
        </div>

        <div />
      </div>
    </header>
  );
}
