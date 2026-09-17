'use client';

import Link from 'next/link';
import Image from 'next/image';

export interface MemberCardProps {
  id: string;
  role: string;
  nameKo: string;
  imageSrc?: string;
}

export default function MemberCard({
  id,
  role,
  nameKo,
  imageSrc,
}: MemberCardProps) {
  return (
    <Link
      href={`/mypage/about/${id}`}
      className="flex h-[194px] flex-col items-center gap-2 rounded-lg drop-shadow-[0_0_8px_#eaeaea]"
    >
      <div className="relative h-[156px] w-full overflow-hidden rounded-lg bg-main-500">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={`${role} ${nameKo}`}
            fill
            className="object-cover"
            sizes="182px"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>
      <p className="w-[calc(100%-16px)] text-title4 text-gray-900">
        {role} {nameKo}
      </p>
    </Link>
  );
}
