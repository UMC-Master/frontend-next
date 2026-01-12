import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export enum SignupStep {
  TERMS = 1,
  EMAIL = 2,
  PASSWORD = 3,
  PROFILE = 4,
  INTERESTS = 5,
}

interface SignupData {
  // Step 1 - 약관 동의
  agreedToTerms: boolean;
  agreedToPrivacyPolicy: boolean;
  agreedToPrivacy: boolean;
  agreedToMarketing: boolean;

  // Step 2 - 이메일/인증번호
  email: string;
  verificationCode: string;
  isEmailVerified: boolean;

  // Step 3 - 비밀번호
  password: string;
  passwordConfirm: string;

  // Step 4 - 개인정보
  profileImage: File | null;
  nickname: string;
  location: {
    city: string;
    district: string;
  };

  // Step 5 - 관심사
  interests: string[];
}

interface SignupStore {
  currentStep: SignupStep;
  data: SignupData;
  actions: {
    setStep: (step: SignupStep) => void;
    nextStep: () => void;
    prevStep: () => void;
    setEmail: (email: string) => void;
    setVerificationCode: (code: string) => void;
    setEmailVerified: (verified: boolean) => void;
    setPassword: (password: string) => void;
    setPasswordConfirm: (passwordConfirm: string) => void;
    setProfileImage: (image: File | null) => void;
    setNickname: (nickname: string) => void;
    setLocation: (city: string, district: string) => void;
    setInterests: (interests: string[]) => void;
    toggleTermsAgreement: () => void;
    toggleAgreedToPrivacyPolicy: () => void;
    togglePrivacyAgreement: () => void;
    toggleMarketingAgreement: () => void;
    reset: () => void;
  };
}

const initialData: SignupData = {
  agreedToTerms: false,
  agreedToPrivacyPolicy: false,
  agreedToPrivacy: false,
  agreedToMarketing: false,
  email: '',
  verificationCode: '',
  isEmailVerified: false,
  password: '',
  passwordConfirm: '',
  profileImage: null,
  nickname: '',
  location: {
    city: '',
    district: '',
  },
  interests: [],
};

export const useSignupStore = create<SignupStore>()(
  devtools(
    immer(set => ({
      currentStep: SignupStep.TERMS,
      data: initialData,
      actions: {
        setStep: (step: SignupStep) => set({ currentStep: step }),

        nextStep: () =>
          set(state => ({
            currentStep: Math.min(
              SignupStep.INTERESTS,
              state.currentStep + 1,
            ) as SignupStep,
          })),

        prevStep: () =>
          set(state => ({
            currentStep: Math.max(
              SignupStep.TERMS,
              state.currentStep - 1,
            ) as SignupStep,
          })),

        setEmail: (email: string) =>
          set(s => {
            s.data.email = email;
          }),

        setVerificationCode: (code: string) =>
          set(s => {
            s.data.verificationCode = code;
          }),

        setEmailVerified: (verified: boolean) =>
          set(s => {
            s.data.isEmailVerified = verified;
          }),

        setPassword: (password: string) =>
          set(s => {
            s.data.password = password;
          }),

        setPasswordConfirm: (passwordConfirm: string) =>
          set(s => {
            s.data.passwordConfirm = passwordConfirm;
          }),

        setProfileImage: (image: File | null) =>
          set(s => {
            s.data.profileImage = image;
          }),

        setNickname: (nickname: string) =>
          set(s => {
            s.data.nickname = nickname;
          }),

        setLocation: (city: string, district: string) =>
          set(s => {
            s.data.location.city = city;
            s.data.location.district = district;
          }),

        setInterests: (interests: string[]) =>
          set(s => {
            s.data.interests = interests;
          }),

        toggleTermsAgreement: () =>
          set(s => {
            s.data.agreedToTerms = !s.data.agreedToTerms;
          }),

        toggleAgreedToPrivacyPolicy: () =>
          set(s => {
            s.data.agreedToPrivacyPolicy = !s.data.agreedToPrivacyPolicy;
          }),

        togglePrivacyAgreement: () =>
          set(s => {
            s.data.agreedToPrivacy = !s.data.agreedToPrivacy;
          }),

        toggleMarketingAgreement: () =>
          set(s => {
            s.data.agreedToMarketing = !s.data.agreedToMarketing;
          }),

        reset: () => set({ currentStep: SignupStep.TERMS, data: initialData }),
      },
    })),
    { name: 'SignupStore' },
  ),
);
