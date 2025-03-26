"use client";

import { useState } from 'react';

const hints = {
  'python-basics-step1': 'Try `print("Hello")` to display a message!',
  'python-basics-step2': 'Define the function like `def add(a, b): return a + b`.',
  'python-basics-step3': 'Use `float(input())` to get numbers from users.',
  'web-dev-101-step1': 'Start with `<h1>Hello</h1>` in your HTML.',
  'web-dev-101-step2': 'Try changing `lightblue` to another color!',
  'web-dev-101-step3': 'Click the alert to test interactivity.',
  'api-fun-step1': 'Define the API URL clearly, like a constant.',
  'api-fun-step2': 'Use `fetch()` to request data from the API.',
  'api-fun-step3': 'Chain `.then()` to process the response.',
};

type HintKey = keyof typeof hints;

interface ChatbotProps {
  slug: string;
  step: number;
}

export default function Chatbot({ slug, step }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hintKey = `${slug}-step${step}` as HintKey;
  const hint = hints[hintKey] || 'Keep trying, or review the step!';

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-sm btn-warning hover:glow transition-transform duration-200"
      >
        Stuck?
      </button>
      {isOpen && (
        <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 rounded animate-fade-in">
          <p className="text-gray-700 dark:text-gray-300">{hint}</p>
        </div>
      )}
    </div>
  );
} 