'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';

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

  const handleLogout = () => {
    console.log('Logout confirmed');
  };

  const handleDeleteAccount = () => {
    console.log('Delete account confirmed');
  };

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <MenuItem label="프로필 변경" href="/mypage/edit-profile" />
        <MenuItem
          label="로그아웃"
          onClick={() => setShowLogoutModal(true)}
        />
        <MenuItem
          label="탈퇴하기"
          onClick={() => setShowDeleteModal(true)}
        />
        <MenuItem label="만든 사람들" href="/mypage/about" />
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="로그아웃 하시겠습니까?"
        confirmText="로그아웃"
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="홈마스터를 떠나시겠습니까?"
        confirmText="탈퇴하기"
      />
    </>
  );
}
