"use client";

import { useState, useMemo } from "react";
import { Metadata } from "next";
import TutorialHero from "@/components/tutorials/TutorialHero";
import { TutorialFilters } from "@/components/tutorials/TutorialFilters";
import { TutorialCard, Tutorial } from "@/components/tutorials/TutorialCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { defaultViewport } from "@/app/metadata";

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
      title: "Python Developer"
    },
    tags: ["Python", "Data Structures", "Dictionaries", "Performance"],
    image: "/images/tutorials/python.svg",
    progress: 35,
    rating: 4.8,
    likes: 215,
    comments: 28,
    popularity: 87,
    videoId: "daefaLgNkw0",
    slug: "python-dictionaries",
    sections: [
      {
        title: "Introduction to Dictionaries",
        content: "Learn the basics of Python dictionaries and their key features.",
        duration: "15m"
      },
      {
        title: "Dictionary Operations",
        content: "Explore common operations and methods for working with dictionaries.",
        duration: "30m"
      },
      {
        title: "Advanced Dictionary Techniques",
        content: "Master advanced techniques for dictionary manipulation and optimization.",
        duration: "45m"
      }
    ]
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
      title: "Frontend Developer"
    },
    tags: ["React", "Hooks", "JavaScript", "Web Development"],
    image: "/images/tutorials/react.svg",
    rating: 4.9,
    likes: 342,
    comments: 45,
    popularity: 93,
    videoId: "TNhaISOUy6Q",
    slug: "react-hooks",
    sections: [
      {
        title: "Introduction to Hooks",
        content: "Understand the fundamentals of React Hooks and their benefits.",
        duration: "20m"
      },
      {
        title: "Common Hooks in Practice",
        content: "Learn how to use useState, useEffect, and other common hooks effectively.",
        duration: "45m"
      },
      {
        title: "Custom Hooks",
        content: "Create and use custom hooks to share logic across components.",
        duration: "40m"
      }
    ]
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
      title: "Full-Stack Developer"
    },
    tags: ["JavaScript", "Fundamentals", "Web Development"],
    image: "/images/tutorials/javascript.svg",
    progress: 75,
    rating: 4.7,
    likes: 198,
    comments: 32,
    popularity: 85,
    videoId: "hdI2bqOjy3c",
    slug: "javascript-fundamentals",
    sections: [
      {
        title: "JavaScript Basics",
        content: "Learn the core concepts of JavaScript programming.",
        duration: "30m"
      },
      {
        title: "Functions and Scope",
        content: "Understand functions, scope, and closures in JavaScript.",
        duration: "45m"
      },
      {
        title: "Objects and Arrays",
        content: "Master working with objects and arrays in JavaScript.",
        duration: "40m"
      }
    ]
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
      title: "UI/UX Designer"
    },
    tags: ["HTML", "CSS", "Web Design", "Frontend"],
    image: "/images/tutorials/html-css.svg",
    rating: 4.6,
    likes: 156,
    comments: 24,
    popularity: 82,
    videoId: "mJgBOIoGihA",
    slug: "html-css-basics",
    sections: [
      {
        title: "HTML Structure",
        content: "Learn the basics of HTML and document structure.",
        duration: "25m"
      },
      {
        title: "CSS Styling",
        content: "Master the fundamentals of CSS for styling web pages.",
        duration: "35m"
      },
      {
        title: "Responsive Design",
        content: "Create responsive layouts that work on all devices.",
        duration: "30m"
      }
    ]
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
      title: "Senior Developer"
    },
    tags: ["TypeScript", "JavaScript", "Type Safety"],
    image: "/images/tutorials/typescript.svg",
    progress: 15,
    rating: 4.5,
    likes: 134,
    comments: 22,
    popularity: 78,
    videoId: "BCg4U1FzODs",
    slug: "typescript-basics",
    sections: [
      {
        title: "TypeScript Introduction",
        content: "Understand the benefits and basics of TypeScript.",
        duration: "20m"
      },
      {
        title: "Type System",
        content: "Learn about TypeScript's type system and type annotations.",
        duration: "40m"
      },
      {
        title: "Interfaces and Classes",
        content: "Master interfaces and classes in TypeScript.",
        duration: "35m"
      }
    ]
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
      title: "React Developer"
    },
    tags: ["Next.js", "React", "JavaScript", "SSR"],
    image: "/images/tutorials/nextjs.svg",
    rating: 4.9,
    likes: 287,
    comments: 39,
    popularity: 91,
    videoId: "KjY94sAKLlw",
    slug: "nextjs-fundamentals",
    sections: [
      {
        title: "Next.js Setup",
        content: "Learn how to set up and configure a Next.js project.",
        duration: "25m"
      },
      {
        title: "Pages and Routing",
        content: "Understand Next.js routing and page structure.",
        duration: "45m"
      },
      {
        title: "Data Fetching",
        content: "Master data fetching in Next.js applications.",
        duration: "40m"
      }
    ]
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
      title: "Full-Stack Developer"
    },
    tags: ["Next.js", "React", "Full-Stack", "JavaScript"],
    image: "/images/tutorials/nextjs.svg",
    rating: 4.9,
    likes: 475,
    comments: 82,
    popularity: 92,
    videoId: "W4UhNo3HAMw",
    slug: "nextjs-full-stack",
    sections: [
      {
        title: "Next.js API Routes",
        content: "Learn how to create and use API routes in Next.js.",
        duration: "35m"
      },
      {
        title: "Authentication",
        content: "Implement authentication in Next.js applications.",
        duration: "50m"
      },
      {
        title: "Database Integration",
        content: "Connect Next.js applications to databases.",
        duration: "45m"
      }
    ]
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
      title: "Software Architect"
    },
    tags: ["Python", "Design Patterns", "OOP", "Architecture"],
    image: "/images/tutorials/python.svg",
    rating: 4.7,
    likes: 340,
    comments: 58,
    popularity: 84,
    videoId: "qJJInG2chS4",
    slug: "python-advanced-patterns",
    sections: [
      {
        title: "Creational Patterns",
        content: "Learn about creational design patterns in Python.",
        duration: "40m"
      },
      {
        title: "Structural Patterns",
        content: "Understand structural design patterns and their applications.",
        duration: "45m"
      },
      {
        title: "Behavioral Patterns",
        content: "Master behavioral design patterns for flexible code.",
        duration: "50m"
      }
    ]
  }
];

