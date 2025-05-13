import { useAppDispatch } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';
import { Difficulty } from '@/features/types';
import { useSelector } from 'react-redux';
import { AppState } from '@/features/store/store';
import { createQuiz, fetchCategories, resetQuiz } from '@/features/store/slices/quizSlice';
import { useRouter } from 'next/navigation';

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { categories, questions } = useSelector((state: AppState) => state.quiz);
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (questions.length > 0) {
      router.push('/quiz');
    }
  }, [questions, router]);

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value.toLowerCase() as Difficulty);
  };

  const handleNumberOfQuestionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value >= 1 && value <= 10) {
      setNumberOfQuestions(value);
    }
  };

  const handleGenerateQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(
      createQuiz({
        categoryName: category,
        difficultyLevel: difficulty,
        numberOfQuestions: numberOfQuestions,
      }),
    );
  };

  const reset = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCategory('');
    setDifficulty(Difficulty.EASY);
    setNumberOfQuestions(0);
    dispatch(resetQuiz());
  };

  return {
    categories,
    category,
    setCategory,
    difficulty,
    handleDifficultyChange,
    numberOfQuestions,
    handleNumberOfQuestionsChange,
    handleGenerateQuiz,
    reset,
  };
};
