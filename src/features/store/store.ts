import { configureStore } from '@reduxjs/toolkit';
import quizReducer, { QuizState } from '@/features/store/slices/quizSlice';

export interface AppState {
  quiz: QuizState;
}
export const makeStore = () => {
  return configureStore({
    reducer: {
      quiz: quizReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
