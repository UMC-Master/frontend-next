'use client';

import HeartIcon from '@/assets/svgs/heart.svg';
import BookmarkIcon from '@/assets/svgs/bookmark.svg';
import ShareIcon from '@/assets/svgs/share.svg';

import Image from 'next/image';

export type CardBadgeType = 'like' | 'save' | 'share';

export interface CardBadgeProps {
  type: CardBadgeType;
  count?: number | string;
  className?: string;
  onClick?: () => void;
}

const iconByType = {
  like: HeartIcon,
  save: BookmarkIcon,
  share: ShareIcon,
};

export default function CardBadge({
  type,
  count,
  className = '',
  onClick,
}: CardBadgeProps) {
  const icon = iconByType[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center px-1.5 py-0.5 rounded-sm gap-1 text-caption1 text-gray-1000 bg-[rgba(254,254,254,0.6)] backdrop-blur-sm',
        className,
      ].join(' ')}
      aria-label={type}
    >
      <Image
        src={icon}
        alt={`${type} icon`}
        width={16}
        height={16}
        className="shrink-0"
      />
      {typeof count !== 'undefined' && <span>{count}</span>}
    </button>
  );
}
