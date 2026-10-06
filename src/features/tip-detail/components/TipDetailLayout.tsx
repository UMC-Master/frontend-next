'use client';

import { useState } from 'react';
import Link from 'next/link';
import ImageGrid from './ImageGrid/ImageGrid';
import TipHeader from './TipHeader/TipHeader';
import TipContent from './TipContent/TipContent';
import TagList from './TagList/TagList';
import TipActionBar from './TipActionBar/TipActionBar';
import TipComments from './TipComments';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import { useTipDetail } from '../hooks/useTipDetail';

export default function TipDetailLayout({ tipId }: { tipId: string }) {
  const {
    validId,
    query,
    profile,
    like,
    bookmark,
    remove,
    canDelete,
    confirmDelete,
    isDeleteOpen,
    openDelete,
    closeDelete,
  } = useTipDetail(tipId);
  const [shareMessage, setShareMessage] = useState('');
  if (!validId) return <p role="alert">유효하지 않은 팁 ID입니다.</p>;
  if (query.isPending) return <p role="status">팁을 불러오는 중...</p>;
  if (query.isError)
    return (
      <div role="alert">
        <p>{query.error.message}</p>
        <button onClick={() => query.refetch()}>다시 시도</button>
        <Link href="/auth/sign-in">로그인</Link>
      </div>
    );
  const tip = query.data;
  const error = like.error || bookmark.error || remove.error;
  const share = async () => {
    try {
      if (navigator.share)
        await navigator.share({ title: tip.title, url: window.location.href });
      else {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage('링크를 복사했습니다.');
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError'))
        setShareMessage('링크 공유에 실패했습니다.');
    }
  };
  return (
    <main className="pb-10">
      <ImageGrid
        images={tip.media
          .filter(media => /^https?:\/\//.test(media.mediaUrl))
          .map(media => media.mediaUrl)}
      />
      <TipHeader
        title={tip.title}
        author={{
          name: tip.user.nickname || '사용자',
          avatarUrl: tip.user.profileImageUrl || '/images/tip-placeholder.svg',
          level: tip.user.isInfluencer ? '인플루언서' : undefined,
        }}
        createdAt={new Date(tip.createdAt).toLocaleString('ko-KR')}
      />
      <div className="mx-5 mt-6 h-px bg-gray-200" />
      <TipContent content={tip.content} />
      <TagList tags={tip.hashtags} />
      <TipActionBar
        stats={{ like: tip.likesCount, bookmark: tip.savesCount }}
        isLiked={tip.isLiked}
        isBookmarked={tip.isBookmarked}
        onLike={() => like.mutate()}
        onBookmark={() => bookmark.mutate()}
        onShare={share}
        pending={like.isPending || bookmark.isPending || remove.isPending}
        canDelete={canDelete}
        onDelete={openDelete}
      />
      {error && (
        <p role="alert" className="mx-5 text-red">
          {error.message}
        </p>
      )}
      {shareMessage && (
        <p role="status" className="mx-5">
          {shareMessage}
        </p>
      )}
      {profile.isError && (
        <p role="alert" className="mx-5">
          사용자 정보를 확인할 수 없습니다. {profile.error.message}
        </p>
      )}
      <TipComments tipId={tip.tipId} userId={profile.data?.user_id} />
      {isDeleteOpen && (
        <ModalWrapper onClose={closeDelete}>
          <ConfirmModal
            title="삭제하시겠습니까?"
            description={remove.error?.message}
            confirmText={remove.isPending ? '삭제 중...' : '삭제하기'}
            onConfirm={confirmDelete}
            onCancel={closeDelete}
          />
        </ModalWrapper>
      )}
    </main>
  );
}
