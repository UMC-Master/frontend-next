'use client';

import { useState } from 'react';
import Link from 'next/link';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';

export default function BottomActions() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout confirmed');
    // Add logout logic here (e.g., clear session, redirect to login)
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion logic
    console.log('Delete account confirmed');
    // Add account deletion logic here
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        {/* Password Change */}
        <Link
          href="/mypage/change-password"
          className="text-body2 text-gray-900 underline decoration-solid"
        >
          비밀번호변경
        </Link>

        {/* Logout / Delete Account */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="text-body2 text-gray-900"
          >
            로그아웃
          </button>

          {/* Divider */}
          <div className="w-0 h-4 border-l border-gray-700" />

          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-body2 text-gray-900"
          >
            탈퇴하기
          </button>
        </div>
      </div>

      {/* Logout Confirm Modal */}
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title="로그아웃 하시겠습니까?"
        confirmText="로그아웃"
      />

      {/* Delete Account Confirm Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="홈마스터를 떠나시겠습니까,,?"
        confirmText="탈퇴하기"
      />
    </>
  );
}
