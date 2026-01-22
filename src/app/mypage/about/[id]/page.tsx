'use client';

import { useRouter, useParams } from 'next/navigation';
import { useMemo } from 'react';
import BackIcon from '@/assets/svgs/arrow_backward.svg';
import TitleHeader from '@/features/main/components/headers/TitleHeaderLayout';
import QAAccordion from '@/features/about/components/QAAccordion';
import { getMemberById } from '@/features/about/data/members';

export default function MemberDetailPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;

  const member = useMemo(() => getMemberById(memberId), [memberId]);

  if (!member) {
    return (
      <>
        <TitleHeader
          title="만든 사람들"
          leftIcon={BackIcon}
          onIconClick={() => router.back()}
          sticky
        />
        <main className="flex items-center justify-center h-[50vh]">
          <p className="text-body1 text-gray-700">멤버를 찾을 수 없습니다.</p>
        </main>
      </>
    );
  }

  return (
    <>
      <TitleHeader
        title={`${member.role} ${member.nameKo}`}
        leftIcon={BackIcon}
        onIconClick={() => router.back()}
        sticky
      />
      <main className="flex flex-col gap-8">
        {/* 프로필 섹션 */}
        <div className="flex items-center gap-8">
          {/* 프로필 이미지 */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-300 shrink-0">
            {member.imageSrc ? (
              <img
                src={member.imageSrc}
                alt={`${member.role} ${member.nameKo}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300" />
            )}
          </div>

          {/* 정보 */}
          <div className="flex flex-col gap-2">
            <p className="text-title3 text-gray-1000">
              {member.nameKo} / {member.nameEn}
            </p>
            <div className="flex flex-col gap-1">
              <p className="text-title4 text-gray-900">{member.university}</p>
              <p className="text-body1 text-gray-800">{member.department}</p>
            </div>
          </div>
        </div>

        {/* Q&A 섹션 */}
        <QAAccordion items={member.qna} />
      </main>
    </>
  );
}
