'use client';

import { useState } from 'react';
import Link from 'next/link';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';

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
      <div className="flex flex-col items-center gap-6 text-body2 text-gray-900">
        <div className="flex flex-col items-center gap-3">
          <Link href="/mypage/change-password" className="underline">
            비밀번호변경
          </Link>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setShowLogoutModal(true)}>
              로그아웃
            </button>
            <span className="h-4 w-px bg-gray-300" aria-hidden />
            <button type="button" onClick={() => setShowDeleteModal(true)}>
              탈퇴하기
            </button>
          </div>
        </div>
        <a href="mailto:sfdoisf@gmail.com">문의: sfdoisf@gmail.com</a>
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
