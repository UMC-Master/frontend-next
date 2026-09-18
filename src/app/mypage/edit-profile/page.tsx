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
    <div className="flex flex-col gap-8 pb-8 pt-4">
      <div className="flex flex-col gap-5 items-center">
        <ProfileImageUpload />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-12 px-3 border-[0.4px] border-gray-900 rounded-lg text-body2 text-gray-900 focus:outline-none focus:border-main-500"
          placeholder="이름"
        />

        <AddressSelector />
      </div>

      <InterestTagSelector
        selectedInterests={selectedInterests}
        onToggle={handleInterestToggle}
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="bg-main-500 h-[52px] rounded-2xl flex items-center justify-center"
      >
        <span className="text-title3 text-gray-200">프로필 변경</span>
      </button>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="프로필이 변경되었습니다."
        buttonText="확인"
        redirectPath="/mypage"
        illustrationSrc="/mypage/success-check.svg"
        illustrationAlt="프로필 변경 완료"
      />
    </div>
  );
}
