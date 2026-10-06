'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';
import ModalWrapper from '@/components/ModalWrapper/ModalWrapper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { deactivateAccount } from '@/api/auth/auth.api';
import { clearUserSession } from '@/features/auth/session';

interface MenuItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
}

function MenuItem({ label, href, onClick }: MenuItemProps) {
  const content = (
    <>
      <span>{label}</span>
      <Image
        src="/mypage/arrow-forward.svg"
        alt=""
        width={12}
        height={12}
        aria-hidden
      />
    </>
  );

  const className =
    'flex h-[59px] w-full items-center justify-between rounded-[10px] bg-[#cacad0] px-6 text-left text-title4 text-white';

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}

export default function BottomActions() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const locked = useRef(false);
  const [pendingLogout, setPendingLogout] = useState(false);
  const deactivate = useMutation({ mutationFn: deactivateAccount });

  const handleLogout = async () => {
    if (locked.current) return;
    locked.current = true;
    setPendingLogout(true);
    await clearUserSession(queryClient);
    router.replace('/auth/sign-in');
  };

  const handleDeleteAccount = async () => {
    if (locked.current) return;
    locked.current = true;
    try {
      await deactivate.mutateAsync();
      await clearUserSession(queryClient);
      router.replace('/auth/sign-in');
    } catch {
      /* Leave the account and modal intact on failure. */
    } finally {
      locked.current = false;
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <MenuItem label="프로필 변경" href="/mypage/edit-profile" />
        <MenuItem label="로그아웃" onClick={() => setShowLogoutModal(true)} />
        <MenuItem label="탈퇴하기" onClick={() => setShowDeleteModal(true)} />
        <MenuItem label="만든 사람들" href="/mypage/about" />
      </div>

      {showLogoutModal && (
        <ModalWrapper
          onClose={() => {
            if (!pendingLogout) setShowLogoutModal(false);
          }}
        >
          <ConfirmModal
            onCancel={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
            title="로그아웃 하시겠습니까?"
            confirmText={pendingLogout ? '로그아웃 중...' : '로그아웃'}
            disabled={pendingLogout}
          />
        </ModalWrapper>
      )}

      {showDeleteModal && (
        <ModalWrapper
          onClose={() => {
            if (!deactivate.isPending) setShowDeleteModal(false);
          }}
        >
          <ConfirmModal
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={handleDeleteAccount}
            title="홈마스터를 떠나시겠습니까?"
            description={
              deactivate.error?.message ||
              '현재 서버는 계정을 비활성화합니다. 계정과 데이터의 영구 삭제는 지원되지 않습니다.'
            }
            confirmText={deactivate.isPending ? '처리 중...' : '탈퇴하기'}
            disabled={deactivate.isPending}
          />
        </ModalWrapper>
      )}
    </>
  );
}
