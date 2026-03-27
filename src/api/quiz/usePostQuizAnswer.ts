'use client';

import { useMutation } from '@tanstack/react-query';
import { submitQuizAnswer } from './quiz.api';

export const usePostQuizAnswer = () =>
  useMutation({
    mutationFn: ({ quizId, isCorrect }: { quizId: number; isCorrect: boolean }) =>
      submitQuizAnswer(quizId, isCorrect),
  });
