import { Metadata } from "next";
import TutorialHero from "@/components/tutorials/TutorialHero";
import TutorialsClient from "@/components/tutorials/TutorialsClient";
import { Tutorial } from "@/components/tutorials/TutorialCard";
import { defaultViewport } from "@/app/metadata";
import { getAvatarUrl } from "@/lib/utils";
import { AuthProvider } from '@/contexts/auth-context';

export const metadata: Metadata = {
  title: "Programming Tutorials | Learn to Code",
  description: "Browse our extensive collection of programming tutorials for all skill levels. From beginner to advanced concepts in web development, Python, JavaScript and more.",
};

export const viewport = defaultViewport;

// Tutorial data
export const tutorials: Tutorial[] = [
  {
    id: "python-dictionaries",
    title: "Working with Python Dictionaries",
    description: "Learn how to effectively use Python dictionaries for data management, transformations, and performance optimization.",
    category: "Python",
    level: "intermediate",
    duration: "2h 30m",
    author: {
      name: "Ryan Thompson",
      avatar: getAvatarUrl('ryan'),
      title: "Python Developer"
    },
    tags: ["Python", "Data Structures", "Dictionaries", "Performance"],
    image: "/images/tutorials/python.svg",
    progress: 35,
    rating: 4.8,
    likes: 215,
    comments: 28,
    popularity: 87,
    videoId: "daefaLgNkw0"  // Sample Python dictionary video
  },
  {
    id: "react-hooks",
    title: "Mastering React Hooks",
    description: "A deep dive into React Hooks with practical examples to enhance your functional components.",
    category: "React",
    level: "intermediate",
    duration: "3h 15m",
    author: {
      name: "Sarah Johnson",
      avatar: getAvatarUrl('sarah'),
      title: "Frontend Developer"
    },
    tags: ["React", "Hooks", "JavaScript", "Web Development"],
    image: "/images/tutorials/react.svg",
    rating: 4.9,
    likes: 342,
    comments: 45,
    popularity: 93,
    videoId: "TNhaISOUy6Q"  // React hooks video
  },
  {
    id: "javascript-fundamentals",
    title: "JavaScript Fundamentals",
    description: "Build a solid foundation in JavaScript with this comprehensive guide for beginners.",
    category: "JavaScript",
    level: "beginner",
    duration: "4h 45m",
    author: {
      name: "Michael Smith",
      avatar: getAvatarUrl('michael'),
      title: "Full-Stack Developer"
    },
    tags: ["JavaScript", "Fundamentals", "Web Development"],
    image: "/images/tutorials/javascript.svg",
    progress: 75,
    rating: 4.7,
    likes: 198,
    comments: 32,
    popularity: 85,
    videoId: "hdI2bqOjy3c"  // JavaScript fundamentals video
  },
  {
    id: "html-css-basics",
    title: "HTML & CSS Fundamentals",
    description: "Master the building blocks of the web with HTML for structure and CSS for styling.",
    category: "Web Development",
    level: "beginner",
    duration: "3h 10m",
    author: {
      name: "Emma Clark",
      avatar: getAvatarUrl('emma'),
      title: "UI/UX Designer"
    },
    tags: ["HTML", "CSS", "Web Design", "Frontend"],
    image: "/images/tutorials/html-css.svg",
    rating: 4.6,
    likes: 156,
    comments: 24,
    popularity: 82,
    videoId: "mJgBOIoGihA"  // HTML/CSS basics video
  },
  {
    id: "typescript-basics",
    title: "TypeScript for Beginners",
    description: "Learn how to write type-safe JavaScript code with TypeScript to build more robust applications.",
    category: "TypeScript",
    level: "beginner",
    duration: "3h 45m",
    author: {
      name: "David Kim",
      avatar: getAvatarUrl('david'),
      title: "Senior Developer"
    },
    tags: ["TypeScript", "JavaScript", "Type Safety"],
    image: "/images/tutorials/typescript.svg",
    progress: 15,
    rating: 4.5,
    likes: 134,
    comments: 22,
    popularity: 78,
    videoId: "BCg4U1FzODs"  // TypeScript basics video
  },
  {
    id: "nextjs-fundamentals",
    title: "Next.js Fundamentals",
    description: "Learn the basics of Next.js, the React framework for production, with practical projects and examples.",
    category: "Next.js",
    level: "intermediate",
    duration: "4h 20m",
    author: {
      name: "Jessica Chen",
      avatar: getAvatarUrl('jessica'),
      title: "React Developer"
    },
    tags: ["Next.js", "React", "JavaScript", "SSR"],
    image: "/images/tutorials/nextjs.svg",
    rating: 4.9,
    likes: 287,
    comments: 39,
    popularity: 91,
    videoId: "KjY94sAKLlw"  // Next.js video
  },
  {
    id: "nextjs-full-stack",
    title: "Building Full-Stack Apps with Next.js",
    description: "Learn to build complete applications with Next.js including API routes, authentication, and database integration.",
    category: "Next.js",
    level: "advanced",
    duration: "6h 15m",
    author: {
      name: "Jamal Wilson",
      avatar: getAvatarUrl('jamal'),
      title: "Full-Stack Developer",
    },
    tags: ["Next.js", "React", "Full-Stack", "JavaScript"],
    image: "/images/tutorials/nextjs.svg",
    rating: 4.9,
    likes: 475,
    comments: 82,
    popularity: 92,
    videoId: "W4UhNo3HAMw"  // Next.js full-stack video
  },
  {
    id: "python-advanced-patterns",
    title: "Advanced Python Design Patterns",
    description: "Master object-oriented programming in Python by implementing common design patterns for scalable applications.",
    category: "Python",
    level: "advanced",
    duration: "4h 50m",
    author: {
      name: "Robert Chen",
      avatar: getAvatarUrl('robert'),
      title: "Software Architect",
    },
    tags: ["Python", "Design Patterns", "OOP", "Architecture"],
    image: "/images/tutorials/python.svg",
    rating: 4.7,
    likes: 340,
    comments: 58,
    popularity: 84,
    videoId: "qJJInG2chS4"  // Python design patterns video
  },
];

export default function TutorialsPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <AuthProvider>
        <TutorialHero />
        <div className="mt-12">
          <TutorialsClient tutorials={tutorials} />
        </div>
      </AuthProvider>
    </main>
  );
}