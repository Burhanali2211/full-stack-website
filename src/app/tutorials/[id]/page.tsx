"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Award, CheckCircle, Share2, Heart, Bookmark, Download, ArrowUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import Image from "next/image";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TutorialVideo } from "@/components/tutorial-video";
import { TutorialShare } from "@/components/tutorial-share";

// Custom CSS for animations - import in your global CSS or include here
// @keyframes pulse-slow {
//   0%, 100% { opacity: 0.5; }
//   50% { opacity: 0.8; }
// }

// @keyframes float {
//   0%, 100% { transform: translateY(0); }
//   50% { transform: translateY(-10px); }
// }

// .animate-pulse-slow {
//   animation: pulse-slow 4s ease-in-out infinite;
// }

// .animate-float {
//   animation: float 6s ease-in-out infinite;
// }

// Define or update the Tutorial interface to include videoId
interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  tags: string[];
  image: string;
  progress: number;
  rating: number;
  likes: number;
  comments: number;
  popularity: number;
  videoId?: string; // Make videoId optional
}

// Dummy tutorial data
const tutorial: Tutorial = {
  id: "nextjs-fundamentals",
  title: "Next.js Fundamentals",
  description: "Learn the basics of Next.js, from routing to data fetching and server components",
  category: "frontend",
  level: "beginner",
  duration: "2 hours",
  author: {
    name: "Sarah Chen",
    avatar: "/avatars/sarah.svg",
    title: "Frontend Developer"
  },
  tags: ["Next.js", "React", "JavaScript", "SSR"],
  image: "/images/thumbnails/nextjs.svg",
  progress: 35,
  rating: 4.8,
  likes: 342,
  comments: 28,
  popularity: 98,
  videoId: "lRQ5z7i7pxE" // Add Next.js tutorial video ID
};

// Dummy content for the tutorial
const tutorialContent = `
# Next.js Fundamentals

Welcome to the Next.js Fundamentals tutorial! In this course, you'll learn everything you need to know to get started with Next.js.

## Prerequisites
- Basic knowledge of React
- Familiarity with JavaScript/TypeScript
- Node.js installed on your machine

## Getting Started

First, let's create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
\`\`\`

### Project Structure

Let's understand the key files and directories in a Next.js project:

\`\`\`
my-app/
  ├── app/
  │   ├── layout.tsx
  │   └── page.tsx
  ├── public/
  ├── components/
  └── package.json
\`\`\`

## Core Concepts

### 1. Routing
Next.js 13+ introduces a new file-system based router built on top of React Server Components.

\`\`\`typescript
// app/page.tsx
export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
    </div>
  );
}
\`\`\`

### 2. Data Fetching
Next.js provides multiple ways to fetch data:

\`\`\`typescript
// Example of server-side data fetching
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <main>{/* Use data */}</main>;
}
\`\`\`

## Exercise
Try creating a simple blog page that fetches posts from an API.
`;

interface Section {
  id: string;
  title: string;
  isCompleted: boolean;
}

const sections: Section[] = [
  { id: "introduction", title: "Introduction", isCompleted: false },
  { id: "prerequisites", title: "Prerequisites", isCompleted: false },
  { id: "getting-started", title: "Getting Started", isCompleted: false },
  { id: "core-concepts", title: "Core Concepts", isCompleted: false },
  { id: "exercise", title: "Exercise", isCompleted: false },
];

// Sample comments for the tutorial
const sampleComments = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      avatar: "/avatars/alex.svg"
    },
    content: "This tutorial was incredibly helpful. I was struggling with understanding server components, but now it all makes sense!",
    date: "2 days ago",
    likes: 8
  },
  {
    id: "2",
    user: {
      name: "Emma Wilson",
      avatar: "/avatars/emma.svg"
    },
    content: "Great explanation of the file structure. It would be nice to have more examples of complex routing though.",
    date: "1 week ago",
    likes: 5
  },
  {
    id: "3",
    user: {
      name: "Miguel Brown",
      avatar: "/avatars/miguel.svg"
    },
    content: "The code examples were super clear. I was able to follow along and build my first Next.js app with ease.",
    date: "3 weeks ago",
    likes: 12
  }
];

// Add a reusable Avatar component
const Avatar = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative rounded-full overflow-hidden bg-muted", className)}>
      <Image
        src={error ? "/avatars/placeholder.svg" : src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
};

