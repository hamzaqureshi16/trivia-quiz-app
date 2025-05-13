export type Question = {
  id: string;
  question: string;
  options: string[];
  correct_answer?: string;
  selected_answer?: string;
};
