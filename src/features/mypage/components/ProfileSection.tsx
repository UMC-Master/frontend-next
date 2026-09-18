'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProfileSection() {
  return (
    <div className="flex w-[160px] flex-col items-center gap-2">
      <div className="relative size-[160px]">
        <Image
          src="/mypage/profile-circle.svg"
          alt=""
          width={192}
          height={192}
          className="absolute -left-4 -top-4 max-w-none"
          sizes="160px"
          priority
        />
        <Image
          src="/mypage/profile-mark.svg"
          alt="홈마스터 프로필"
          width={101}
          height={82}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          priority
        />
      </div>

      <h2 className="text-[24px] font-semibold leading-[1.2] text-gray-1000">
        애니
      </h2>
      <Link
        href="/mypage/edit-profile"
        className="rounded-lg bg-gray-200 px-3 py-1.5 text-body2 text-gray-800"
      >
        프로필 변경
      </Link>
    </div>
  );
}
