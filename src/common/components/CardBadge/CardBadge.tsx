'use client';

import HeartIcon from '@/assets/svgs/heart.svg';
import BookmarkIcon from '@/assets/svgs/bookmark.svg';
import ShareIcon from '@/assets/svgs/share.svg';

export type CardBadgeType = 'like' | 'save' | 'share';

export interface CardBadgeProps {
  type: CardBadgeType;
  count?: number | string;
  className?: string;
  onClick?: () => void;
}

const ICON_BY_TYPE = {
  like: HeartIcon,
  save: BookmarkIcon,
  share: ShareIcon,
} as const;

const ICON_COLOR_BY_TYPE: Record<CardBadgeType, string> = {
  like: 'text-red',
  save: 'text-blue',
  share: 'text-gray-800',
};

export default function CardBadge({
  type,
  count,
  className,
  onClick,
}: CardBadgeProps) {
  const Icon = ICON_BY_TYPE[type];
  const iconColorClass = ICON_COLOR_BY_TYPE[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex items-center gap-1 rounded-sm bg-[rgba(254,254,254,0.6)] px-1.5 py-0.5 text-caption1 text-gray-1000 backdrop-blur-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={type}
    >
      <Icon className={['h-4 w-4 shrink-0', iconColorClass].join(' ')} />
      {count !== undefined && <span>{count}</span>}
    </button>
  );
}