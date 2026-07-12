'use client';

import AuthPageHeader from '@/features/auth/components/AuthPageHeader/AuthPageHeader';
import FindPasswordForm from '@/features/auth/find-password/components/FindPasswordForm/FindPasswordForm';
import { useRouter } from 'next/navigation';

const FindPasswordPage = () => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center">
      <AuthPageHeader
        title="비밀번호 찾기"
        onBack={() => router.push('/auth/sign-in')}
      />
      <div className="mt-6 flex w-full flex-col items-center pb-8">
        <FindPasswordForm />
      </div>
    </div>
  );
};

export default FindPasswordPage;
