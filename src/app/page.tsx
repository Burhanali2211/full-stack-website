"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  Book, 
  Code, 
  Users, 
  CheckCircle, 
  ChevronRight,
  Star,
  Sparkles,
  Play,
  Rocket,
  X,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { Stats } from "@/components/ui/stats";
import { CodeSnippet } from "@/components/ui/code-snippet";

// Define types for better type safety
interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

interface FeaturedProject {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

// Static data
const featuredProjects: FeaturedProject[] = [
  {
    title: "Modern Blog Platform",
    description: "Build a full-stack blog platform with Next.js, TypeScript, and MongoDB",
    image: "/projects/blog-platform.svg",
    tags: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
    link: "/projects/blog-platform",
    difficulty: "Beginner",
    duration: "2-3 hours",
  },
  {
    title: "Real-time Chat App",
    description: "Create a real-time chat application with WebSocket integration",
    image: "/projects/chat-app.svg",
    tags: ["React", "Node.js", "Socket.io", "Express"],
    link: "/projects/chat-app",
    difficulty: "Intermediate",
    duration: "4-5 hours",
  },
  {
    title: "E-commerce Dashboard",
    description: "Develop a comprehensive e-commerce admin dashboard",
    image: "/projects/ecommerce-dashboard.svg",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Chart.js"],
    link: "/projects/ecommerce-dashboard",
    difficulty: "Advanced",
    duration: "8-10 hours",
  },
];

const features: Feature[] = [
  {
    icon: <Book className="h-8 w-8 text-indigo-500" />,
    title: "Structured Learning Path",
    description: "Follow our carefully designed curriculum that takes you from basics to advanced concepts systematically."
  },
  {
    icon: <Code className="h-8 w-8 text-indigo-500" />,
    title: "Hands-on Experience",
    description: "Build real-world projects that you can add to your portfolio while learning practical skills."
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-500" />,
    title: "Community Support",
    description: "Join our active community of developers to get help, share knowledge, and grow together."
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "Tech Corp",
    image: "/testimonials/sarah.svg",
    content: "This platform transformed my learning journey. The project-based approach helped me land my dream job!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Full Stack Developer",
    company: "StartUp Inc",
    image: "/testimonials/michael.svg",
    content: "The structured learning path and hands-on projects gave me the confidence to build complex applications.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Software Engineer",
    company: "Innovation Labs",
    image: "/testimonials/emily.svg",
    content: "The community support is amazing. I always got help when stuck, and now I help others grow!",
    rating: 4
  }
];

// Custom components for the homepage
const GradientBorder = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("p-[1px] rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500", className)}>
    <div className="bg-white dark:bg-gray-900 rounded-xl h-full">
      {children}
    </div>
  </div>
);

const FloatingElement = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: "easeOut" 
      }}
      className={cn("absolute pointer-events-none z-10", className)}
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0], 
          rotate: [0, 1, 0],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          size={16} 
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} 
        />
      ))}
    </div>
  );
};

