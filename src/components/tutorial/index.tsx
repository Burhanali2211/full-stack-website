"use client";

import { Suspense } from 'react';
import { Tutorial } from '@/types/tutorial';
import { useTutorialProgress } from '@/hooks/use-tutorial-progress';
import { TutorialHero } from './tutorial-hero';
import { TutorialStats } from './tutorial-stats';
import { CourseContent } from './course-content';
import { Sidebar } from './sidebar';
import { WhatYouLearn } from './what-you-learn';
import { LoadingFallback } from './loading-fallback';

interface TutorialContentProps {
  tutorial: Tutorial;
}

export function TutorialContent({ tutorial }: TutorialContentProps) {
  const {
    progress,
    isLoading,
    completeSection,
    resetProgress,
    getCompletionPercentage,
  } = useTutorialProgress(tutorial.id, tutorial.sections);

  if (isLoading) {
    return <LoadingFallback />;
  }

  const handleStartLearning = () => {
    // Scroll to course content
    document.getElementById('course-content')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className="space-y-8">
      <TutorialHero
        title={tutorial.title}
        description={tutorial.description}
        image={tutorial.image}
        difficulty={tutorial.difficulty}
        category={tutorial.category}
      />

      <TutorialStats
        students={tutorial.students}
        chapters={tutorial.chapters}
        duration={tutorial.duration}
        rating={tutorial.rating}
      />

      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-8">
          <WhatYouLearn points={tutorial.whatYouLearn} />

          <Suspense fallback={<LoadingFallback />}>
            <div id="course-content">
              <CourseContent
                sections={tutorial.sections.map((section) => ({
                  ...section,
                  isCompleted: progress[section.id],
                }))}
                onSectionComplete={completeSection}
              />
            </div>
          </Suspense>
        </div>

        <div className="hidden md:block">
          <Sidebar
            difficulty={tutorial.difficulty}
            category={tutorial.category}
            prerequisites={tutorial.prerequisites}
            onStartLearning={handleStartLearning}
          />
        </div>
      </div>
    </div>
  );
} 