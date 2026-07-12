import LargeButton from '@/components/Button/LargeButton/LargeButton';
import SmallButton from '@/components/Button/SmallButton/SmallButton';
import { useSignupActions, useSignupStep2Data } from '../../hooks/useSignup';
import { useForm } from 'react-hook-form';
import {
  ALERT_MESSAGES,
  EmailStepForm,
  emailStepSchema,
} from '../../schema/emailStep.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const EmailStep = () => {
  const { nextStep, setEmail, setVerificationCode, setEmailVerified } =
    useSignupActions();

  const { email, verificationCode, isEmailVerified } = useSignupStep2Data();

  // API 요청 로딩 상태를 관리 -> TODO: 추후 mutation 으로 관리
  const [isRequesting, setIsRequesting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const {
    register,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<EmailStepForm>({
    resolver: zodResolver(emailStepSchema),
    mode: 'onBlur',
    // 전역 상태의 초기값을 defaultValues로 설정합니다.
    defaultValues: {
      email,
      verificationCode,
    },
  });

  // watch를 사용해 form 내부의 값 변화를 감지
  const emailValue = watch('email');
  const verificationCodeValue = watch('verificationCode');

  useEffect(() => {
    setEmail(emailValue);
  }, [emailValue, setEmail]);

  useEffect(() => {
    setVerificationCode(verificationCodeValue);
  }, [verificationCodeValue, setVerificationCode]);

  // 버튼 클릭 시 실행될 핸들러 함수들을 정의
  const handleRequestVerification = async () => {
    const isEmailValid = await trigger('email');
    if (!isEmailValid) return;

    setIsRequesting(true);
    try {
      // TODO: 실제 이메일 인증 로직 구현
      console.log('이메일 인증 요청:', getValues('email'));
      alert('인증번호가 발송되었습니다.');
    } catch (error) {
      console.error(error);
      alert('인증번호 발송에 실패했습니다.');
    } finally {
      setIsRequesting(false);
    }
  };

  const handleVerifyCode = async () => {
    const isCodeValid = await trigger('verificationCode');
    if (!isCodeValid) return;

    setIsVerifying(true);
    try {
      // TODO: 실제 인증번호 검증 로직 구현
      console.log('인증번호 확인 요청:', getValues('verificationCode'));
      setEmailVerified(true);
    } catch (error) {
      console.error(error);
      alert('인증번호가 올바르지 않습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full pb-24">
      {/* 소개글 */}
      <div className="w-full flex flex-col justify-start mt-4">
        <div className="text-title1 text-gray-900 whitespace-pre-line">
          {`홈마스터에서 사용할\n 이메일을 입력해 주세요.`}
        </div>
        <div className="text-body2 text-gray-600 mt-1">
          이메일로 인증까지 완료해 주세요!
        </div>
      </div>

      {/* 인풋 영역 */}
      <div className="flex flex-col gap-1 mt-8">
        <div className="flex gap-2">
          <input
            {...register('email')}
            type="email"
            placeholder="이메일을 입력해 주세요."
            className="text-body1 placeholder:text-gray-900 text-gray-800 py-1.5 px-3 border-[0.4px] border-gray-900 rounded-lg w-66 h-12"
            disabled={isEmailVerified}
          />
          <SmallButton
            text={'인증하기'}
            onClick={handleRequestVerification}
            disabled={!emailValue || isRequesting || isEmailVerified}
          />
        </div>
        {errors.email && (
          <p className="text-caption1 text-red">{errors.email.message}</p>
        )}
      </div>

      {/* 인증번호 영역 */}
      <div className="flex flex-col gap-1 mt-5">
        <div className="flex gap-2">
          <input
            {...register('verificationCode')}
            type="text"
            placeholder="인증 번호를 입력해 주세요."
            className={clsx(
              'text-body1 placeholder:text-gray-900 text-gray-800 py-1.5 px-3 border-[0.4px] border-gray-900 rounded-lg w-66 h-12 transition-colors',
              {
                'cursor-not-allowed': !emailValue,
              },
            )}
            maxLength={6}
            disabled={!emailValue || isEmailVerified || isVerifying}
            // emailValue 가 없으면 인증번호도 못 치게
          />
          <SmallButton
            text={'인증완료'}
            onClick={handleVerifyCode}
            disabled={!verificationCodeValue || isEmailVerified || isVerifying}
          />
        </div>

        {isEmailVerified ? (
          <p className="text-main-500 text-caption1">
            {ALERT_MESSAGES.VERIFY_SUCCESS}
          </p>
        ) : errors.verificationCode ? (
          <p className="text-red text-caption1">
            {errors.verificationCode.message}
          </p>
        ) : null}
      </div>

      {/* 다음 버튼 */}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-10 flex justify-center ps-[max(1.5rem,env(safe-area-inset-left,0px))] pe-[max(1.5rem,env(safe-area-inset-right,0px))]">
        <div className="pointer-events-auto w-full max-w-[380px]">
          {/* TODO: 개발단계에서만 일단 넘기고 이메일 로직 완료되면 ! 추가 */}
          <LargeButton
            text="다음"
            onClick={nextStep}
            disabled={!isEmailVerified}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailStep;
