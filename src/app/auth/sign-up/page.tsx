'use client';

import { useEffect } from 'react';
import { StepProgressBar } from '@/components/ui/StepProgressBar';
import { SignupStep } from '@/features/auth/sign-up/stores/signupStore';
import TermsStep from '@/features/auth/sign-up/components/TermsStep/TermsStep';
import AuthPageHeader from '@/features/auth/components/AuthPageHeader/AuthPageHeader';
import {
  useCurrentStep,
  useSignupActions,
} from '@/features/auth/sign-up/hooks/useSignup';
import { useRouter } from 'next/navigation';
import EmailStep from '@/features/auth/sign-up/components/EmailStep/EmailStep';
import PasswordStep from '@/features/auth/sign-up/components/PasswordStep/PasswordStep';
import ProfileStep from '@/features/auth/sign-up/components/ProfileStep/ProfileStep';
import InterestStep from '@/features/auth/sign-up/components/InterestStep/InterestStep';

const SignUpPage = () => {
  const router = useRouter();
  const currentStep = useCurrentStep();
  const { reset, prevStep } = useSignupActions();

  const handlePrevStepClick = () => {
    if (currentStep === SignupStep.TERMS) {
      router.push('/auth/sign-in');
    } else {
      prevStep();
    }
  };

  const renderStepComponent = () => {
    switch (currentStep) {
      case SignupStep.TERMS:
        return <TermsStep />;
      case SignupStep.EMAIL:
        return <EmailStep />;
      case SignupStep.PASSWORD:
        return <PasswordStep />;
      case SignupStep.PROFILE:
        return <ProfileStep />;
      case SignupStep.INTERESTS:
        return <InterestStep />;
      default:
        return <TermsStep />;
    }
  };

  // 페이지 언마운트 시 상태 초기화
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <main className="flex min-h-[calc(100svh-env(safe-area-inset-top)-env(safe-area-inset-bottom))] flex-col items-center pb-6">
      <AuthPageHeader title="회원가입" onBack={handlePrevStepClick} />
      <div className="mt-2 w-full max-w-[380px]">
        <StepProgressBar
          currentStep={currentStep}
          totalSteps={SignupStep.INTERESTS}
        />
      </div>
      <div className="flex w-full max-w-[380px] flex-1 flex-col">
        {renderStepComponent()}
      </div>
    </main>
  );
};

export default SignUpPage;
