"use client";

import React from 'react';
import { motion } from 'framer-motion';
import CodePlayground from './code-playground';
import TutorialQuiz from './tutorial-quiz';

interface BlogInteractiveElementsProps {
  code: string;
  language: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  tutorialId: string;
}

export default function BlogInteractiveElements({
  code,
  language,
  questions,
  tutorialId,
}: BlogInteractiveElementsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="space-y-12 mt-8"
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border p-6 bg-card"
      >
        <h3 className="text-xl font-semibold mb-4">Interactive Code Example</h3>
        <p className="text-muted-foreground mb-4">
          Try modifying and running the code below to see how debugging works in practice:
        </p>
        <CodePlayground
          code={code}
          language={language}
          onRun={(code) => {
            console.log('Running code:', code);
            // Add your code execution logic here
          }}
        />
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-lg border p-6 bg-card"
      >
        <h3 className="text-xl font-semibold mb-4">Knowledge Check</h3>
        <p className="text-muted-foreground mb-4">
          Test your understanding of the concepts covered in this tutorial:
        </p>
        <TutorialQuiz
          questions={questions}
          tutorialId={tutorialId}
          onComplete={(score) => {
            console.log('Quiz completed with score:', score);
            // Add your completion logic here
          }}
        />
      </motion.section>
    </motion.div>
  );
} 