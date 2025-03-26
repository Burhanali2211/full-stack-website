export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  created_at: string;
  updated_at: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  progress_percentage: number;
  last_accessed_at: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardData {
  user: User;
  courses: Course[];
  progress: UserProgress[];
} 