import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LearningPath, LearningPathStep } from '@/types/learning-path';

interface LearningPathProgress {
  completedSteps: string[]; // Step IDs
  currentStepId?: string;
  startedAt: Date;
  lastAccessedAt: Date;
}

interface LearningPathStore {
  paths: LearningPath[];
  progress: Record<string, LearningPathProgress>; // pathId -> progress
  
  // Path management
  addPath: (path: LearningPath) => void;
  removePath: (pathId: string) => void;
  updatePath: (pathId: string, updates: Partial<LearningPath>) => void;
  
  // Progress tracking
  startPath: (pathId: string) => void;
  completeStep: (pathId: string, stepId: string) => void;
  getAvailableSteps: (pathId: string) => LearningPathStep[];
  getProgress: (pathId: string) => LearningPathProgress | undefined;
  resetProgress: (pathId: string) => void;
}

export const useLearningPathStore = create<LearningPathStore>()(
  persist(
    (set, get) => ({
      paths: [],
      progress: {},

      addPath: (path) =>
        set((state) => ({
          paths: [...state.paths, path],
        })),

      removePath: (pathId) =>
        set((state) => ({
          paths: state.paths.filter((p) => p.id !== pathId),
          progress: Object.fromEntries(
            Object.entries(state.progress).filter(([id]) => id !== pathId)
          ),
        })),

      updatePath: (pathId, updates) =>
        set((state) => ({
          paths: state.paths.map((p) =>
            p.id === pathId ? { ...p, ...updates } : p
          ),
        })),

      startPath: (pathId) => {
        const path = get().paths.find((p) => p.id === pathId);
        if (!path) return;

        const firstStep = path.steps.find((s) => !s.requiredSteps?.length);
        if (!firstStep) return;

        set((state) => ({
          progress: {
            ...state.progress,
            [pathId]: {
              completedSteps: [],
              currentStepId: firstStep.id,
              startedAt: new Date(),
              lastAccessedAt: new Date(),
            },
          },
        }));
      },

      completeStep: (pathId, stepId) =>
        set((state) => {
          const progress = state.progress[pathId];
          if (!progress) return state;

          const path = state.paths.find((p) => p.id === pathId);
          if (!path) return state;

          // Find next available step
          const completedSteps = [...progress.completedSteps, stepId];
          const nextStep = path.steps.find(
            (s) =>
              !completedSteps.includes(s.id) &&
              (!s.requiredSteps?.length ||
                s.requiredSteps.every((req) => completedSteps.includes(req)))
          );

          return {
            progress: {
              ...state.progress,
              [pathId]: {
                ...progress,
                completedSteps,
                currentStepId: nextStep?.id,
                lastAccessedAt: new Date(),
              },
            },
          };
        }),

      getAvailableSteps: (pathId) => {
        const state = get();
        const path = state.paths.find((p) => p.id === pathId);
        const progress = state.progress[pathId];

        if (!path || !progress) return [];

        return path.steps.filter(
          (step) =>
            !progress.completedSteps.includes(step.id) &&
            (!step.requiredSteps?.length ||
              step.requiredSteps.every((req) =>
                progress.completedSteps.includes(req)
              ))
        );
      },

      getProgress: (pathId) => get().progress[pathId],

      resetProgress: (pathId) =>
        set((state) => ({
          progress: Object.fromEntries(
            Object.entries(state.progress).filter(([id]) => id !== pathId)
          ),
        })),
    }),
    {
      name: 'learning-path-store',
    }
  )
); 