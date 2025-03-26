"use client";

import { useState, useRef } from "react";
import { Book, Code, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { Stats } from "@/components/ui/stats";
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturedProjects } from "@/components/ui/featured-projects";
import { FeaturesSection } from "@/components/ui/features-section";
import { TestimonialsSection } from "@/components/ui/testimonials-section";
import { CTASection } from "@/components/ui/cta-section";
import { VideoModal } from "@/components/ui/video-modal";

// Define type for better type safety
interface FeaturedProject {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
  link?: string;
}

// Define static data
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
    description: "Follow our carefully designed curriculum that takes you from basics to advanced concepts systematically.",
    link: "/learning-paths"
  },
  {
    icon: <Code className="h-8 w-8 text-indigo-500" />,
    title: "Hands-on Experience",
    description: "Build real-world projects that you can add to your portfolio while learning practical skills.",
    link: "/projects"
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-500" />,
    title: "Community Support",
    description: "Join our active community of developers to get help, share knowledge, and grow together.",
    link: "/community"
  }
];

const testimonials: Testimonial[] = [
  {
    name: "Burhan Ali",
    role: "Frontend Developer",
    company: "Airbnb",
    image: "/images/testimonials/testimonial-1.jpg",
    content: "This platform transformed my career path. The React and Next.js tutorials helped me understand modern frameworks, and within 3 months I landed my dream job at Airbnb!",
    rating: 5
  },
  {
    name: "Tatheer Ahmed",
    role: "Full Stack Developer",
    company: "Stripe",
    image: "/images/testimonials/testimonial-2.jpg",
    content: "The project-based learning approach is outstanding. I built 4 production-quality applications following the tutorials, which helped me ace my technical interviews at Stripe.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Software Engineer",
    company: "Microsoft",
    image: "/images/testimonials/testimonial-3.jpg",
    content: "The community here is incredible. Whenever I got stuck, someone was always available to help. The TypeScript courses in particular were game-changing for my skillset.",
    rating: 4
  }
];

export default function HomePage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // State for video modal
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoId = "W6NZfCO5SIk"; // JavaScript Crash Course for Beginners
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Hero Section */}
      <div ref={heroRef}>
        <HeroSection onWatchDemoClick={() => setVideoModalOpen(true)} />
      </div>
      
      {/* Scroll Indicator */}
      <ScrollIndicator className="z-20" />
      
      {/* Video Modal */}
      <VideoModal 
        isOpen={videoModalOpen} 
        videoId={videoId} 
        onClose={() => setVideoModalOpen(false)} 
      />

      {/* Stats Section */}
      <section className="w-full py-24 bg-gray-50 dark:bg-gray-900/30">
        <div className="container px-4 md:px-6">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <div className={cn(
              "inline-flex mb-4 items-center justify-center rounded-full",
              "bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-sm font-medium",
              "text-indigo-600 dark:text-indigo-400"
            )}>
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-4 h-4 mr-1"
              >
                <path d="M12 2L14.39 8.26L21 9.27L16.5 14.14L17.77 21L12 17.77L6.23 21L7.5 14.14L3 9.27L9.61 8.26L12 2Z" />
              </svg>
              Platform Statistics
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Join a growing community of learners
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Be part of our global community dedicated to making coding education accessible to everyone
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-xl blur-xl"></div>
            <Stats />
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <FeaturedProjects projects={featuredProjects} />

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
