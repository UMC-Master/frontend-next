'use client';

import { useRouter } from 'next/navigation';
import AuthPageHeader from '@/features/auth/components/AuthPageHeader/AuthPageHeader';

export default function TipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <AuthPageHeader title="꿀팁 작성하기" onBack={router.back} />
      {children}
    </>
  );
}
