'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ComboBox } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getDifficultyOptions } from '@/features/types';
import { useCategories } from '@/features/hooks/useCategories';
import { mapCategoriesToOptions } from '@/lib/utils';

export default function Page() {
  const {
    categories,
    category,
    setCategory,
    difficulty,
    handleDifficultyChange,
    numberOfQuestions,
    handleNumberOfQuestionsChange,
    handleGenerateQuiz,
    reset,
  } = useCategories();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create quiz</CardTitle>
          <CardDescription>Select a category and difficulty to start.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="w-full flex items-center gap-2 py-3">
              <div className="flex flex-col space-y-1.5">
                <ComboBox
                  label={'Select Category'}
                  options={mapCategoriesToOptions(categories)}
                  value={category}
                  onValueChange={setCategory}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <ComboBox
                  label={'Select Difficulty'}
                  options={getDifficultyOptions()}
                  value={difficulty}
                  onValueChange={handleDifficultyChange}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="numberOfQuestions">Number of Questions</Label>
              <Input
                id="numberOfQuestions"
                type="number"
                value={numberOfQuestions}
                onChange={handleNumberOfQuestionsChange}
                min={1}
                max={10}
                className="w-full"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={reset}>
            Cancel
          </Button>
          <Button
            disabled={category === '' || numberOfQuestions <= 0 || numberOfQuestions > 10}
            onClick={handleGenerateQuiz}
          >
            Create
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
