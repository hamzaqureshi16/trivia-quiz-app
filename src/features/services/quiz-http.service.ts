import axiosInstance from '@/lib/axios';
import { CreateQuizDto } from '@/features/dto/create-quiz.dto';
import { Category, Question } from '@/features/types';
import { SubmitQuizDto } from '../dto/submit-quiz.dto';

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosInstance.get('/category/all');
  return response.data;
};

export const generateQuiz = async (body: CreateQuizDto): Promise<Question[]> => {
  const response = await axiosInstance.post('/quiz/create', body);
  return response.data;
};

export const submitQuiz = async (body: SubmitQuizDto) => {
  const response = await axiosInstance.post('/quiz/submit', body);
  return response.data;
};
