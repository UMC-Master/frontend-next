import { fetcher } from '@/lib/api/fetcher';

export interface QuizData {
  id: number;
  question: string;
  answer: number;
  description: string;
}

export interface QuizResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    response: {
      number_of_quiz: number;
      quiz_list: QuizData[];
    };
  };
}

export interface SubmitQuizResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    message: string;
  };
}

export const fetchQuizData = () =>
  fetcher.get<QuizResponse>('/quizzes');

export const submitQuizAnswer = (quizId: number, isCorrect: boolean) =>
  fetcher.post<SubmitQuizResponse>(`/quizzes/${quizId}`, { isCorrect }, { auth: true });