// Scroll to top button component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolling down 500px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          className="fixed bottom-8 right-8 z-50 p-2 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label="Scroll to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function HomePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax scrolling effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  
  // Ensure client-side rendering for components that depend on browser APIs
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Hero Section - Redesigned with improved responsiveness */}
      <section 
        ref={heroRef}
        className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden"
      >
        {/* Background gradient - enhanced for better light mode visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/90 via-purple-50/80 to-white dark:from-indigo-950/30 dark:via-purple-900/20 dark:to-gray-900"></div>
        
        {/* Animated circles in background - optimized for better performance */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-purple-200/40 to-indigo-200/40 dark:from-purple-800/20 dark:to-indigo-800/20 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-200/40 to-blue-200/40 dark:from-indigo-800/20 dark:to-blue-800/20 blur-3xl animate-pulse-slow animation-delay-2000"></div>
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-gradient-to-r from-pink-200/40 to-purple-200/40 dark:from-pink-800/20 dark:to-purple-800/20 blur-3xl animate-pulse-slow animation-delay-4000"></div>
        </div>
        
        {/* Optimized floating elements - only render after client-side hydration */}
        {isMounted && (
          <>
            <FloatingElement
              className="left-[10%] top-[20%] z-10 hidden md:block"
              delay={0}
            >
              <div className="bg-gradient-to-br from-indigo-200/80 to-indigo-300/80 dark:from-indigo-600/30 dark:to-indigo-700/30 backdrop-blur-sm p-3 rounded-lg">
                <Rocket size={24} className="text-indigo-600 dark:text-indigo-400" />
              </div>
            </FloatingElement>
            <FloatingElement
              className="right-[10%] top-[15%] z-10 hidden md:block"
              delay={1}
            >
              <div className="bg-gradient-to-br from-purple-200/80 to-purple-300/80 dark:from-purple-600/30 dark:to-purple-700/30 backdrop-blur-sm p-3 rounded-lg">
                <Sparkles size={24} className="text-purple-600 dark:text-purple-400" />
              </div>
            </FloatingElement>
            <FloatingElement
              className="left-[15%] bottom-[15%] z-10 hidden md:block"
              delay={2}
            >
              <div className="bg-gradient-to-br from-blue-200/80 to-blue-300/80 dark:from-blue-600/30 dark:to-blue-700/30 backdrop-blur-sm p-3 rounded-lg">
                <Code size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
            </FloatingElement>
            <FloatingElement
              className="right-[15%] bottom-[20%] z-10 hidden md:block"
              delay={3}
            >
              <div className="bg-gradient-to-br from-green-200/80 to-green-300/80 dark:from-green-600/30 dark:to-green-700/30 backdrop-blur-sm p-3 rounded-lg">
                <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
              </div>
            </FloatingElement>
          </>
        )}
        
        {/* Background particles - dynamically adjust quantity based on client-side mount */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="h-full w-full">
            {isMounted && Array.from({ length: typeof window !== 'undefined' && window.innerWidth > 768 ? 50 : 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gray-200 dark:bg-gray-700"
                style={{
                  width: Math.random() * 4 + 1,
                  height: Math.random() * 4 + 1,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * 20 - 10],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 4 + 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Background particles effect - only render after client-side hydration */}
        {isMounted && (
          <motion.div 
            className="absolute inset-0 z-0 overflow-hidden"
            style={{ y: backgroundY }}
          >
            <Particles
              className="absolute inset-0" 
              quantity={typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : 100}
              staticity={40}
              particleColor="hsl(var(--primary))"
            />
          </motion.div>
        )}
        
        {/* Hero content - improved layout and animations */}
        <div className="container relative z-20 mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            <motion.div 
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="mb-3 flex items-center">
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  <Sparkles className="mr-1 h-3.5 w-3.5" />
                  New Courses Available
                </span>
              </div>
              
              <motion.h1 
                className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="block">Master Web Development</span>
                <span className="block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  by Building Real Projects
                </span>
              </motion.h1>
              
              <motion.p 
                className="mb-6 max-w-lg text-lg text-gray-800 dark:text-gray-200 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Learn through hands-on projects and build a professional portfolio with our guided courses, expert mentorship, and supportive community.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/tutorials">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 dark:shadow-indigo-700/30 text-base font-semibold px-6 py-2.5">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setIsVideoOpen(true)}
                  className="border-gray-300 text-gray-700 dark:text-gray-300 bg-white/80 backdrop-blur-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900/80 dark:hover:bg-gray-800/90"
                >
                  <Play className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative flex items-center justify-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              <div className="w-full max-w-md">
                {isMounted && (
                  <CodeSnippet 
                    code={`// Simple counter app with React
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
                    language="jsx"
                    fileName="Counter.jsx"
                    highlightLines={[4, 9, 10]}
                    runnable
                    onRun={() => setIsVideoOpen(true)}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
        
        {isMounted && <ScrollIndicator className="hidden md:flex" />}
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 500 }}
              className="relative w-full max-w-4xl rounded-xl bg-white dark:bg-gray-900 overflow-hidden shadow-2xl"
            >
              <div className="absolute right-2 top-2 z-10">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsVideoOpen(false)}
                  className="h-8 w-8 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&modestbranding=1&rel=0"
                  title="Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Section */}
      <Stats />

      {/* Featured projects section - enhanced with better animations and visuals */}
      <section id="projects" className="bg-gray-50 dark:bg-gray-900/50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Learn By Building Real Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Master web development by creating these professional-grade projects with step-by-step guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
              >
                <Link href={project.link}>
                  <GradientBorder className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="h-full p-6 flex flex-col">
                      <div className="relative mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-[16/9]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <div className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">
                            {project.difficulty}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center gap-2 flex-wrap mt-auto">
                        <div className="inline-flex items-center text-gray-500 dark:text-gray-400">
                          <Clock className="mr-1 h-3.5 w-3.5" />
                          <span className="text-xs">{project.duration}</span>
                        </div>
                        <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span 
                              key={tag} 
                              className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </GradientBorder>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/projects">
              <Button variant="outline" className="gap-2 group">
                Browse All Projects
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features section - enhanced with modern visuals and animations */}
      <section id="features" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 mb-4">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Platform Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Everything You Need to Learn Web Development
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our platform provides all the tools, resources, and support you need to become a professional web developer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
                className="relative p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/60 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-950/20 dark:to-gray-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/features">
              <Button variant="outline" className="gap-2 group">
                Learn More About Our Features
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials section - enhanced with better visuals and animations */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 mb-4">
              <Star className="mr-1 h-3.5 w-3.5" fill="currentColor" />
              Student Success Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              What Our Students Are Saying
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Discover how our platform has helped thousands of students achieve their coding goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
                className="flex flex-col h-full bg-white dark:bg-gray-800/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1">
                  <div className="flex mb-4">
                    <RatingStars rating={testimonial.rating} />
                  </div>
                  
                  <p className="italic text-gray-700 dark:text-gray-300 mb-6">
                    "{testimonial.content}"
                  </p>
                </div>
                
                <div className="flex items-center mt-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 mr-3">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/testimonials">
              <Button variant="outline" className="gap-2 group">
                Read More Success Stories
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call-to-action section - enhanced with gradient background and animations */}
      <section id="cta" className="relative py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-white dark:from-indigo-950/30 dark:via-purple-900/20 dark:to-gray-900"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-700 to-transparent"></div>
        <div className="absolute -left-40 -top-40 w-80 h-80 rounded-full bg-indigo-200/30 dark:bg-indigo-800/20 blur-3xl"></div>
        <div className="absolute -right-40 -bottom-40 w-80 h-80 rounded-full bg-purple-200/30 dark:bg-purple-800/20 blur-3xl"></div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              Ready to Start Your Web Development Journey?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Join thousands of students who have already transformed their careers with our structured learning path and hands-on projects.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/signup">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-700 min-w-[180px]">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/tutorials">
                <Button variant="outline" size="lg" className="min-w-[180px]">
                  Explore Tutorials
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
}
