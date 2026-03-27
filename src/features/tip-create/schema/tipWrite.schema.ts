import { z } from 'zod';

export const tipWriteSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해 주세요.')
    .max(24, '제목은 최대 24자까지 입력할 수 있습니다.'),

  content: z
    .string()
    .min(1, '내용을 입력해 주세요.')
    .max(500, '내용은 최대 500자까지 입력할 수 있습니다.'),

  categories: z
    .array(z.string())
    .min(1, '카테고리를 최소 1개 선택해 주세요.')
    .max(5, '카테고리는 최대 5개까지 선택할 수 있습니다.'),
});

export type TipWriteSchema = z.infer<typeof tipWriteSchema>;
