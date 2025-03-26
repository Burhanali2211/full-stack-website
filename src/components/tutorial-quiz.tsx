"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Card } from "./ui/card";

interface TutorialQuizProps {
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
  }[];
  onComplete?: (correct: boolean, score?: number) => void;
}

export default function TutorialQuiz({ questions, onComplete }: TutorialQuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === questions[0].correctAnswer;
    const score = correct ? 100 : 0;
    onComplete?.(correct, score);
    setIsSubmitted(true);
  };

  const currentQuestion = questions[0]; // Currently supporting single question

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Quiz</h3>
        <p className="text-lg mb-6">{currentQuestion.question}</p>

        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value: string) => setSelectedAnswer(parseInt(value))}
          className="space-y-4"
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={index.toString()}
                id={`option-${index}`}
                disabled={isSubmitted}
              />
              <Label
                htmlFor={`option-${index}`}
                className={
                  isSubmitted
                    ? index === currentQuestion.correctAnswer
                      ? "text-green-500"
                      : index === selectedAnswer
                      ? "text-red-500"
                      : ""
                    : ""
                }
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {!isSubmitted ? (
        <Button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="w-full"
        >
          Submit Answer
        </Button>
      ) : (
        <Card className="p-4 mt-4">
          <p className={selectedAnswer === currentQuestion.correctAnswer ? "text-green-500" : "text-red-500"}>
            {selectedAnswer === currentQuestion.correctAnswer
              ? "Correct! Well done!"
              : "Incorrect. Try again!"}
          </p>
          {currentQuestion.explanation && (
            <p className="mt-2 text-muted-foreground">
              {currentQuestion.explanation}
            </p>
          )}
        </Card>
      )}
    </div>
  );
} 