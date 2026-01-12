'use client';

import { useEffect } from 'react';
import { StepProgressBar } from '@/components/ui/StepProgressBar';
import { SignupStep } from '@/features/auth/sign-up/stores/signupStore';
import TermsStep from '@/features/auth/sign-up/components/TermsStep/TermsStep';
import SignUpHeader from '@/features/auth/sign-up/components/SignUpHeader/SignUpHeader';
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
    <div>
      <div className="flex flex-col items-center">
        <SignUpHeader onClick={handlePrevStepClick} />
        {/* Step Progress Bar */}
        <div className="mt-2">
          <StepProgressBar currentStep={currentStep} totalSteps={5} />
        </div>

        {/* Step Content */}
        <div className="w-95">{renderStepComponent()}</div>
      </div>
    </div>
  );
};

export default SignUpPage;
