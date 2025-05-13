type Submission = {
  question_id: string;
  selected_answer: string;
};

export type SubmitQuizDto = {
  answers: Submission[];
};
