'use client';

import { useState } from 'react';
import SuccessModal from '@/common/components/Modal/SuccessModal';

export default function ChangePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    setShowSuccessModal(true);
  };

  return (
    <div className="flex min-h-[calc(100svh-54px)] flex-col gap-4 pb-24 pt-4">
      <div className="flex flex-col gap-1">
        <div className="text-title2 text-gray-900">
          <p className="mb-0">홈마스터에서 사용할</p>
          <p>비밀번호를 입력해 주세요.</p>
        </div>
        <p className="text-body2 text-gray-600">
          영문, 숫자, 특수문자를 포함해 8자 이상 입력해 주세요.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요."
          className="h-12 px-3 border-[0.4px] border-gray-500 rounded-lg text-body2 text-gray-900 bg-gray-100 focus:outline-none focus:border-main-500"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="다시 한번 입력해 주세요."
          className="h-12 px-3 border-[0.4px] border-gray-500 rounded-lg text-body2 text-gray-900 bg-gray-100 focus:outline-none focus:border-main-500"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="fixed bottom-6 left-1/2 flex h-[52px] w-[calc(100%-48px)] max-w-[380px] -translate-x-1/2 items-center justify-center rounded-2xl bg-main-500"
      >
        <span className="text-title3 text-gray-200">비밀번호 변경</span>
      </button>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="비밀번호 변경이 완료되었습니다."
        buttonText="마이페이지로 이동"
        redirectPath="/mypage"
      />
    </div>
  );
}
