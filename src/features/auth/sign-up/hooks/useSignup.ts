import { useShallow } from 'zustand/shallow';
import { useSignupStore } from '@/features/auth/sign-up/stores/signupStore';

// 회원가입 데이터 선택적 조회
export const useSignupData = () =>
  useSignupStore(
    useShallow(state => ({
      currentStep: state.currentStep,
      data: state.data,
    })),
  );

// 회원가입 액션들만 조회
export const useSignupActions = () => useSignupStore(state => state.actions);

// 특정 단계의 데이터만 조회
export const useSignupStep1Data = () =>
  useSignupStore(
    useShallow(state => ({
      agreedToTerms: state.data.agreedToTerms,
      agreedToPrivacyPolicy: state.data.agreedToPrivacyPolicy,
      agreedToPrivacy: state.data.agreedToPrivacy,
      agreedToMarketing: state.data.agreedToMarketing,
    })),
  );

export const useSignupStep2Data = () =>
  useSignupStore(
    useShallow(state => ({
      email: state.data.email,
      verificationCode: state.data.verificationCode,
      isEmailVerified: state.data.isEmailVerified,
    })),
  );

export const useSignupStep3Data = () =>
  useSignupStore(
    useShallow(state => ({
      password: state.data.password,
      passwordConfirm: state.data.passwordConfirm,
    })),
  );

export const useSignupStep4Data = () =>
  useSignupStore(
    useShallow(state => ({
      profileImage: state.data.profileImage,
      nickname: state.data.nickname,
      location: state.data.location,
    })),
  );

export const useSignupStep5Data = () =>
  useSignupStore(
    useShallow(state => ({
      interests: state.data.interests,
    })),
  );

// 현재 단계만 조회
export const useCurrentStep = () => useSignupStore(state => state.currentStep);
