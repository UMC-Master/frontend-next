'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchQuizData, QuizResponse } from './quiz.api';

export const useQuizList = () =>
  useQuery<QuizResponse, Error>({
    queryKey: ['quiz'],
    queryFn: fetchQuizData,
    refetchOnWindowFocus: false,
  });
