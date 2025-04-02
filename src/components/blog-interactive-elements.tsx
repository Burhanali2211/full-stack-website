"use client";

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface BlogInteractiveElementsProps {
  code: string;
  language: string;
  questions: Question[];
  tutorialId: string;
}

export default function BlogInteractiveElements({
  code,
  language,
  questions,
  tutorialId,
}: BlogInteractiveElementsProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [showExplanations, setShowExplanations] = useState<{ [key: string]: boolean }>({});

  const handleAnswerSubmit = (questionId: string) => {
    setShowExplanations((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  const isAnswerCorrect = (questionId: string) => {
    const question = questions.find((q) => q.id === questionId);
    return question && selectedAnswers[questionId] === question.correctAnswer;
  };

  return (
    <div className="space-y-8">
      {/* Code Display Section */}
      <Card className="p-4">
        <div className="rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      </Card>

      {/* Quiz Section */}
      <div className="space-y-6">
        {questions.map((question) => (
          <Card key={question.id} className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{question.question}</h3>
              
              <RadioGroup
                value={selectedAnswers[question.id]?.toString()}
                onValueChange={(value) =>
                  setSelectedAnswers((prev) => ({
                    ...prev,
                    [question.id]: parseInt(value),
                  }))
                }
              >
                <div className="space-y-2">
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={index.toString()} id={`${question.id}-${index}`} />
                      <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <div className="space-y-4">
                <Button
                  onClick={() => handleAnswerSubmit(question.id)}
                  disabled={selectedAnswers[question.id] === undefined}
                >
                  Submit Answer
                </Button>

                {showExplanations[question.id] && (
                  <Alert
                    variant={isAnswerCorrect(question.id) ? "default" : "destructive"}
                    className="mt-4"
                  >
                    <div className="flex items-center gap-2">
                      {isAnswerCorrect(question.id) ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <XCircle className="h-5 w-5" />
                      )}
                      <AlertTitle>
                        {isAnswerCorrect(question.id)
                          ? "Correct!"
                          : "Not quite right"}
                      </AlertTitle>
                    </div>
                    <AlertDescription className="mt-2">
                      {question.explanation}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 