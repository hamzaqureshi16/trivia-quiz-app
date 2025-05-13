export type EvaluateResposne = {
  questions: {
    selected_answer: string;
    correct_answer: string;
    id: string;
    question: string;
    options: string[];
  }[];
  score: number;
};
