'use client';

import Link from 'next/link';
import ArrowRight from '@/assets/svgs/ArrowRight.svg';

interface InfoCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

export default function InfoCard({
  icon,
  title,
  description,
  href,
  onClick,
}: InfoCardProps) {
  const content = (
    <div className="bg-gray-100 rounded-2xl shadow-[0px_0px_16px_0px_rgba(234,234,234,1)] px-4 py-3 w-full">
      <div className="flex items-center justify-between gap-3">
        {/* Left: Icon and Text */}
        <div className="flex items-end gap-3">
          {/* Icon Placeholder */}
          <div className="w-[60px] h-[60px] bg-gray-300 rounded-[24px] flex items-center justify-center shrink-0">
            {icon}
          </div>

          {/* Text Content */}
          <div className="flex flex-col">
            <h3 className="text-title3 text-gray-1000">{title}</h3>
            <p className="text-body1 text-gray-900">{description}</p>
          </div>
        </div>

        {/* Right: Arrow */}
        <div className="flex items-center justify-center shrink-0">
          <ArrowRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
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
