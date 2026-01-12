import LargeButton from '@/components/Button/LargeButton/LargeButton';
import { useSignupActions, useSignupStep3Data } from '../../hooks/useSignup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  PasswordStepForm,
  passwordStepSchema,
} from '../../schema/passwordStep.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const PasswordStep = () => {
  const { nextStep, setPassword, setPasswordConfirm } = useSignupActions();
  const { password, passwordConfirm } = useSignupStep3Data();

  const {
    register,
    watch,
    formState: { errors, isValid, dirtyFields }, // isValid로 버튼 활성화 여부를 간단히 제어
  } = useForm<PasswordStepForm>({
    resolver: zodResolver(passwordStepSchema),
    mode: 'onChange', // 실시간으로 유효성을 검사하여 사용자에게 피드백
    defaultValues: {
      password,
      passwordConfirm,
    },
  });

  const passwordValue = watch('password');
  const passwordConfirmValue = watch('passwordConfirm');

  // 비밀번호 일치 여부 체크
  useEffect(() => {
    setPassword(passwordValue);
  }, [passwordValue, setPassword]);

  useEffect(() => {
    setPasswordConfirm(passwordConfirmValue);
  }, [passwordConfirmValue, setPasswordConfirm]);

  return (
    <div className="w-full flex flex-col justify-start mt-4">
      <div className="text-title1 text-gray-900 whitespace-pre-line">
        {`홈마스터에서 사용할\n 비밀번호를 입력해 주세요.`}
      </div>
      <div className="text-body2 text-gray-600 mt-1">
        영문, 숫자, 특수문자를 포함하여 8자 이상 15자 이하를 입력해 주세요.
      </div>

      {/* 비밀번호 입력 영역 */}
      <div className="flex flex-col gap-1 mt-8">
        <input
          {...register('password')}
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          className="text-body1 placeholder:text-gray-900 text-gray-900 p-3 border-[0.4px] border-gray-900 rounded-lg w-95 h-12"
        />
        {/* 비밀번호 규칙 에러 메시지 */}
        {errors.password && (
          <p className="text-caption1 text-red mt-1 h-4.5">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* 비밀번호 확인 입력 영역 */}
      <div className="flex flex-col gap-1 mt-5">
        <input
          {...register('passwordConfirm')}
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요."
          className="text-body1 placeholder:text-gray-900 text-gray-900 p-3 border-[0.4px] border-gray-900 rounded-lg w-95 h-12"
        />
        {/* 비밀번호 확인 에러 메시지 */}
        <div className="mt-1 text-caption1 h-4.5">
          {errors.passwordConfirm ? (
            // 에러가 있으면 에러 메시지를 최우선으로 표시
            <p className="text-red">{errors.passwordConfirm.message}</p>
          ) : dirtyFields.passwordConfirm && passwordConfirmValue ? (
            // 에러가 없고, 사용자가 입력했으며, 빈 값이 아니면 성공 메시지 표시
            <p className="text-main-500">✓ 비밀번호가 일치합니다.</p>
          ) : null}
        </div>
      </div>

      {/* 다음 버튼 */}
      <div className="absolute bottom-6">
        <LargeButton text="다음" onClick={nextStep} disabled={!isValid} />
      </div>
    </div>
  );
};

export default PasswordStep;
