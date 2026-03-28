'use client';

import { useState } from 'react';
import Link from 'next/link';
import BeforeCheckBoxInSignIn from '@/assets/svgs/before-check-box-in-sign-in.svg';
import AfterCheckBoxInSignIn from '@/assets/svgs/after-check-box-in-sign-in.svg';
import LargeButton from '@/components/Button/LargeButton/LargeButton';
import KakaoLoginButton from '@/features/auth/sign-in/components/KakaoLoginButton/KakaoLoginButton';
import { authTextFieldClassName } from '@/features/auth/style/authTextField';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (value: string) => EMAIL_PATTERN.test(value.trim());

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberEmail, setRememberEmail] = useState(true);
  const [emailBlurred, setEmailBlurred] = useState(false);

  const emailTrimmed = email.trim();
  const showEmailError =
    emailBlurred && emailTrimmed !== '' && !isValidEmail(emailTrimmed);

  const canSubmit = isValidEmail(emailTrimmed) && password.length > 0;

  return (
    <form
      className="flex w-full max-w-[380px] flex-col items-center"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sign-in-email"
              className="text-title3 text-gray-1000"
            >
              이메일
            </label>
            <div className="flex w-full max-w-[380px] flex-col gap-1">
              <input
                id="sign-in-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="이메일을 입력해 주세요."
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setEmailBlurred(true)}
                className={authTextFieldClassName(showEmailError)}
                aria-invalid={showEmailError}
                aria-describedby={
                  showEmailError ? 'sign-in-email-error' : undefined
                }
              />
              {showEmailError ? (
                <p
                  id="sign-in-email-error"
                  className="text-caption1 text-red"
                  role="alert"
                >
                  올바르지 않은 이메일 형태입니다.
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="sign-in-password"
              className="text-title3 text-gray-1000"
            >
              비밀번호
            </label>
            <input
              id="sign-in-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={authTextFieldClassName()}
            />
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-1.5">
          <input
            type="checkbox"
            checked={rememberEmail}
            onChange={e => setRememberEmail(e.target.checked)}
            className="sr-only"
          />
          <span className="shrink-0" aria-hidden>
            {rememberEmail ? (
              <AfterCheckBoxInSignIn />
            ) : (
              <BeforeCheckBoxInSignIn />
            )}
          </span>
          <span className="text-body2 text-gray-900">이메일 저장하기</span>
        </label>

        <LargeButton
          text="로그인하기"
          className="text-title3"
          disabled={!canSubmit}
        />
      </div>

      <div className="mt-6 flex w-full items-center gap-4.5">
        <div className="h-px flex-1 bg-gray-300" aria-hidden />
        <span className="shrink-0 text-body2 text-gray-800">또는</span>
        <div className="h-px flex-1 bg-gray-300" aria-hidden />
      </div>

      <div className="mt-6 w-full self-stretch">
        <KakaoLoginButton />
      </div>

      <div className="mt-[6.25rem] flex flex-wrap items-center justify-center gap-3 text-body2 text-gray-900">
        <Link href="/auth/find-email" className="hover:underline">
          이메일 찾기
        </Link>
        <span className="text-gray-500" aria-hidden>
          |
        </span>
        <Link href="/auth/find-password" className="hover:underline">
          비밀번호 찾기
        </Link>
        <span className="text-gray-500" aria-hidden>
          |
        </span>
        <Link href="/auth/sign-up" className="hover:underline">
          회원가입
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