export default function TutorialPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("content");
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(sampleComments);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  
  // Use static progress for demo
  const progress = 35; // Example progress percentage

  // Handle mounting state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulate loading state
  useEffect(() => {
    if (!mounted) return;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [mounted]);

  // Handle scroll progress
  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);
      setShowTopButton(currentScroll > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: `${comments.length + 1}`,
      user: {
        name: "You",
        avatar: "/avatars/user.jpg"
      },
      content: newComment,
      date: "Just now",
      likes: 0
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };
  
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Don't render content until mounted, but ensure all hooks are called before this check
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-6xl mx-auto py-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4"></div>
            <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-6"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Share modal */}
      <TutorialShare 
        title={tutorial.title}
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
      />
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary/30 z-50"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
      {/* Back to top button */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full bg-primary shadow-lg flex items-center justify-center text-white"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/tutorials" className="text-muted-foreground hover:text-foreground inline-flex items-center transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tutorials
              </Link>
            </div>
            
        {isLoading ? (
          <div className="animate-pulse space-y-6">
            <div className="h-10 w-3/4 bg-muted rounded-md"></div>
            <div className="h-40 w-full bg-muted rounded-md"></div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-muted rounded-md"></div>
              <div className="h-4 w-5/6 bg-muted rounded-md"></div>
              <div className="h-4 w-4/6 bg-muted rounded-md"></div>
            </div>
          </div>
        ) : (
          <div>
            {/* Tutorial header */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  {tutorial.title}
                </h1>
                
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={cn(
                            "h-9 w-9 rounded-full border-primary/20",
                            isLiked && "text-rose-500 border-rose-500/30 bg-rose-500/10"
                          )}
                          onClick={handleLike}
                        >
                          <Heart className={cn("h-4 w-4", isLiked && "fill-rose-500")} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>{isLiked ? 'Unlike' : 'Like'} this tutorial</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={cn(
                            "h-9 w-9 rounded-full border-primary/20",
                            isSaved && "text-amber-500 border-amber-500/30 bg-amber-500/10"
                          )}
                          onClick={handleSave}
                        >
                          <Bookmark className={cn("h-4 w-4", isSaved && "fill-amber-500")} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>{isSaved ? 'Remove from' : 'Save to'} bookmarks</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-full border-primary/20"
                          onClick={() => setShareModalOpen(true)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Share this tutorial</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-full border-primary/20"
                          onClick={() => window.print()}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>Download tutorial</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {tutorial.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="bg-primary/5 border-primary/20 text-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
                {tutorial.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Avatar 
                    src={tutorial.author.avatar}
                    alt={tutorial.author.name}
                    className="h-10 w-10"
                  />
                  <div>
                    <p className="text-sm font-medium">{tutorial.author.name}</p>
                    <p className="text-xs text-muted-foreground">{tutorial.author.title}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{tutorial.duration}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">{tutorial.rating} rating</span>
                </div>
              </div>
              
              {/* Add the video component here */}
              {tutorial.videoId && (
                <div className="mb-8 max-w-4xl">
                  <TutorialVideo
                    videoId={tutorial.videoId}
                    title={tutorial.title}
                    autoplay={false}
                  />
                </div>
              )}
              
              {/* Content tabs */}
              <Tabs defaultValue="content" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="w-full max-w-md grid grid-cols-2">
                  <TabsTrigger value="content">Tutorial Content</TabsTrigger>
                  <TabsTrigger value="comments">
                    Comments <span className="ml-1.5 text-xs text-muted-foreground">({comments.length})</span>
              </TabsTrigger>
            </TabsList>
              </Tabs>
            </div>
            
            {/* Tutorial content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="col-span-1 lg:col-span-8">
                {activeTab === "content" ? (
                  <div>
                    <MarkdownRenderer content={tutorialContent} />
                    
                    <Button 
                      className="mt-8 bg-primary-foreground text-primary group"
                      size="lg"
                    >
                      <span>Complete Tutorial</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                  </div>
                ) : (
                  // Comments section
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1">
                      <textarea 
                          className="w-full p-3 rounded-lg bg-muted/30 border border-muted placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                          rows={3}
                          placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                      </div>
                      <Button 
                        size="sm"
                        disabled={!newComment.trim()} 
                        onClick={handleAddComment}
                      >
                        Post
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {comments.map(comment => (
                        <div key={comment.id} className="flex gap-3 p-4 rounded-xl bg-muted/30 border border-muted/50">
                          <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
                            <img 
                              src={comment.user.avatar} 
                              alt={comment.user.name}
                              className="h-full w-full object-cover"
                              onError={(e) => (e.currentTarget.src = '/avatars/placeholder.svg')}
                                />
                              </div>
                              <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <h4 className="font-medium">{comment.user.name}</h4>
                              <span className="text-xs text-muted-foreground">{comment.date}</span>
                                </div>
                            <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <button className="flex items-center gap-1 hover:text-primary transition-colors">
                                <Heart className="h-3 w-3" />
                                    <span>{comment.likes || 0}</span>
                                  </button>
                              <button className="hover:text-primary transition-colors">Reply</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>
              
              {/* Tutorial sidebar */}
              <div className="col-span-1 lg:col-span-4">
                <div className="space-y-6 sticky top-24">
                  <div className="p-5 rounded-xl border bg-muted/30">
                    <h3 className="font-medium mb-3">Your Progress</h3>
                    <Progress value={progress} className="h-2 mb-3" />
                    <p className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</p>
                    
                    <div className="space-y-2 mt-4">
                      {sections.map(section => (
                        <div 
                          key={section.id}
                          className="flex items-center gap-2 py-1"
                        >
                          <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            section.isCompleted ? "bg-primary text-primary-foreground" : "border border-muted-foreground/30"
                          }`}>
                            {section.isCompleted ? (
                              <CheckCircle className="h-3 w-3" />
                            ) : (
                              <span className="h-1 w-1 rounded-full bg-muted-foreground/50"></span>
                            )}
                          </div>
                          <span className={`text-sm ${section.isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                            {section.title}
                          </span>
                        </div>
                      ))}
                </div>
                  </div>
                  
                  <div className="p-5 rounded-xl border bg-muted/30">
                    <h3 className="font-medium mb-3">Related Tutorials</h3>
                    <div className="space-y-3">
                      <Link href="/tutorials/python-basics" className="flex items-start gap-2 group">
                        <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
                          <img 
                            src="/images/thumbnails/python.svg" 
                            alt="Python Basics" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                  <div>
                          <h4 className="text-sm font-medium group-hover:text-primary transition-colors">Python Basics</h4>
                          <p className="text-xs text-muted-foreground">15 min</p>
                        </div>
                      </Link>
                      <Link href="/tutorials/python-functions" className="flex items-start gap-2 group">
                        <div className="w-12 h-12 rounded-md overflow-hidden shrink-0">
                          <img 
                            src="/images/thumbnails/python.svg" 
                            alt="Python Functions" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium group-hover:text-primary transition-colors">Python Functions</h4>
                          <p className="text-xs text-muted-foreground">20 min</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )}
      </div>
    </div>
  );
} 