import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogCategory, BlogSeries } from '@/types/blog';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const SERIES_DIR = path.join(process.cwd(), 'src/content/series');

const posts: BlogPost[] = [
  {
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    description: 'Learn how to build modern web applications with Next.js, React, and TypeScript.',
    content: `
# Getting Started with Next.js

Next.js is a powerful React framework that makes building web applications a breeze. In this post, we'll explore the basics of Next.js and how to get started with your first project.

## Why Next.js?

Next.js provides several key features out of the box:

- Server-side rendering
- Static site generation
- API routes
- File-based routing
- Built-in CSS and Sass support
- Fast refresh
- TypeScript support
- And much more!

## Creating Your First Project

To create a new Next.js project, run:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Project Structure

A typical Next.js project structure looks like this:

\`\`\`
my-app/
  ├── app/
  │   ├── layout.tsx
  │   └── page.tsx
  ├── public/
  │   └── images/
  ├── components/
  │   └── ui/
  ├── lib/
  ├── styles/
  └── package.json
\`\`\`

## Next Steps

Now that you have your project set up, you can start building your application. Here are some things to try:

1. Create new pages in the \`app\` directory
2. Add some components
3. Style your application with CSS
4. Deploy your app to Vercel

Happy coding! 🚀
    `,
    image: '/blog/nextjs-intro.jpg',
    author: {
      name: 'John Doe',
      title: 'Web Developer',
      avatar: '/authors/john-doe.svg'
    },
    date: '2024-03-15',
    updatedAt: '2024-03-15',
    category: 'Web Development',
    tags: ['Next.js', 'React', 'Web Development'],
    seo: {
      title: 'Getting Started with Next.js',
      description: 'Learn how to build modern web applications with Next.js, React, and TypeScript.',
      keywords: ['Next.js', 'React', 'Web Development'],
      ogImage: '/blog/nextjs-intro.jpg'
    }
  },
  // Add more blog posts here
];

function validateImagePath(imagePath: string | undefined | null): string | null {
  if (!imagePath) return null;
  if (typeof imagePath !== 'string') return null;
  if (imagePath.trim() === '') return null;
  return imagePath;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(BLOG_DIR);
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Validate image paths
      const avatar = validateImagePath(data.author?.avatar);
      const image = validateImagePath(data.image);
      const ogImage = validateImagePath(data.seo?.ogImage);

      return {
        slug: file.replace('.mdx', ''),
        content,
        ...data,
        author: {
          ...data.author,
          avatar: avatar || '/authors/default-avatar.svg',
        },
        image: image || '/blog/default-cover.svg',
        seo: {
          ...data.seo,
          ogImage: ogImage || '/blog/default-cover.svg',
        },
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Validate image paths
    const avatar = validateImagePath(data.author?.avatar);
    const image = validateImagePath(data.image);
    const ogImage = validateImagePath(data.seo?.ogImage);

    return {
      slug,
      content,
      ...data,
      author: {
        ...data.author,
        avatar: avatar || '/authors/default-avatar.svg',
      },
      image: image || '/blog/default-cover.svg',
      seo: {
        ...data.seo,
        ogImage: ogImage || '/blog/default-cover.svg',
      },
    } as BlogPost;
  } catch (error) {
    return null;
  }
}

export async function getBlogSeries(): Promise<BlogSeries[]> {
  const files = fs.readdirSync(SERIES_DIR);
  const series = files
    .filter((file) => file.endsWith('.json'))
    .map((file) => {
      const filePath = path.join(SERIES_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent) as BlogSeries;
    });

  return series;
}

export async function getBlogPostsByCategory(category: BlogCategory): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts.filter((post) => post.category === category);
}

export async function getRelatedPosts(currentPost: BlogPost): Promise<BlogPost[]> {
  const posts = await getBlogPosts();
  return posts
    .filter(
      (post) =>
        post.slug !== currentPost.slug &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .slice(0, 3);
}

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return posts.slice(0, 3);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  return posts.filter((post) => post.tags.includes(tag));
} 