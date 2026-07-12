'use client';

import AuthPageHeader from '@/features/auth/components/AuthPageHeader/AuthPageHeader';
import FindEmailForm from '@/features/auth/find-email/components/FindEmailForm/FindEmailForm';
import { useRouter } from 'next/navigation';

const FindEmailPage = () => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center">
      <AuthPageHeader
        title="이메일 찾기"
        onBack={() => router.push('/auth/sign-in')}
      />
      <div className="mt-6 flex w-full flex-col items-center pb-8">
        <FindEmailForm />
      </div>
    </div>
  );
};

export default FindEmailPage;
