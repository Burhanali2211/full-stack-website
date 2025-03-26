"use client";

import { useState, useEffect, useCallback } from 'react';
import { ProgressState, TutorialSection } from '@/types/tutorial';

export function useTutorialProgress(tutorialId: string, sections: TutorialSection[]) {
  const [progress, setProgress] = useState<ProgressState>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(`tutorial-progress-${tutorialId}`);
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      } else {
        // Initialize with all sections uncompleted
        const initialProgress = sections.reduce((acc, section) => {
          acc[section.id] = false;
          return acc;
        }, {} as ProgressState);
        setProgress(initialProgress);
      }
    } catch (error) {
      console.error('Error loading tutorial progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [tutorialId, sections]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(
          `tutorial-progress-${tutorialId}`,
          JSON.stringify(progress)
        );
      } catch (error) {
        console.error('Error saving tutorial progress:', error);
      }
    }
  }, [tutorialId, progress, isLoading]);

  const completeSection = useCallback((sectionId: string) => {
    setProgress((prev) => ({
      ...prev,
      [sectionId]: true,
    }));
  }, []);

  const resetProgress = useCallback(() => {
    const resetState = sections.reduce((acc, section) => {
      acc[section.id] = false;
      return acc;
    }, {} as ProgressState);
    setProgress(resetState);
  }, [sections]);

  const getCompletionPercentage = useCallback(() => {
    const completedSections = Object.values(progress).filter(Boolean).length;
    return Math.round((completedSections / sections.length) * 100);
  }, [progress, sections]);

  return {
    progress,
    isLoading,
    completeSection,
    resetProgress,
    getCompletionPercentage,
  };
}

export function useProgress() {
  const [completedTutorials, setCompletedTutorials] = useState<string[]>([]);

  const setCompleted = (tutorialId: string) => {
    setCompletedTutorials(prev => 
      prev.includes(tutorialId) ? prev : [...prev, tutorialId]
    );
  };

  return {
    completedTutorials,
    setCompleted,
  };
} 