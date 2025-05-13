import { CreateQuizDto } from '@/features/dto/create-quiz.dto';
import { SubmitQuizDto } from '@/features/dto/submit-quiz.dto';
import { generateQuiz, getCategories, submitQuiz } from '@/features/services/quiz-http.service';
import { Answer, Category, Question } from '@/features/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('quiz/fetchCategories', async () => {
  const response = await getCategories();
  return response;
});

export const createQuiz = createAsyncThunk('quiz/generateQuiz', async (body: CreateQuizDto) => {
  return await generateQuiz(body);
});

export const evalutateQuiz = createAsyncThunk('quiz/evaluateQuiz', async (body: SubmitQuizDto) => {
  return await submitQuiz(body);
});

export interface QuizState {
  categories: Category[] | null;
  questions: Question[];
  score: number;
  answers: Answer[];
  error: unknown | null;
}

const initialState: QuizState = {
  categories: [],
  questions: [],
  score: -1,
  answers: [],
  error: null,
};

const QuizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    resetQuiz(state) {
      state.categories = null;
      state.questions = [];
      state.score = -1;
      state.answers = [];
    },
    selectOption(state, action: PayloadAction<{ id: string; option: string }>) {
      const { id, option } = action.payload;
      const questionIndex = state.questions.findIndex(question => question.id === id);
      if (questionIndex !== -1) {
        const updatedQuestion = {
          ...state.questions[questionIndex],
          selected_answer: option,
        };
        state.questions[questionIndex] = updatedQuestion;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.questions = action.payload;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(evalutateQuiz.fulfilled, (state, action) => {
        state.score = action.payload.score;
        state.questions = action.payload.questions;
      })
      .addCase(evalutateQuiz.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { resetQuiz, selectOption } = QuizSlice.actions;

export default QuizSlice.reducer;
