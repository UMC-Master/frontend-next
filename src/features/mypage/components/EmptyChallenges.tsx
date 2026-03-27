'use client';

import { useRouter } from 'next/navigation';

export default function EmptyChallenges() {
  const router = useRouter();

  const handleNavigateToChallenges = () => {
    // TODO: Navigate to challenges page when route is ready
    router.push('/challenges');
  };

  return (
    <div className="flex flex-col items-center gap-8 pt-12">
      {/* Placeholder Image */}
      <div className="w-full max-w-[380px] aspect-square bg-gray-300 rounded-lg" />

      {/* Empty Message */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-title3 text-gray-900 text-center">
          도전 중인 챌린지가 없습니다.
        </p>
        <p className="text-title3 text-gray-900 text-center">
          챌린지를 도전해 보세요!
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={handleNavigateToChallenges}
        className="bg-main-500 px-6 py-3 rounded-lg"
      >
        <span className="text-body2 text-gray-100">챌린지 바로가기</span>
      </button>
    </div>
  );
}
