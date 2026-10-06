'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import LargeButton from '@/components/Button/LargeButton/LargeButton';
import { authTextFieldClassName } from '@/features/auth/style/authTextField';
import { isValidEmail } from '@/common/utils/validation';
import { passwordStepSchema } from '@/features/auth/sign-up/schema/passwordStep.schema';
import {
  requestPasswordReset,
  confirmPasswordReset,
} from '@/api/auth/auth.api';
import { useAuthStore } from '@/features/auth/stores/authStore';

const FindPasswordForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const resetToken = params.get('resetToken') || '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const request = useMutation({ mutationFn: requestPasswordReset });
  const confirm = useMutation({
    mutationFn: (newPassword: string) =>
      confirmPasswordReset(resetToken, newPassword),
    onSuccess: () => {
      useAuthStore.getState().clearTokens();
      queryClient.clear();
      window.history.replaceState(null, '', '/auth/find-password');
      router.replace('/auth/sign-in');
    },
  });
  const validation = passwordStepSchema.safeParse({
    password,
    passwordConfirm,
  });
  const error = resetToken ? confirm.error : request.error;
  const pending = request.isPending || confirm.isPending;

  return (
    <form
      className="flex w-full max-w-[380px] flex-col gap-6 pb-24"
      onSubmit={event => {
        event.preventDefault();
        if (pending) return;
        if (resetToken && validation.success) confirm.mutate(password);
        else if (!resetToken && isValidEmail(email.trim()))
          request.mutate(email.trim());
      }}
    >
      {resetToken ? (
        <>
          <label className="flex flex-col gap-2 text-title3">
            새 비밀번호
            <input
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              disabled={pending}
              className={authTextFieldClassName()}
            />
          </label>
          <label className="flex flex-col gap-2 text-title3">
            새 비밀번호 확인
            <input
              type="password"
              autoComplete="new-password"
              value={passwordConfirm}
              onChange={event => setPasswordConfirm(event.target.value)}
              disabled={pending}
              className={authTextFieldClassName()}
            />
          </label>
          {(password || passwordConfirm) && !validation.success && (
            <p role="alert" className="text-caption1 text-red">
              {validation.error.issues[0].message}
            </p>
          )}
        </>
      ) : (
        <>
          <label className="flex flex-col gap-2 text-title3">
            이메일
            <input
              type="email"
              autoComplete="email"
              placeholder="가입한 이메일을 입력해 주세요."
              value={email}
              onChange={event => {
                setEmail(event.target.value);
                request.reset();
              }}
              disabled={pending}
              className={authTextFieldClassName()}
            />
          </label>
          <p className="text-body2 text-gray-600">
            재설정 링크의 유효한 토큰으로 새 비밀번호를 설정합니다.
          </p>
          <p className="text-caption1 text-gray-600">
            현재 서버의 재설정 메일 발송은 미구현 상태입니다. 실제 링크 수신은
            백엔드 발송 기능 구현 후 가능합니다.
          </p>
          {request.isSuccess && (
            <p role="status" className="text-body2 text-main-500">
              재설정 요청이 접수되었습니다. 현재 서버에서는 메일이 실제 발송되지
              않습니다.
            </p>
          )}
        </>
      )}
      {error && (
        <p role="alert" className="text-caption1 text-red">
          {error.message}
        </p>
      )}
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-10 flex justify-center px-6">
        <div className="pointer-events-auto w-full max-w-[380px]">
          <LargeButton
            text={
              pending
                ? '요청 중...'
                : resetToken
                  ? '비밀번호 재설정'
                  : '재설정 요청'
            }
            disabled={
              pending ||
              (resetToken ? !validation.success : !isValidEmail(email.trim()))
            }
          />
        </div>
      </div>
    </form>
  );
};

export default FindPasswordForm;
