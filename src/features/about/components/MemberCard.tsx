'use client';

import Link from 'next/link';

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
      className="flex flex-col items-center gap-2 rounded-lg shadow-[0_0_16px_0_#eaeaea] bg-gray-100"
    >
      {/* 사진 */}
      <div className="w-full aspect-[182/156] rounded-t-lg overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${role} ${nameKo}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300" />
        )}
      </div>
      {/* 이름 */}
      <p className="text-title4 text-gray-900 w-full px-2 pb-2">
        {role} {nameKo}
      </p>
    </Link>
  );
}
