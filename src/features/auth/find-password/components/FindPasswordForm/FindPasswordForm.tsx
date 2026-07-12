'use client';

import EmailRecoveryVerifyForm from '@/features/auth/components/EmailRecoveryVerifyForm/EmailRecoveryVerifyForm';

const FindPasswordForm = () => (
  <EmailRecoveryVerifyForm
    idPrefix="find-password"
    submitLabel="비밀번호 찾기"
  />
);

export default FindPasswordForm;
