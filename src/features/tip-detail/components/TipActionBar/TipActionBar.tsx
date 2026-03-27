'use client';

import { useState } from 'react';

import HeartIcon from '@/assets/svgs/heart.svg';
import HeartColorIcon from '@/assets/svgs/heart_color.svg';
import BookmarkIcon from '@/assets/svgs/bookmark.svg';
import BookmarkColorIcon from '@/assets/svgs/bookmark_color.svg';
import ShareIcon from '@/assets/svgs/share.svg';

interface Props {
  stats: {
    like: number;
    bookmark: number;
    share: number;
  };
  onDelete: () => void;
}

interface ActionIconButtonProps {
  icon: React.ReactNode;
  value: number;
  className?: string;
  onClick?: () => void;
}

export default function TipActionBar({ stats, onDelete }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <section className="mt-6 px-4 pb-6">
      <div className="flex justify-center gap-3">
        <ActionIconButton
          icon={isLiked
            ? <HeartColorIcon className="w-5 h-5" />
            : <HeartIcon className="w-5 h-5 text-gray-800" />}
          value={isLiked ? stats.like + 1 : stats.like}
          onClick={() => setIsLiked((prev) => !prev)}
          className={isLiked ? 'text-red' : 'text-gray-800'}
        />
        <ActionIconButton
          icon={isBookmarked
            ? <BookmarkColorIcon className="w-4 h-5" />
            : <BookmarkIcon className="w-4 h-5 text-gray-800" />}
          value={isBookmarked ? stats.bookmark + 1 : stats.bookmark}
          onClick={() => setIsBookmarked((prev) => !prev)}
          className={isBookmarked ? 'text-blue' : 'text-gray-800'}
        />
        <ActionIconButton
          icon={<ShareIcon className="w-5 h-5 text-gray-800" />}
          value={stats.share}
          className="text-gray-500"
        />
      </div>

      <div className="mt-4 text-center text-body2 text-gray-800">
        <button className="hover:underline">수정하기</button>
        <span className="mx-2">|</span>
        <button onClick={onDelete} className="hover:underline">
          삭제하기
        </button>
      </div>
    </section>
  );
}

function ActionIconButton({ icon, value, className, onClick }: ActionIconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-1
        h-9 px-3 py-1.5 rounded-lg
        bg-[#FEFEFE]
        shadow-[0_0_16px_rgba(234,234,234,1)]
        text-body2 font-medium
        active:scale-[0.98]
        transition-colors
        ${className ?? ''}
      `}
    >
      {icon}
      <span>{value}</span>
    </button>
  );
}
