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

import { useState } from 'react';

export default function TipActionBar({ stats, onDelete }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(prev => !prev);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(prev => !prev);
  };

  return (
    <section className="mt-6 px-4 pb-6">
      <div className="flex justify-center gap-3">
        {/* ❤️ LIKE */}
        <ActionIconButton
          icon={
            isLiked ? (
              <HeartColorIcon className="h-4.5 w-5" />
            ) : (
              <HeartIcon className="h-4.5 w-5" />
            )
          }
          value={isLiked ? stats.like + 1 : stats.like}
          onClick={handleLikeClick}
          className={isLiked ? 'text-red-500' : 'text-gray-800'}
        />

        {/* 🔖 BOOKMARK */}
        <ActionIconButton
          icon={
            isBookmarked ? (
              <BookmarkColorIcon className="h-4.5 w-5" />
            ) : (
              <BookmarkIcon className="h-4.5 w-5" />
            )
          }
          value={isBookmarked ? stats.bookmark + 1 : stats.bookmark}
          onClick={handleBookmarkClick}
          className={isBookmarked ? 'text-blue-500' : 'text-gray-800'}
        />

        {/* 🔗 SHARE */}
        <ActionIconButton
          icon={<ShareIcon className="h-5 w-5" />}
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

interface ActionIconButtonProps {
  icon: React.ReactNode;
  value: number;
  className?: string;
  onClick?: () => void;
}

function ActionIconButton({
  icon,
  value,
  className,
  onClick,
}: ActionIconButtonProps) {
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
