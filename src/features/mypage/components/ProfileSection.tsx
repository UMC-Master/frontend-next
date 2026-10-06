'use client';

import Image from 'next/image';

export default function ProfileSection({
  nickname,
  imageUrl,
}: {
  nickname: string | null;
  imageUrl: string | null;
}) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="relative size-[108px] overflow-hidden rounded-full bg-gray-300">
        <Image
          src={imageUrl || '/mypage/profile-placeholder.png'}
          unoptimized={!!imageUrl}
          alt="프로필 사진"
          fill
          className="object-cover"
          sizes="108px"
          priority
        />
      </div>

      <h2 className="text-title3 text-gray-1000">{nickname || '사용자'}</h2>
    </div>
  );
}
