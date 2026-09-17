'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function EmptyChallenges() {
  return (
    <div className="flex flex-col items-center pt-[23px]">
      <Image
        src="/mypage/challenge-empty.png"
        alt="도전 중인 챌린지 없음"
        width={240}
        height={240}
        className="size-[240px] object-cover"
        priority
      />

      <div className="mt-4 flex flex-col items-center gap-6">
        <p className="text-center text-title2 text-gray-800">
          도전 중인 챌린지가 없습니다.
          <br />
          챌린지를 도전해 보세요!
        </p>

        <Link
          href="/challenges"
          className="flex h-12 items-center justify-center rounded-lg bg-main-500 px-3 text-title4 text-gray-200"
        >
          챌린지 바로가기
        </Link>
      </div>
    </div>
  );
}
