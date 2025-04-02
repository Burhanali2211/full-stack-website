import { LearningPath as TutorialLearningPath } from './tutorial';

export interface LearningPathStep {
  id: string;
  title: string;
  description: string;
  tutorialId: string;
  order: number;
  requiredSteps?: string[]; // IDs of steps that must be completed first
}

// For backward compatibility
export interface LearningPathLegacy {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  steps: LearningPathStep[];
  estimatedHours: number;
}

// Re-export the new LearningPath interface
export type LearningPath = TutorialLearningPath; 