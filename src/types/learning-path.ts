export interface LearningPathStep {
  id: string;
  title: string;
  description: string;
  tutorialId: string;
  order: number;
  requiredSteps?: string[]; // IDs of steps that must be completed first
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  steps: LearningPathStep[];
  estimatedHours: number;
} 