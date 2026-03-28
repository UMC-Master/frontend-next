'use client';

import EmailRecoveryVerifyForm from '@/features/auth/components/EmailRecoveryVerifyForm/EmailRecoveryVerifyForm';

const FindEmailForm = () => (
  <EmailRecoveryVerifyForm idPrefix="find-email" submitLabel="이메일 찾기" />
);

export default FindEmailForm;
