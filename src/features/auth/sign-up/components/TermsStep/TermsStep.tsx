'use client';

import BeforeCheckBox from '@/assets/svgs/BeforeCheckBox.svg';
import AfterCheckBox from '@/assets/svgs/AfterCheckBox.svg';
import BeforeCheckIcon from '@/assets/svgs/BeforeCheck.svg';
import AfterCheckIcon from '@/assets/svgs/AfterCheck.svg';
import ArrowRightIcon from '@/assets/svgs/ArrowRight.svg';
import { useSignupActions, useSignupStep1Data } from '../../hooks/useSignup';
import LargeButton from '@/components/Button/LargeButton/LargeButton';
import { useRouter } from 'next/navigation';

const TermsStep = () => {
  const router = useRouter();

  const {
    agreedToTerms,
    agreedToPrivacyPolicy,
    agreedToPrivacy,
    agreedToMarketing,
  } = useSignupStep1Data();

  const {
    toggleTermsAgreement,
    toggleAgreedToPrivacyPolicy,
    togglePrivacyAgreement,
    toggleMarketingAgreement,
    nextStep,
  } = useSignupActions();

  // 전체 동의 상태 계산
  const totalChecked =
    agreedToTerms &&
    agreedToPrivacyPolicy &&
    agreedToPrivacy &&
    agreedToMarketing;

  // 전체 동의 토글 함수
  const handleTotalAgreement = () => {
    const shouldAgree = !totalChecked;
    if (agreedToTerms !== shouldAgree) toggleTermsAgreement();
    if (agreedToPrivacyPolicy !== shouldAgree) toggleAgreedToPrivacyPolicy();
    if (agreedToPrivacy !== shouldAgree) togglePrivacyAgreement();
    if (agreedToMarketing !== shouldAgree) toggleMarketingAgreement();
  };

  return (
    <div className="mt-4 flex w-full flex-col justify-start pb-24">
      <div className="text-title1 text-gray-900 whitespace-pre-line">
        {`안녕하세요!\n홈마스터와 함께 하는걸 환영해요.`}
      </div>
      <div className="text-body2 text-gray-600 mt-1">
        홈마스터를 이용하기 위해서는 약관동의가 필요해요.
      </div>

      {/* 전체 동의 */}
      <div
        className="flex mt-8 items-center cursor-pointer"
        onClick={handleTotalAgreement}
      >
        <div>{totalChecked ? <AfterCheckBox /> : <BeforeCheckBox />}</div>

        <div className="ml-2 text-title3 text-gray-1000">
          약관 전체 동의하기
        </div>
      </div>

      {/* 약관 동의 */}
      <div className="flex items-center justify-between mt-4 cursor-pointer">
        <div className="flex items-center" onClick={toggleTermsAgreement}>
          {agreedToTerms ? <AfterCheckIcon /> : <BeforeCheckIcon />}
          <div className="ml-1 text-title4 text-gray-1000">{`(필수)`}</div>
          <div className="ml-1 text-body1 text-gray-500">이용 약관 동의</div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push(`/auth/sign-up/term`);
          }}
        >
          <ArrowRightIcon />
        </div>
      </div>

      {/* 개인정보 수집 및 약관 동의 */}
      <div className="flex items-center justify-between mt-2 cursor-pointer">
        <div
          className="flex items-center"
          onClick={toggleAgreedToPrivacyPolicy}
        >
          {agreedToPrivacyPolicy ? <AfterCheckIcon /> : <BeforeCheckIcon />}
          <div className="ml-1 text-title4 text-gray-1000">{`(필수)`}</div>
          <div className="ml-1 text-body1 text-gray-500">
            개인 정보 수집 및 이용 약관 동의
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push(`/auth/sign-up/privacy-policy`);
          }}
        >
          <ArrowRightIcon />
        </div>
      </div>

      {/* 제 3자 정보 동의 */}
      <div className="flex items-center justify-between mt-2 cursor-pointer">
        <div className="flex items-center" onClick={togglePrivacyAgreement}>
          {agreedToPrivacy ? <AfterCheckIcon /> : <BeforeCheckIcon />}
          <div className="ml-1 text-title4 text-gray-1000">{`(선택)`}</div>
          <div className="ml-1 text-body1 text-gray-500">
            제 3자 정보 제공 동의
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push(`/auth/sign-up/privacy`);
          }}
        >
          <ArrowRightIcon />
        </div>
      </div>

      {/* 마케팅 활용 동의 */}
      <div className="flex items-center justify-between mt-2 cursor-pointer">
        <div className="flex items-center" onClick={toggleMarketingAgreement}>
          {agreedToMarketing ? <AfterCheckIcon /> : <BeforeCheckIcon />}
          <div className="ml-1 text-title4 text-gray-1000">{`(선택)`}</div>
          <div className="ml-1 text-body1 text-gray-500">마케팅 활용 동의</div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push(`/auth/sign-up/marketing`);
          }}
        >
          <ArrowRightIcon />
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-10 flex justify-center ps-[max(1.5rem,env(safe-area-inset-left,0px))] pe-[max(1.5rem,env(safe-area-inset-right,0px))]">
        <div className="pointer-events-auto w-full max-w-[380px]">
          <LargeButton
            text="다음"
            onClick={nextStep}
            disabled={!agreedToTerms || !agreedToPrivacyPolicy}
          />
        </div>
      </div>
    </div>
  );
};

export default TermsStep;
