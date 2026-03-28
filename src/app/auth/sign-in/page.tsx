'use client';

import SignInHeader from '@/features/auth/sign-in/components/SignInHeader/SignInHeader';
import SignInForm from '@/features/auth/sign-in/components/SignInForm/SignInForm';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center">
      <SignInHeader onClick={() => router.back()} />
      <div className="mt-3 w-full flex flex-col items-center pb-8">
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
