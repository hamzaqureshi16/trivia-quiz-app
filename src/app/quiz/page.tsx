'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { useQuestions } from '@/features/hooks/useQuestions';
import { Question } from '@/features/types';

export default function Page() {
  const { questions, score, handleSelectOptions, handleSubmitQuiz, reset } = useQuestions();
  const router = useRouter();
  const navigateToHome = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    reset();
    router.push('/');
  };

  const submitDisabled = questions.some((question: Question) => {
    return question?.selected_answer === undefined;
  });

  const selectBadgeVariant = (
    question: Question,
    option: string,
  ): 'correct' | 'incorrect' | 'outline' => {
    const { selected_answer, correct_answer } = question;

    if (!correct_answer) {
      return option === selected_answer ? 'correct' : 'outline';
    }

    if (option === correct_answer) {
      return 'correct';
    }

    if (option === selected_answer && selected_answer !== correct_answer) {
      return 'incorrect';
    }

    return 'outline';
  };

  const getScoreColor = (): string => {
    if (score <= 1) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        {questions.length > 0 ? (
          <>
            <CardContent>
              <form>
                <div className="w-full grid items-center gap-5">
                  {questions.map(question => {
                    return (
                      <>
                        <h4>{question.question}</h4>
                        <div className="flex gap-2">
                          {question.options.map((option: string, index) => (
                            <Badge
                              onClick={event => {
                                event.preventDefault();
                                handleSelectOptions(question.id, option);
                              }}
                              key={index}
                              variant={selectBadgeVariant(question, option)}
                            >
                              {option}
                            </Badge>
                          ))}
                        </div>
                      </>
                    );
                  })}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {score < 0 ? (
                <>
                  <Button variant="outline" onClick={navigateToHome}>
                    Cancel
                  </Button>
                  <Button disabled={submitDisabled} onClick={handleSubmitQuiz}>
                    Submit
                  </Button>
                </>
              ) : (
                <>
                  <Badge className={getScoreColor()}>{score}</Badge>
                  <Button className="absolute bottom-4 right-4" onClick={navigateToHome}>
                    Create a quiz
                  </Button>
                </>
              )}
            </CardFooter>
          </>
        ) : (
          <div className="w-full flex items-center justify-center">
            <h4 className="text-2xl">No questions available</h4>
            <Button className="absolute bottom-4 right-4" onClick={navigateToHome}>
              Create a quiz
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
