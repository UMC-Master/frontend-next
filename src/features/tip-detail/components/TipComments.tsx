'use client';

import { useState } from 'react';
import { useComments } from '@/api/comment/useComments';
import {
  useAddComment,
  useDeleteComment,
  useUpdateComment,
} from '@/api/comment/useCommentMutations';

export default function TipComments({
  tipId,
  userId,
}: {
  tipId: number;
  userId?: number;
}) {
  const query = useComments(tipId);
  const add = useAddComment(tipId);
  const remove = useDeleteComment(tipId, userId);
  const update = useUpdateComment(tipId, userId);
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState('');
  const pending = add.isPending || remove.isPending || update.isPending;
  const error = add.error || remove.error || update.error;
  const saveEdit = async () => {
    if (!editingId || !editDraft.trim() || pending) return;
    try {
      await update.mutateAsync({
        commentId: editingId,
        newComment: editDraft.trim(),
      });
      setEditingId(null);
    } catch {
      /* Keep the edit draft on failure. */
    }
  };
  return (
    <section className="mx-5 mt-6 flex flex-col gap-4">
      <h2 className="text-title3">댓글</h2>
      {query.isPending && <p role="status">댓글을 불러오는 중...</p>}
      {query.isError && (
        <div role="alert">
          {query.error.message}{' '}
          <button type="button" onClick={() => query.refetch()}>
            다시 시도
          </button>
        </div>
      )}
      {query.isSuccess && !query.data.length && <p>첫 댓글을 작성해 보세요.</p>}
      {query.data?.map(comment => (
        <article
          key={comment.comment_id}
          className="border-b border-gray-200 pb-3"
        >
          <p className="text-title4">{comment.user.nickname || '사용자'}</p>
          <time className="text-caption1 text-gray-600">
            {new Date(comment.created_at).toLocaleString('ko-KR')}
          </time>
          {editingId === comment.comment_id ? (
            <div>
              <textarea
                aria-label="댓글 수정 내용"
                value={editDraft}
                onChange={event => setEditDraft(event.target.value)}
                disabled={pending}
                className="w-full border p-2"
              />
              <button
                type="button"
                onClick={saveEdit}
                disabled={pending || !editDraft.trim()}
              >
                저장
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                disabled={pending}
              >
                취소
              </button>
            </div>
          ) : (
            <p className="whitespace-pre-wrap text-body2">{comment.comment}</p>
          )}
          {userId === comment.user.user_id &&
            editingId !== comment.comment_id && (
              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    setEditingId(comment.comment_id);
                    setEditDraft(comment.comment);
                  }}
                >
                  수정
                </button>
                <button
                  type="button"
                  disabled={pending}
                  onClick={() => {
                    if (window.confirm('댓글을 삭제할까요?'))
                      remove.mutate(comment.comment_id);
                  }}
                >
                  삭제
                </button>
              </div>
            )}
        </article>
      ))}
      {error && (
        <p role="alert" className="text-red">
          {error.message}
        </p>
      )}
      <form
        onSubmit={async event => {
          event.preventDefault();
          if (!draft.trim() || pending || !userId) return;
          try {
            await add.mutateAsync(draft.trim());
            setDraft('');
          } catch {
            /* Keep the comment draft on failure. */
          }
        }}
      >
        <textarea
          aria-label="댓글 내용"
          placeholder="댓글을 입력해 주세요."
          value={draft}
          onChange={event => setDraft(event.target.value)}
          disabled={pending || !userId}
          className="w-full rounded-lg border p-3"
        />
        <button type="submit" disabled={pending || !draft.trim() || !userId}>
          {add.isPending ? '등록 중...' : '댓글 등록'}
        </button>
      </form>
    </section>
  );
}
