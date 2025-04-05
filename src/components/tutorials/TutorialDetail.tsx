"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import {
  Bookmark,
  Share2,
  Play,
  Clock,
  Star,
  Book,
  Heart,
  CheckCircle,
  BookOpen,
  Download,
  Calendar,
  Globe,
  Award,
  Users,
  File,
  FolderGit,
  Pencil,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Use the Avatar component from TutorialCard.tsx
const Avatar = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative h-10 w-10 rounded-full overflow-hidden bg-muted", className)}>
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

// Interface for tutorial content
interface Lesson {
  title: string;
  duration: string;
  isCompleted?: boolean;
}

interface Section {
  title: string;
  lessons: Lesson[];
}

interface TutorialDetailProps {
  tutorial: {
    id: string;
    title: string;
    description: string;
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    duration: string;
    author: {
      name: string;
      avatar: string;
      title: string;
      bio?: string;
    };
    tags: string[];
    image: string;
    progress?: number;
    rating: number;
    likes: number;
    comments: number;
    popularity: number;
    videoId?: string;
    sections: Section[];
  };
}

// Add a related tutorials component to show at the bottom
const RelatedTutorials = ({ category, currentId }: { category: string; currentId: string }) => {
  // Mock related tutorials (in a real app, these would be fetched based on category or tags)
  const relatedTutorials = [
    {
      id: "react-hooks-deep-dive",
      title: "React Hooks Deep Dive",
      description: "Master React hooks for state management and side effects in functional components.",
      image: "/images/tutorials/react.svg",
      level: "intermediate",
      author: {
        name: "Alex Chen",
        avatar: "/avatars/alex.jpg",
      },
      duration: "3h 20m",
      rating: 4.9
    },
    {
      id: "nextjs-for-beginners",
      title: "Next.js for Beginners",
      description: "Build server-rendered React applications with Next.js framework.",
      image: "/images/tutorials/nextjs.svg",
      level: "beginner",
      author: {
        name: "Mia Johnson",
        avatar: "/avatars/mia.jpg",
      },
      duration: "5h 15m",
      rating: 4.7
    },
    {
      id: "typescript-with-react",
      title: "TypeScript with React",
      description: "Add static typing to your React applications with TypeScript.",
      image: "/images/tutorials/typescript.svg",
      level: "intermediate",
      author: {
        name: "Daniel Park",
        avatar: "/avatars/daniel.jpg",
      },
      duration: "4h 10m",
      rating: 4.8
    },
    {
      id: "react-state-management",
      title: "React State Management",
      description: "Compare and use different state management solutions in React applications.",
      image: "/images/tutorials/react.svg",
      level: "advanced",
      author: {
        name: "Sarah Johnson",
        avatar: "/avatars/sarah.jpg",
      },
      duration: "6h 30m",
      rating: 4.9
    }
  ];
  
  // Filter out the current tutorial
  const filteredTutorials = relatedTutorials.filter(tutorial => tutorial.id !== currentId);
  
  return (
    <div className="mt-16 md:mt-24">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Related Tutorials</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTutorials.map((tutorial) => (
          <a 
            key={tutorial.id} 
            href={`/tutorials/${tutorial.id}`} 
            className="group flex flex-col rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden transition-all hover:shadow-md"
          >
            <div className="h-40 bg-gray-100 dark:bg-gray-700 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`absolute inset-0 bg-gradient-to-br opacity-20 dark:opacity-30 ${
                  tutorial.level === "beginner" ? "from-indigo-500 to-blue-500" :
                  tutorial.level === "intermediate" ? "from-blue-500 to-purple-500" :
                  "from-purple-500 to-pink-500"
                }`} />
                <Image 
                  src={tutorial.image}
                  alt={`${tutorial.title} thumbnail`}
                  width={80}
                  height={80}
                  className="h-20 w-20 z-10 transition-transform duration-300 group-hover:scale-110"
                  priority={false}
                  loading="lazy"
                />
              </div>
              <div className="absolute top-3 left-3">
                <Badge className={`px-2 py-1 text-xs capitalize ${
                  tutorial.level === "beginner" ? "bg-indigo-500" :
                  tutorial.level === "intermediate" ? "bg-blue-500" :
                  "bg-purple-500"
                }`}>
                  {tutorial.level}
                </Badge>
              </div>
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center">
                <Clock className="h-3 w-3 mr-1" /> {tutorial.duration}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {tutorial.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                {tutorial.description}
              </p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="relative h-7 w-7 rounded-full overflow-hidden mr-2">
                    <Image 
                      src={tutorial.author.avatar}
                      alt={`${tutorial.author.name}'s avatar`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{tutorial.author.name}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-1">{tutorial.rating}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

const TutorialDetail = ({ tutorial }: TutorialDetailProps) => {
  const {
    title,
    description,
    level,
    duration,
    author,
    tags,
    image,
    progress,
    rating,
    likes,
    comments,
    category,
    sections,
    videoId
  } = tutorial;

  const [activeSection, setActiveSection] = useState(0);
  const [showSyllabus, setShowSyllabus] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Check if in mobile view when component mounts
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const thumbnailImage = useMemo(() => {
    // If a valid image URL is provided, use it
    if (image && (image.startsWith('http') || image.startsWith('/'))) {
      return image;
    }

    // Map category to tutorial SVG images
    if (category.toLowerCase().includes('javascript')) {
      return '/images/tutorials/javascript.svg';
    } else if (category.toLowerCase().includes('react')) {
      return '/images/tutorials/react.svg';
    } else if (category.toLowerCase().includes('python')) {
      return '/images/tutorials/python.svg';
    } else if (category.toLowerCase().includes('html') || category.toLowerCase().includes('css')) {
      return '/images/tutorials/html-css.svg';
    } else if (category.toLowerCase().includes('typescript')) {
      return '/images/tutorials/typescript.svg';
    } else if (category.toLowerCase().includes('next')) {
      return '/images/tutorials/nextjs.svg';
    } else {
      // Default fallback image
      return '/images/tutorials/code.svg';
    }
  }, [image, category]);

  // Generate a gradient background based on the tutorial's level
  const levelGradient = useMemo(() => {
    switch(level) {
      case 'beginner':
        return 'from-indigo-500 via-indigo-400 to-blue-500';
      case 'intermediate':
        return 'from-blue-500 via-indigo-500 to-purple-500';
      case 'advanced':
        return 'from-purple-500 via-purple-400 to-pink-500';
      default:
        return 'from-indigo-500 via-purple-500 to-pink-500';
    }
  }, [level]);

  // Convert level to badge color and text
  const levelBadgeStyles = useMemo(() => {
    switch(level) {
      case 'beginner':
        return {
          background: "bg-indigo-50 dark:bg-indigo-900/30",
          text: "text-indigo-700 dark:text-indigo-300",
          border: "border-indigo-200 dark:border-indigo-800"
        };
      case 'intermediate':
        return {
          background: "bg-blue-50 dark:bg-blue-900/30",
          text: "text-blue-700 dark:text-blue-300",
          border: "border-blue-200 dark:border-blue-800"
        };
      case 'advanced':
        return {
          background: "bg-purple-50 dark:bg-purple-900/30",
          text: "text-purple-700 dark:text-purple-300",
          border: "border-purple-200 dark:border-purple-800"
        };
      default:
        return {
          background: "bg-gray-50 dark:bg-gray-800",
          text: "text-gray-700 dark:text-gray-300",
          border: "border-gray-200 dark:border-gray-700"
        };
    }
  }, [level]);

  const totalLessons = useMemo(() => {
    return sections.reduce((total, section) => total + section.lessons.length, 0);
  }, [sections]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 md:space-y-12">
      {/* Tutorial Header */}
      <header id="introduction" className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <Badge 
            className={cn("px-2.5 py-1 text-xs font-medium border", 
              levelBadgeStyles.background, 
              levelBadgeStyles.text, 
              levelBadgeStyles.border
            )}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
          
          <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600">
            {category}
          </Badge>

          <div className="flex gap-3 ml-auto">
            <Button variant="outline" size="sm" className="h-8 gap-1.5 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              <Bookmark className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1.5 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h1>
        
        <div className="flex flex-wrap gap-3 text-sm">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="h-4 w-4 mr-1.5 opacity-80" />
            {duration}
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Star className="h-4 w-4 mr-1.5 text-yellow-500 dark:text-yellow-400 fill-yellow-400" />
            {rating.toFixed(1)} ({comments} reviews)
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Book className="h-4 w-4 mr-1.5 opacity-80" />
            {totalLessons} lessons
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Heart className="h-4 w-4 mr-1.5 opacity-80" />
            {likes} likes
          </div>
        </div>
      </header>

      {/* Main Content Area - 2 Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
        {/* Left Column - Video, Description, Content */}
        <div className="md:col-span-2 space-y-6 md:space-y-8">
          {/* Video or Image Container */}
          <div className="relative rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-md">
            <div className="aspect-video bg-cover bg-center relative">
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  title={`${title} video tutorial`}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${levelGradient} opacity-10 dark:opacity-20`} />
                  <Image 
                    src={thumbnailImage}
                    alt={title}
                    width={200}
                    height={200}
                    className="h-auto w-32 md:w-40 mb-4 drop-shadow-lg"
                  />
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md group">
                    <Play className="mr-2 h-4 w-4 fill-white" /> 
                    Watch Tutorial
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Description */}
          <div id="about" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 sm:p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">About This Tutorial</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
              
              <h3 id="what-youll-learn" className="text-lg font-medium mt-6 mb-3 text-gray-900 dark:text-white">What You'll Learn</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Core concepts of {category} programming</li>
                <li>How to build real-world applications</li>
                <li>Best practices and modern techniques</li>
                <li>Practical examples to reinforce learning</li>
                <li>Advanced problem-solving techniques</li>
              </ul>
              
              <h3 id="prerequisites" className="text-lg font-medium mt-6 mb-3 text-gray-900 dark:text-white">Prerequisites</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                {level === 'beginner' ? (
                  <>
                    <li>No prior experience required</li>
                    <li>Basic computer literacy</li>
                    <li>Interest in learning programming</li>
                  </>
                ) : level === 'intermediate' ? (
                  <>
                    <li>Basic understanding of programming concepts</li>
                    <li>Familiarity with {category} syntax</li>
                    <li>Some experience with building simple projects</li>
                  </>
                ) : (
                  <>
                    <li>Strong understanding of {category} fundamentals</li>
                    <li>Experience building projects with {category}</li>
                    <li>Comfort with programming concepts and patterns</li>
                  </>
                )}
              </ul>
            </div>
          </div>
          
          {/* Tutorial Content/Syllabus (Desktop) */}
          <div id="content" className="hidden md:block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 sm:p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Course Content</h2>
            <Accordion type="single" collapsible className="w-full" defaultValue="section-0">
              {sections.map((section, sectionIndex) => (
                <AccordionItem 
                  key={`section-${sectionIndex}`} 
                  value={`section-${sectionIndex}`}
                  id={`section-${sectionIndex}`}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  <AccordionTrigger className="hover:bg-gray-50 dark:hover:bg-gray-700/50 px-2 rounded-md text-gray-900 dark:text-white">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-left">
                      <span>{section.title}</span>
                      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        ({section.lessons.length} {section.lessons.length === 1 ? 'lesson' : 'lessons'})
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-2">
                    <ul className="space-y-1">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <li 
                          key={`lesson-${sectionIndex}-${lessonIndex}`}
                          className={`px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex items-start gap-3 ${
                            activeSection === sectionIndex ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : ''
                          }`}
                        >
                          <div className="flex-shrink-0 pt-0.5">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs">
                              {lessonIndex + 1}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <p className="text-gray-800 dark:text-gray-200">{lesson.title}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1 opacity-70" />
                                {lesson.duration}
                              </div>
                              {lesson.isCompleted && (
                                <div className="flex items-center text-green-600 dark:text-green-400">
                                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                  Completed
                                </div>
                              )}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 flex-shrink-0 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 text-xs border-indigo-200 dark:border-indigo-800/40"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Right Column - Course Progress, Instructor Info, Resources */}
        <div className="space-y-6">
          {/* Mobile: Toggle Syllabus Button */}
          <div className="md:hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <Button 
              onClick={() => setShowSyllabus(!showSyllabus)} 
              className="w-full gap-2"
            >
              <BookOpen className="h-4 w-4" />
              {showSyllabus ? 'Hide Course Content' : 'View Course Content'}
            </Button>
            
            {showSyllabus && (
              <div className="mt-4">
                <Accordion type="single" collapsible defaultValue="section-0">
                  {sections.map((section, sectionIndex) => (
                    <AccordionItem 
                      key={`mobile-section-${sectionIndex}`} 
                      value={`section-${sectionIndex}`}
                      className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                    >
                      <AccordionTrigger className="text-gray-900 dark:text-white text-sm">
                        <div className="flex flex-col text-left">
                          <span>{section.title}</span>
                          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                            ({section.lessons.length} {section.lessons.length === 1 ? 'lesson' : 'lessons'})
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <li 
                              key={`mobile-lesson-${sectionIndex}-${lessonIndex}`}
                              className="py-2 flex items-start gap-2 text-sm"
                            >
                              <div className="flex-shrink-0 mt-0.5">
                                <div className="h-5 w-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs">
                                  {lessonIndex + 1}
                                </div>
                              </div>
                              <div className="flex-grow">
                                <p className="text-gray-800 dark:text-gray-200">{lesson.title}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                  {lesson.duration}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>
          
          {/* Progress Card */}
          {progress !== undefined && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Your Progress</h3>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Completed</span>
                <span className="font-medium text-gray-900 dark:text-white">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 mb-4" />
              <div className="flex flex-col gap-3 mt-4">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md h-10 gap-1.5">
                  <Play className="h-4 w-4 fill-white" /> 
                  {progress > 0 ? 'Continue Learning' : 'Start Learning'}
                </Button>
                <Button variant="outline" className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 h-10 gap-1.5">
                  <Download className="h-4 w-4" />
                  Download Resources
                </Button>
              </div>
            </div>
          )}
          
          {/* Table of Contents - New Component */}
          <div className="hidden lg:block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm sticky top-24">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Table of Contents</h3>
            <div className="space-y-4">
              <a 
                href="#introduction" 
                className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
              >
                <div className="flex items-center justify-center h-5 w-5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">1</div>
                <span className="text-sm">Introduction</span>
              </a>
              <a 
                href="#about" 
                className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
              >
                <div className="flex items-center justify-center h-5 w-5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">2</div>
                <span className="text-sm">About This Tutorial</span>
              </a>
              <a 
                href="#what-youll-learn" 
                className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100 ml-4"
              >
                <span className="text-sm">What You'll Learn</span>
              </a>
              <a 
                href="#prerequisites" 
                className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100 ml-4"
              >
                <span className="text-sm">Prerequisites</span>
              </a>
              <a 
                href="#content" 
                className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
              >
                <div className="flex items-center justify-center h-5 w-5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">3</div>
                <span className="text-sm">Course Content</span>
              </a>
              {sections.slice(0, 3).map((section, index) => (
                <a 
                  key={`toc-${index}`}
                  href={`#section-${index}`} 
                  className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 ml-4"
                >
                  <span className="text-sm">{section.title}</span>
                </a>
              ))}
              {sections.length > 3 && (
                <div className="ml-4 pl-7 text-xs text-gray-500 dark:text-gray-400">
                  + {sections.length - 3} more sections
                </div>
              )}
              <a 
                href="#instructor" 
                className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
              >
                <div className="flex items-center justify-center h-5 w-5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">4</div>
                <span className="text-sm">Your Instructor</span>
              </a>
              <a 
                href="#resources" 
                className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
              >
                <div className="flex items-center justify-center h-5 w-5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">5</div>
                <span className="text-sm">Resources</span>
              </a>
              <a 
                href="#related" 
                className="flex items-center gap-2 py-1 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-gray-100"
              >
                <div className="flex items-center justify-center h-5 w-5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">6</div>
                <span className="text-sm">Related Tutorials</span>
              </a>
            </div>
          </div>
          
          {/* Instructor Info */}
          <div id="instructor" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Your Instructor</h3>
            <div className="flex items-center gap-3 mb-3">
              <Avatar
                src={author.avatar}
                alt={`${author.name}'s avatar`}
                className="h-12 w-12"
              />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{author.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{author.title}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-2 text-sm mb-3">
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Users className="h-4 w-4 mr-1 opacity-70" />
                3,500+ students
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <BookOpen className="h-4 w-4 mr-1 opacity-70" />
                12 courses
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                4.8 instructor rating
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {author.bio || `${author.name} is an experienced ${category} developer and educator with a passion for teaching complex concepts in an accessible way.`}
            </p>
            <Button variant="ghost" className="mt-3 h-9 px-3 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
              View profile
            </Button>
          </div>
          
          {/* Course Info Card */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Course Information</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm">
                <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                <div>
                  <span className="block text-gray-800 dark:text-gray-200 font-medium">Last Updated</span>
                  <span className="text-gray-600 dark:text-gray-400">August 2023</span>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                <div>
                  <span className="block text-gray-800 dark:text-gray-200 font-medium">Language</span>
                  <span className="text-gray-600 dark:text-gray-400">English</span>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <Award className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                <div>
                  <span className="block text-gray-800 dark:text-gray-200 font-medium">Certificate</span>
                  <span className="text-gray-600 dark:text-gray-400">Certificate of completion</span>
                </div>
              </li>
              <li className="flex gap-3 text-sm">
                <Users className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                <div>
                  <span className="block text-gray-800 dark:text-gray-200 font-medium">Students</span>
                  <span className="text-gray-600 dark:text-gray-400">1,200+ enrolled</span>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Resources Card */}
          <div id="resources" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2">
                  <File className="h-4 w-4" />
                  Course slides (PDF)
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2">
                  <FolderGit className="h-4 w-4" />
                  Source code (GitHub)
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2">
                  <Pencil className="h-4 w-4" />
                  Exercises & solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Support forum
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Tutorials Section */}
      <div id="related">
        <RelatedTutorials category={category} currentId={tutorial.id} />
      </div>
    </div>
  );
};

export default TutorialDetail; 
