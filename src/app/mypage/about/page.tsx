'use client';

import { useRouter } from 'next/navigation';
import BackIcon from '@/assets/svgs/arrow_backward.svg';
import TitleHeader from '@/features/main/components/headers/TitleHeaderLayout';
import MemberCard from '@/features/about/components/MemberCard';
import { teamMembers } from '@/features/about/data/members';

export default function AboutPage() {
  const router = useRouter();

  return (
    <>
      <TitleHeader
        title="만든 사람들"
        leftIcon={BackIcon}
        onIconClick={() => router.back()}
        sticky
      />
      <main>
        {/* 멤버 그리드 */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {teamMembers.map((member) => (
            <MemberCard
              key={member.id}
              id={member.id}
              role={member.role}
              nameKo={member.nameKo}
              imageSrc={member.imageSrc}
            />
          ))}
        </div>
      </main>
    </>
  );
}
