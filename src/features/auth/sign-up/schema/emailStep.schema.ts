import { z } from 'zod';

export const ALERT_MESSAGES = {
  EMAIL_REQUIRED: '이메일을 입력해주세요.',
  EMAIL_INVALID: '올바른 이메일 형식이 아닙니다.',
  CODE_REQUIRED: '인증번호를 입력해주세요.',
  CODE_LENGTH: '인증번호는 6자리입니다.',
  REQUEST_SUCCESS: '인증번호가 발송되었습니다.',
  REQUEST_FAILURE: '인증번호 발송에 실패했습니다.',
  VERIFY_SUCCESS: '✓ 인증이 완료되었습니다.',
  VERIFY_FAILURE: '올바르지 않은 인증번호 입니다.',
};

export const emailStepSchema = z.object({
  email: z
    .string()
    .min(1, ALERT_MESSAGES.EMAIL_REQUIRED)
    .pipe(z.email(ALERT_MESSAGES.EMAIL_INVALID)),
  verificationCode: z.string().regex(/^[0-9]{6}$/, ALERT_MESSAGES.CODE_LENGTH),
});

export type EmailStepForm = z.infer<typeof emailStepSchema>;