const categories = [
  { label: "Python", value: "Python" },
  { label: "React", value: "React" },
  { label: "JavaScript", value: "JavaScript" },
  { label: "Web Development", value: "Web Development" },
  { label: "TypeScript", value: "TypeScript" },
];

const levels = [
  { label: "Beginner", value: "beginner" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Advanced", value: "advanced" },
];

export default function TutorialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [savedTutorials, setSavedTutorials] = useState<string[]>([]);
  const [likedTutorials, setLikedTutorials] = useState<string[]>([]);

  const filteredTutorials = useMemo(() => {
    return tutorials.filter((tutorial) => {
      const matchesSearch = searchQuery === "" || 
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategories.length === 0 || 
        selectedCategories.includes(tutorial.category);

      const matchesLevel = selectedLevels.length === 0 || 
        selectedLevels.includes(tutorial.level);

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [searchQuery, selectedCategories, selectedLevels]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
  };

  const handleSave = (id: string) => {
    setSavedTutorials(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleLike = (id: string) => {
    setLikedTutorials(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleShare = (id: string) => {
    // Implement share functionality
    console.log("Share tutorial:", id);
  };

  return (
    <div className="container py-8 space-y-8">
      <TutorialHero />
      
      <div className="flex flex-col space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <TutorialFilters
          categories={categories}
          levels={levels}
          selectedCategories={selectedCategories}
          selectedLevels={selectedLevels}
          onCategoryChange={handleCategoryChange}
          onLevelChange={handleLevelChange}
          onClearFilters={handleClearFilters}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map((tutorial, index) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              index={index}
              onSave={handleSave}
              onShare={handleShare}
              onLike={handleLike}
              isSaved={savedTutorials.includes(tutorial.id)}
              isLiked={likedTutorials.includes(tutorial.id)}
            />
          ))}
          {filteredTutorials.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-lg text-muted-foreground">
                No tutorials found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}