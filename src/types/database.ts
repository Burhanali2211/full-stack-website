// Basic database types for the application
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  name: string;
  email: string;
  image?: string;
}

export interface Tutorial extends BaseEntity {
  title: string;
  description: string;
  content: string;
  published: boolean;
  authorId: string;
  category: string;
  tags: string[];
}

export interface Comment extends BaseEntity {
  content: string;
  authorId: string;
  tutorialId: string;
}

export interface Like extends BaseEntity {
  userId: string;
  tutorialId: string;
}

export interface Bookmark extends BaseEntity {
  userId: string;
  tutorialId: string;
}