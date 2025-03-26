import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TutorialProgress {
  completed: boolean;
  lastAttempt?: Date;
  quizScore?: number;
}

interface TutorialStore {
  progress: Record<string, TutorialProgress>;
  setProgress: (tutorialId: string, progress: TutorialProgress) => void;
  getProgress: (tutorialId: string) => TutorialProgress | undefined;
}

export const useTutorialStore = create<TutorialStore>()(
  persist(
    (set, get) => ({
      progress: {},
      setProgress: (tutorialId, progress) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [tutorialId]: progress,
          },
        })),
      getProgress: (tutorialId) => get().progress[tutorialId],
    }),
    {
      name: 'tutorial-store',
    }
  )
); 