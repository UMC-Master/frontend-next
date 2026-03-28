'use client';

import { useState } from 'react';
import clsx from 'clsx';
import LargeButton from '@/components/Button/LargeButton/LargeButton';
import SmallButton from '@/components/Button/SmallButton/SmallButton';
import { authTextFieldClassName } from '@/features/auth/style/authTextField';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidEmail = (value: string) => EMAIL_PATTERN.test(value.trim());

export interface EmailRecoveryVerifyFormProps {
  /** 하단 고정 Primary 버튼 문구 */
  submitLabel: string;
  /** label/input id 접두사 (페이지별 고유) */
  idPrefix: string;
}

const EmailRecoveryVerifyForm = ({
  submitLabel,
  idPrefix,
}: EmailRecoveryVerifyFormProps) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const emailId = `${idPrefix}-email`;
  const codeId = `${idPrefix}-code`;
  const codeErrorId = `${idPrefix}-code-error`;

  const emailTrimmed = email.trim();
  const emailOk = isValidEmail(emailTrimmed);

  const handleRequestCode = async () => {
    if (!emailOk) return;
    setIsRequesting(true);
    setCodeError(false);
    try {
      // TODO: 인증번호 발송 API ({submitLabel} 플로우)
      console.log(`${submitLabel} 인증 요청:`, emailTrimmed);
      setCodeSent(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code.trim()) return;
    setIsVerifying(true);
    setCodeError(false);
    try {
      // TODO: 인증번호 검증 API — 실패 시 setCodeError(true)
      const ok = /^\d{6}$/.test(code.trim());
      if (!ok) {
        setCodeError(true);
        return;
      }
      setIsVerified(true);
    } catch (e) {
      console.error(e);
      setCodeError(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const emailRowInputClass = clsx(
    authTextFieldClassName(false),
    'min-w-0 flex-1 basis-0 !w-auto max-w-[264px]',
  );

  return (
    <form
      className="flex w-full max-w-[380px] flex-col items-stretch"
      onSubmit={e => e.preventDefault()}
    >
      <div className="flex w-full min-w-0 flex-col gap-6 pb-24">
        <div className="flex w-full min-w-0 flex-col gap-2">
          <label htmlFor={emailId} className="text-title3 text-gray-1000">
            이메일
          </label>
          <div className="flex w-full min-w-0 items-center gap-2">
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="이메일을 입력해 주세요."
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isVerified}
              className={emailRowInputClass}
            />
            <SmallButton
              text="인증하기"
              onClick={handleRequestCode}
              disabled={!emailOk || isRequesting || isVerified}
            />
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-col gap-2">
          <label htmlFor={codeId} className="text-title3 text-gray-1000">
            인증번호
          </label>
          <div className="flex w-full min-w-0 items-start gap-2">
            <div className="flex min-w-0 flex-1 basis-0 max-w-[264px] flex-col gap-1">
              <input
                id={codeId}
                name="code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="인증번호를 입력해 주세요"
                value={code}
                onChange={e => {
                  setCode(e.target.value);
                  setCodeError(false);
                }}
                maxLength={6}
                disabled={!codeSent || isVerified || isVerifying}
                className={clsx(
                  authTextFieldClassName(codeError),
                  'min-w-0 max-w-full',
                )}
                aria-invalid={codeError}
                aria-describedby={codeError ? codeErrorId : undefined}
              />
              {codeError ? (
                <p
                  id={codeErrorId}
                  className="text-caption1 text-red"
                  role="alert"
                >
                  올바르지 않은 인증번호 입니다.
                </p>
              ) : null}
            </div>
            <SmallButton
              text="인증완료"
              onClick={handleVerifyCode}
              disabled={
                !codeSent || !code.trim() || isVerified || isVerifying
              }
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-10 flex justify-center ps-[max(1.5rem,env(safe-area-inset-left,0px))] pe-[max(1.5rem,env(safe-area-inset-right,0px))]">
        <div className="pointer-events-auto w-full max-w-[380px]">
          <LargeButton
            text={submitLabel}
            className="text-title3"
            disabled={!isVerified}
          />
        </div>
      </div>
    </form>
  );
};

export default EmailRecoveryVerifyForm;
