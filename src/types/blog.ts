export interface Author {
  name: string;
  title: string;
  avatar?: string | null;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  date: string;
  updatedAt: string;
  category: BlogCategory;
  tags: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
}

export type BlogCategory = 
  | 'Web Development'
  | 'Mobile Development'
  | 'Data Science'
  | 'AI & Machine Learning'
  | 'DevOps'
  | 'Programming'
  | 'Career Development'
  | 'Technology';

export interface BlogSeries {
  id: string;
  title: string;
  description: string;
  posts: string[];
  coverImage: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  category: BlogCategory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
} 