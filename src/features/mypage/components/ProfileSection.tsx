'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProfileSection() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Profile Image and Info */}
      <div className="flex flex-col items-center gap-2">
        {/* Profile Photo */}
        <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-300">
          <Image
            src="/images/profile-placeholder.png"
            alt="프로필 사진"
            fill
            className="object-cover"
          />
        </div>

        {/* Username */}
        <h2 className="text-[24px] font-semibold leading-[1.2] tracking-[-0.01em] text-gray-1000">
          애니
        </h2>

        {/* Profile Change Button */}
        <Link
          href="/mypage/edit-profile"
          className="bg-gray-200 px-3 py-1.5 rounded-lg"
        >
          <span className="text-body2 text-gray-800">프로필 변경</span>
        </Link>
      </div>
    </div>
  );
}
