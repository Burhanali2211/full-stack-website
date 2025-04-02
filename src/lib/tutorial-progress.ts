// Tutorial progress service for managing progress with localStorage

// Type definitions
type TutorialProgressData = {
  [tutorialId: string]: number;  // Progress percentage (0-100)
};

// Local storage keys
const STORAGE_KEYS = {
  PROGRESS: 'tutorial-progress',
  LAST_ACTIVITY: 'last-activity',
  STREAK_COUNT: 'streak-count',
  STREAK_DATE: 'streak-date',
};

/**
 * Get all tutorial progress data
 */
export const getTutorialProgress = (): TutorialProgressData => {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Failed to get tutorial progress:', error);
    return {};
  }
};

/**
 * Get progress for a specific tutorial
 */
export const getTutorialProgressById = (tutorialId: string): number => {
  const allProgress = getTutorialProgress();
  return allProgress[tutorialId] || 0;
};

/**
 * Update progress for a specific tutorial
 */
export const updateTutorialProgress = (tutorialId: string, progress: number): void => {
  if (typeof window === 'undefined') return;
  
  try {
    // Get current progress
    const allProgress = getTutorialProgress();
    
    // Update progress
    allProgress[tutorialId] = Math.min(Math.max(0, progress), 100);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(allProgress));
    
    // Update last activity
    updateLastActivity();
  } catch (error) {
    console.error('Failed to update tutorial progress:', error);
  }
};

/**
 * Calculate total XP based on progress
 */
export const calculateTotalXP = (): number => {
  const allProgress = getTutorialProgress();
  
  return Object.values(allProgress).reduce((total, progress) => {
    // Each 10% progress gives 25 XP
    return total + Math.floor(progress / 10) * 25;
  }, 0);
};

/**
 * Update last activity date and handle streak calculation
 */
export const updateLastActivity = (): void => {
  if (typeof window === 'undefined') return;
  
  const today = new Date();
  const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
  
  // Save current activity date
  localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, todayString);
  
  // Get previous streak info
  const lastStreakDate = localStorage.getItem(STORAGE_KEYS.STREAK_DATE);
  let streakCount = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK_COUNT) || '0', 10);
  
  // Handle streak logic
  if (lastStreakDate) {
    const lastDate = new Date(lastStreakDate);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    
    const isYesterday = lastDate.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0];
    const isToday = lastDate.toISOString().split('T')[0] === todayString;
    
    if (isToday) {
      // Already counted for today, do nothing
    } else if (isYesterday) {
      // Continued streak
      streakCount += 1;
      localStorage.setItem(STORAGE_KEYS.STREAK_COUNT, streakCount.toString());
      localStorage.setItem(STORAGE_KEYS.STREAK_DATE, todayString);
    } else {
      // Streak broken
      streakCount = 1; // Reset to 1 for today
      localStorage.setItem(STORAGE_KEYS.STREAK_COUNT, '1');
      localStorage.setItem(STORAGE_KEYS.STREAK_DATE, todayString);
    }
  } else {
    // First day streak
    localStorage.setItem(STORAGE_KEYS.STREAK_COUNT, '1');
    localStorage.setItem(STORAGE_KEYS.STREAK_DATE, todayString);
  }
};

/**
 * Get current streak count
 */
export const getCurrentStreak = (): number => {
  if (typeof window === 'undefined') return 0;
  
  // Get streak count
  const streakCount = parseInt(localStorage.getItem(STORAGE_KEYS.STREAK_COUNT) || '0', 10);
  
  // Check if streak is still valid (within last day)
  const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
  if (!lastActivity) return 0;
  
  const lastDate = new Date(lastActivity);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  const isRecent = 
    lastDate.toISOString().split('T')[0] === today.toISOString().split('T')[0] || 
    lastDate.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0];
  
  return isRecent ? streakCount : 0;
}; 