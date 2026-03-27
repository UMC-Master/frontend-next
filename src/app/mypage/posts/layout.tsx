'use client';

import BackIcon from '@/assets/svgs/arrow_backward.svg';
import { useRouter } from 'next/navigation';
import TitleHeader from '@/features/main/components/headers/TitleHeaderLayout';

export default function MyPostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <TitleHeader
        title="내가 쓴 꿀팁"
        leftIcon={BackIcon}
        onIconClick={() => router.back()}
        sticky
      />
      <main className="">{children}</main>
    </>
  );
}
