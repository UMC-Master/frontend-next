import Link from 'next/link';
import type { ReactNode } from 'react';

interface ChallengePageHeaderProps {
  title: string;
  backHref?: string;
  rightSlot?: ReactNode;
}

export default function ChallengePageHeader({
  title,
  backHref,
  rightSlot,
}: ChallengePageHeaderProps) {
  return (
    <header className="sticky top-0 z-20 bg-white">
      <div className="flex h-[54px] items-center justify-between">
        <div className="flex w-10 items-center">
          {backHref ? (
            <Link href={backHref} className="text-[28px] leading-none text-gray-1000">
              ←
            </Link>
          ) : (
            <div />
          )}
        </div>
        <h1 className="text-title2 text-gray-1000">{title}</h1>
        <div className="flex w-10 items-center justify-end">{rightSlot}</div>
      </div>
    </header>
  );
}
