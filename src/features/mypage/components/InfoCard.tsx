'use client';

import Image from 'next/image';
import Link from 'next/link';
import ArrowRight from '@/assets/svgs/ArrowRight.svg';

interface InfoCardProps {
  iconSrc: string;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

export default function InfoCard({
  iconSrc,
  title,
  description,
  href,
  onClick,
}: InfoCardProps) {
  const content = (
    <div className="w-full rounded-2xl bg-gray-100 px-4 py-3 shadow-[0_0_16px_0_#eaeaea]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-end gap-3">
          <div className="flex size-[60px] shrink-0 items-center justify-center rounded-[24px] bg-main-500 shadow-[0_0_8px_0_rgba(54,98,76,0.2)]">
            <Image src={iconSrc} alt="" width={40} height={40} aria-hidden />
          </div>

          <div className="flex min-w-0 flex-col">
            <h3 className="text-title3 whitespace-nowrap text-gray-1000">
              {title}
            </h3>
            <p className="text-body1 text-gray-900">{description}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-center">
          <ArrowRight className="size-5" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block rounded-2xl">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  }

  return content;
}
