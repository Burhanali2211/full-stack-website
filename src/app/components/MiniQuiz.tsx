"use client";
import React, { useState } from 'react';

interface Question {
  q: string;
  options: string[];
  answer: string;
}

interface MiniQuizProps {
  questions: Question[];
  slug: string;
  step: number;
  onComplete: (slug: string, step: number) => void;
}

export const quizData = {
  'python-basics': [
    [{ q: "What does `print()` do?", options: ['A) Shows text', 'B) Adds numbers'], answer: 'A' }],
    [{ q: "What's a function?", options: ['A) Reusable code', 'B) A loop'], answer: 'A' }],
    [{ q: "Why `float()`?", options: ['A) For decimals', 'B) For text'], answer: 'A' }],
  ],
  'web-dev-101': [
    [{ q: "What's HTML?", options: ['A) Structure', 'B) Style'], answer: 'A' }],
    [{ q: "CSS does what?", options: ['A) Adds style', 'B) Runs code'], answer: 'A' }],
    [{ q: "JS adds?", options: ['A) Interactivity', 'B) Colors'], answer: 'A' }],
  ],
  'api-fun': [
    [{ q: "What's an API?", options: ['A) Data source', 'B) Design tool'], answer: 'A' }],
    [{ q: "Fetch does what?", options: ['A) Gets data', 'B) Styles page'], answer: 'A' }],
    [{ q: "`.then()` means?", options: ['A) After fetch', 'B) Before fetch'], answer: 'A' }],
  ],
};

export default function MiniQuiz({ questions, slug, step, onComplete }: MiniQuizProps) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState('');

  const handleAnswer = (qIndex: number, option: string) => {
    const isCorrect = questions[qIndex].answer === option;
    setSelected({ ...selected, [qIndex]: option });
    setFeedback(isCorrect ? 'Correct!' : 'Try again');
    if (isCorrect) {
      setTimeout(() => {
        onComplete(slug, step);
        setFeedback('');
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      {questions.map((q, i) => (
        <div key={i} className="p-2 rounded bg-gray-100 dark:bg-gray-800">
          <p>{q.q}</p>
          {q.options.map((opt, j) => (
            <label key={j} className="flex items-center gap-2">
              <input
                type="radio"
                name={`q-${i}`}
                value={opt}
                checked={selected[i] === opt}
                onChange={() => handleAnswer(i, opt)}
                className="radio radio-primary"
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      {feedback && (
        <p className={`p-2 rounded ${feedback === 'Correct!' ? 'text-green-500' : 'text-red-500'} animate-fade-in`}>
          {feedback}
        </p>
      )}
    </div>
  );
} 