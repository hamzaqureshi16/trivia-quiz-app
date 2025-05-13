import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../store/store';
import { evalutateQuiz, resetQuiz, selectOption } from '../store/slices/quizSlice';
import { SubmitQuizDto } from '../dto/submit-quiz.dto';

export const useQuestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, score } = useSelector((state: AppState) => state.quiz);

  const handleSelectOptions = (id: string, option: string) => {
    dispatch(selectOption({ id, option }));
  };

  const handleSubmitQuiz = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const body: SubmitQuizDto = {
      answers: questions.map(question => ({
        question_id: question.id,
        selected_answer: question.selected_answer || '',
      })),
    };

    dispatch(evalutateQuiz(body));
  };

  const reset = () => {
    dispatch(resetQuiz());
  };

  return {
    questions,
    score,
    handleSelectOptions,
    handleSubmitQuiz,
    reset,
  };
};
