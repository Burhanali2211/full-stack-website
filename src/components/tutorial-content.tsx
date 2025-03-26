"use client";

import { Suspense, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { EditorSkeleton, QuizSkeleton } from "./skeletons";
import { useTutorialStore } from "@/store/tutorial-store";
import { Card } from "./ui/card";

interface Quiz {
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
}

interface Tutorial {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  code?: string;
  quiz?: Quiz;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime?: number; // in minutes
  prerequisites?: string[];
}

interface TutorialProgress {
  completed: boolean;
  lastAttempt?: Date;
  quizScore?: number;
}

const DynamicTutorialQuiz = dynamic(
  () => import("@/components/tutorial-quiz"),
  {
    loading: () => <QuizSkeleton />,
    ssr: false,
  }
);

const DynamicCodeEditor = dynamic(
  () => import("@/components/code-editor").then((mod) => mod.CodeEditor),
  {
    loading: () => <EditorSkeleton />,
    ssr: false,
  }
);

interface TutorialContentProps {
  tutorial: Tutorial;
  initialProgress?: TutorialProgress;
}

export default function TutorialContent({ tutorial, initialProgress }: TutorialContentProps) {
  const { setProgress, getProgress } = useTutorialStore();
  const [progress, setLocalProgress] = useState<TutorialProgress>(
    initialProgress || { completed: false }
  );

  const handleQuizComplete = useCallback((correct: boolean, score?: number) => {
    const newProgress: TutorialProgress = {
      completed: correct,
      lastAttempt: new Date(),
      quizScore: score
    };
    setProgress(tutorial.id, newProgress);
    setLocalProgress(newProgress);
  }, [tutorial.id, setProgress]);

  const difficultyColor = useMemo(() => {
    switch (tutorial.difficulty) {
      case 'beginner':
        return 'text-green-500';
      case 'intermediate':
        return 'text-yellow-500';
      case 'advanced':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  }, [tutorial.difficulty]);

  const tags = useMemo(() => (
    <div className="flex flex-wrap gap-2 mb-4">
      {tutorial.tags.map((tag: string) => (
        <span
          key={tag}
          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  ), [tutorial.tags]);

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{tutorial.title}</h1>
            <div className="flex items-center gap-4 text-sm mb-4">
              <span className={difficultyColor}>
                {tutorial.difficulty.charAt(0).toUpperCase() + tutorial.difficulty.slice(1)}
              </span>
              {tutorial.estimatedTime && (
                <span className="text-muted-foreground">
                  Est. Time: {tutorial.estimatedTime} mins
                </span>
              )}
            </div>
          </div>
          {progress.completed && (
            <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-sm">
              Completed
            </span>
          )}
        </div>
        {tags}
        <p className="text-muted-foreground">{tutorial.description}</p>
      </Card>

      <Card className="p-6">
        <div className="prose dark:prose-invert max-w-none">
          {tutorial.content}
        </div>
      </Card>

      {tutorial.code && (
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Code Example</h2>
          <div className="h-[400px] border rounded-lg overflow-hidden">
            <Suspense fallback={<EditorSkeleton />}>
              <DynamicCodeEditor code={tutorial.code} readOnly />
            </Suspense>
          </div>
        </Card>
      )}

      {tutorial.quiz && (
        <Card className="p-6">
          <Suspense fallback={<QuizSkeleton />}>
            <DynamicTutorialQuiz
              questions={[
                {
                  question: tutorial.quiz.question,
                  options: tutorial.quiz.options,
                  correctAnswer: tutorial.quiz.answer,
                  explanation: tutorial.quiz.explanation || ""
                }
              ]}
              onComplete={handleQuizComplete}
            />
          </Suspense>
        </Card>
      )}
    </div>
  );
} 