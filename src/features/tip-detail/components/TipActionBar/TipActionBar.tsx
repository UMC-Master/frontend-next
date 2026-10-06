'use client';

import HeartIcon from '@/assets/svgs/heart.svg';
import HeartColorIcon from '@/assets/svgs/heart_color.svg';
import BookmarkIcon from '@/assets/svgs/bookmark.svg';
import BookmarkColorIcon from '@/assets/svgs/bookmark_color.svg';
import ShareIcon from '@/assets/svgs/share.svg';

interface Props {
  stats: { like: number; bookmark: number; share?: number };
  onDelete: () => void;
  isLiked?: boolean;
  isBookmarked?: boolean;
  onLike?: () => void;
  onBookmark?: () => void;
  onShare?: () => void;
  pending?: boolean;
  canDelete?: boolean;
}

export default function TipActionBar({
  stats,
  onDelete,
  isLiked = false,
  isBookmarked = false,
  onLike,
  onBookmark,
  onShare,
  pending = false,
  canDelete = false,
}: Props) {
  return (
    <section className="mt-6 px-4 pb-6">
      <div className="flex justify-center gap-3">
        <button
          type="button"
          aria-label="좋아요"
          aria-pressed={isLiked}
          disabled={pending || !onLike}
          onClick={onLike}
          className="flex items-center gap-2 rounded-lg px-3 py-2"
        >
          {isLiked ? (
            <HeartColorIcon className="size-5" />
          ) : (
            <HeartIcon className="size-5" />
          )}{' '}
          {stats.like}
        </button>
        <button
          type="button"
          aria-label="북마크"
          aria-pressed={isBookmarked}
          disabled={pending || !onBookmark}
          onClick={onBookmark}
          className="flex items-center gap-2 rounded-lg px-3 py-2"
        >
          {isBookmarked ? (
            <BookmarkColorIcon className="size-5" />
          ) : (
            <BookmarkIcon className="size-5" />
          )}{' '}
          {stats.bookmark}
        </button>
        <button
          type="button"
          aria-label="팁 링크 공유"
          onClick={onShare}
          disabled={!onShare}
          className="flex items-center gap-2 rounded-lg px-3 py-2"
        >
          <ShareIcon className="size-5" />
          공유
        </button>
      </div>
      {canDelete && (
        <div className="mt-4 text-center">
          <button
            type="button"
            disabled={pending}
            onClick={onDelete}
            className="text-body2 hover:underline"
          >
            삭제하기
          </button>
        </div>
      )}
    </section>
  );
}
