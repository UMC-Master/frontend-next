'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const formValid = emailValid && password.length > 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (formValid) router.push('/admin');
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="flex w-[636px] flex-col items-center gap-12">
        <div className="flex w-[380px] flex-col items-center gap-10">
          <Image src="/admin/login-logo.svg" alt="hm" width={281} height={220} priority />
          <h1 className="w-full text-center text-[32px] font-bold leading-[1.3] tracking-[-0.01em] text-main-500">
            관리자 페이지
          </h1>
        </div>

        <div className="flex w-full flex-col gap-8">
          <label className="flex flex-col gap-5 text-[22px] font-semibold text-gray-1000">
            이메일
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="이메일을 입력해 주세요"
              aria-invalid={submitted && !emailValid}
              className="h-16 rounded-lg border border-gray-400 bg-gray-100 px-3 text-lg font-semibold outline-none placeholder:text-gray-400 focus:border-main-500"
            />
            {submitted && !emailValid && (
              <span className="-mt-3 text-sm font-normal text-red">올바른 이메일을 입력해 주세요.</span>
            )}
          </label>

          <label className="flex flex-col gap-5 text-[22px] font-semibold text-gray-1000">
            비밀번호
            <span className="flex h-16 items-center rounded-lg border border-gray-400 bg-gray-100 px-3 focus-within:border-main-500">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호를 입력해 주세요"
                aria-invalid={submitted && !password}
                className="h-full flex-1 bg-transparent text-lg font-semibold outline-none placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="h-10 px-2 text-sm font-medium text-gray-700"
              >
                {showPassword ? '숨김' : '보기'}
              </button>
            </span>
            {submitted && !password && (
              <span className="-mt-3 text-sm font-normal text-red">비밀번호를 입력해 주세요.</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          disabled={!formValid}
          className="h-[72px] w-full rounded-[20px] bg-main-500 text-[22px] font-bold text-gray-100 disabled:bg-gray-200 disabled:text-gray-500"
        >
          로그인하기
        </button>
      </form>
    </main>
  );
}
