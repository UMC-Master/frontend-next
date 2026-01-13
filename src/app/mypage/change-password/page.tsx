'use client';

import { useState } from 'react';
import SuccessModal from '@/common/components/Modal/SuccessModal';

export default function ChangePasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
    // TODO: Add password validation
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: Implement password change logic
    console.log('Password changed');
    setShowSuccessModal(true);
  };

  return (
    <div className="flex flex-col gap-4 pb-32">
      {/* Title Section */}
      <div className="flex flex-col gap-1">
        <div className="text-title2 text-gray-900">
          <p className="mb-0">홈마스터에서 사용할</p>
          <p>비밀번호를 입력해 주세요.</p>
        </div>
        <p className="text-body2 text-gray-600">조건 설명설명</p>
      </div>

      {/* Password Inputs */}
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

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-main-500 h-[52px] rounded-2xl flex items-center justify-center mt-auto fixed bottom-20 left-6 right-6 max-w-[380px] mx-auto"
      >
        <span className="text-title3 text-gray-200">비밀번호 변경</span>
      </button>

      {/* Success Modal */}
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
