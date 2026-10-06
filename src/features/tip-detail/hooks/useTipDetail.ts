import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTipDetail as useTipQuery } from '@/api/tip/useTipDetail';
import { useToggleLike, useToggleBookmark } from '@/api/tip/useToggleTip';
import { deleteTip } from '@/api/tip/tip.api';
import { getProfile } from '@/api/auth/auth.api';
import { useAuthStore } from '@/features/auth/stores/authStore';

export function useTipDetail(tipId: string) {
  const id = Number(tipId);
  const validId = Number.isSafeInteger(id) && id > 0;
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const accessToken = useAuthStore(state => state.accessToken);
  const query = useTipQuery(validId ? id : 0);
  const profile = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!accessToken,
  });
  const like = useToggleLike(id);
  const bookmark = useToggleBookmark(id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleting = useRef(false);
  const remove = useMutation({
    mutationFn: () => deleteTip(id),
    onSuccess: async () => {
      queryClient.removeQueries({ queryKey: ['tips', id], exact: true });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['tips'] }),
        queryClient.invalidateQueries({ queryKey: ['saved-tips'] }),
      ]);
      router.replace('/main');
    },
  });
  const canDelete =
    !!accessToken &&
    !!profile.data &&
    profile.data.user_id === query.data?.user.userId;
  const confirmDelete = async () => {
    if (!canDelete || deleting.current) return;
    deleting.current = true;
    try {
      await remove.mutateAsync();
    } catch {
      /* Display the mutation error and preserve the modal. */
    } finally {
      deleting.current = false;
    }
  };
  return {
    validId,
    query,
    profile,
    like,
    bookmark,
    remove,
    canDelete,
    confirmDelete,
    isDeleteOpen,
    openDelete: () => {
      if (canDelete) setDeleteOpen(true);
    },
    closeDelete: () => {
      if (!remove.isPending) setDeleteOpen(false);
    },
  };
}
