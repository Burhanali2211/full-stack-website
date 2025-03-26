export interface QuizQuestion {
  q: string;
  options: string[];
  answer: string;
}

export interface QuizSet {
  [key: string]: QuizQuestion[][];
}

export interface TutorialSection {
  id: string;
  title: string;
  content: string;
  description: string;
  isCompleted?: boolean;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  image: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  prerequisites: string[];
  duration: number; // in minutes
  chapters: number;
  students: number;
  rating: number;
  publishedAt: string;
  updatedAt: string;
  sections: TutorialSection[];
  whatYouLearn: string[];
  hasQuiz: boolean;
  tags?: string[]; // Optional tags property
}

export interface TutorialHeroProps {
  title: string;
  description: string;
  image: string;
  difficulty: Tutorial['difficulty'];
  category: string;
}

export interface TutorialStatsProps {
  students: number;
  chapters: number;
  duration: number;
  rating: number;
}

export interface TutorialDetailsProps {
  publishedAt: string;
  updatedAt: string;
  duration: number;
}

export interface SidebarProps {
  difficulty: Tutorial['difficulty'];
  category: string;
  prerequisites: string[];
  onStartLearning: () => void;
}

export interface WhatYouLearnProps {
  points: string[];
}

export interface TutorialSectionProps extends TutorialSection {
  onComplete: (id: string) => void;
}

export interface QuizSectionProps {
  tutorialId: string;
  isCompleted: boolean;
  onComplete: () => void;
}

export interface CourseContentProps {
  sections: TutorialSection[];
  onSectionComplete: (id: string) => void;
}

export interface ProgressState {
  [sectionId: string]: boolean;
}