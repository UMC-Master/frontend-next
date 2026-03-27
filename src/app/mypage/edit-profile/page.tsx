'use client';

import { useState } from 'react';
import ProfileImageUpload from '@/features/mypage/components/ProfileImageUpload';
import AddressSelector from '@/features/mypage/components/AddressSelector';
import InterestTagSelector from '@/features/mypage/components/InterestTagSelector';
import SuccessModal from '@/common/components/Modal/SuccessModal';

export default function EditProfilePage() {
  const [name, setName] = useState('민정');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    '환절기',
    '가구',
    '냉장',
    '스티로폼',
  ]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = () => {
    // TODO: 프로필 변경 로직 구현
    console.log('Profile updated:', { name, selectedInterests });
    setShowSuccessModal(true);
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests((prev) => {
      if (prev.includes(interest)) {
        return prev.filter((i) => i !== interest);
      }
      if (prev.length >= 5) {
        alert('최대 5개까지 선택 가능합니다.');
        return prev;
      }
      return [...prev, interest];
    });
  };

  return (
    <div className="flex flex-col gap-8 pb-32">
      {/* Profile Section */}
      <div className="flex flex-col gap-5 items-center">
        <ProfileImageUpload />

        {/* Name Input */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-12 px-3 border-[0.4px] border-gray-900 rounded-lg text-body2 text-gray-900 focus:outline-none focus:border-main-500"
          placeholder="이름"
        />

        {/* Address Selector */}
        <AddressSelector />
      </div>

      {/* Interest Tags */}
      <InterestTagSelector
        selectedInterests={selectedInterests}
        onToggle={handleInterestToggle}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-main-500 h-[52px] rounded-2xl flex items-center justify-center"
      >
        <span className="text-title3 text-gray-200">프로필 변경</span>
      </button>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="프로필 변경이 완료되었습니다."
        buttonText="마이페이지로 이동"
        redirectPath="/mypage"
      />
    </div>
  );
}
