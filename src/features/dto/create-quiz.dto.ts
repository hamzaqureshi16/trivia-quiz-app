import { Difficulty } from '@/features/types';

export type CreateQuizDto = {
  categoryName: string;
  difficultyLevel: Difficulty;
  numberOfQuestions: number;
};
