import { z } from 'zod';

// 메시지 상수 업데이트
export const ALERT_MESSAGES = {
  PASSWORD_REQUIRED: '비밀번호를 입력해주세요.',
  PASSWORD_CONFIRM_REQUIRED: '비밀번호를 다시 입력해주세요.',
  PASSWORD_MIN_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
  PASSWORD_MAX_LENGTH: '비밀번호는 15자 이내여야 합니다.',
  PASSWORD_PATTERN: '영문, 숫자, 특수문자를 모두 포함해야 합니다.',
  PASSWORD_MISMATCH: '비밀번호가 동일하지 않습니다.',
};

const passwordPatternRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).*$/;

// Zod 스키마 정의
export const passwordStepSchema = z
  .object({
    password: z
      .string()
      .min(1, ALERT_MESSAGES.PASSWORD_REQUIRED)
      .min(8, ALERT_MESSAGES.PASSWORD_MIN_LENGTH)
      .max(15, ALERT_MESSAGES.PASSWORD_MAX_LENGTH)
      .regex(passwordPatternRegex, ALERT_MESSAGES.PASSWORD_PATTERN),
    passwordConfirm: z
      .string()
      .min(1, ALERT_MESSAGES.PASSWORD_CONFIRM_REQUIRED),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: ALERT_MESSAGES.PASSWORD_MISMATCH,
    path: ['passwordConfirm'],
  });

export type PasswordStepForm = z.infer<typeof passwordStepSchema>;
