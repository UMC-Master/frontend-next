import { z } from 'zod';

// 메시지 상수
export const ALERT_MESSAGES = {
  NICKNAME_REQUIRED: '닉네임을 입력해주세요.',
  NICKNAME_MAX_LENGTH: '닉네임은 10자 이하로 입력해주세요.',
  NICKNAME_PATTERN: '닉네임은 10자 이내만 가능합니다.',
  NICKNAME_DUPLICATE: '중복된 닉네임입니다.',
};

// Zod 스키마 정의
export const profileStepSchema = z.object({
  nickname: z
    .string()
    .min(1, ALERT_MESSAGES.NICKNAME_REQUIRED)
    .max(10, ALERT_MESSAGES.NICKNAME_MAX_LENGTH)
    .regex(/^[가-힣]*$/, ALERT_MESSAGES.NICKNAME_PATTERN),
});

// 타입 추론
export type ProfileStepForm = z.infer<typeof profileStepSchema>;
