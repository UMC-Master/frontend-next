'use client';

import BackIcon from '@/assets/svgs/arrow_backward.svg';
import { useRouter } from 'next/navigation';
import TitleHeader from '@/features/main/components/headers/TitleHeaderLayout';

export default function ChangePasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <TitleHeader
        title="비밀번호 변경"
        leftIcon={BackIcon}
        onIconClick={() => router.back()}
        sticky
      />
      <main className="">{children}</main>
    </>
  );
}
