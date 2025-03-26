"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Particles } from "@/components/ui/particles";
import { FloatingElements } from "@/components/ui/floating-elements";
import { HeroCodeSnippet } from "@/components/ui/code-snippet";

interface HeroSectionProps {
  onWatchDemoClick: () => void;
}

export function HeroSection({ onWatchDemoClick }: HeroSectionProps) {
  // State for responsive particle count
  const [particleCount, setParticleCount] = useState(100);
  
  // Set particle count based on screen size
  useEffect(() => {
    const handleResize = () => {
      setParticleCount(window.innerWidth < 768 ? 30 : 100);
    };
    
    // Initial setup
    handleResize();
    
    // Add listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Parallax scrolling effect
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden">
      {/* Background gradient - enhanced for better light mode visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/90 to-white dark:from-indigo-950/30 dark:to-gray-900"></div>
      
      {/* Animated circles in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-200/40 dark:bg-purple-800/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-indigo-200/40 dark:bg-indigo-800/20 blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-pink-200/40 dark:bg-pink-800/20 blur-3xl animate-pulse-slow animation-delay-4000"></div>
      </div>
      
      {/* Floating elements - hidden on smallest screens */}
      <FloatingElements />
      
      {/* Background particles effect */}
      <div className="absolute inset-0 z-0">
        <Particles 
          className="absolute inset-0 z-0"
          quantity={particleCount}
          staticity={50}
          ease={50}
          particleColor="rgb(99 102 241 / 0.2)"
        />
      </div>
      
      {/* Content container with parallax effect */}
      <motion.div 
        style={{ y: contentY }}
        className="container px-4 md:px-6 relative z-10 pt-8 md:pt-12 flex flex-col-reverse lg:flex-row items-center gap-8 md:gap-12 lg:gap-16"
      >
        {/* Left column - Text content */}
        <div className="flex-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Learn to code with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 block">
                hands-on projects
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-800 dark:text-gray-300 max-w-xl">
              Master modern web development with project-based tutorials that help you build real-world applications and expand your portfolio.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          >
            <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 text-white border-0">
              <Link href="/getting-started" className="w-full sm:w-auto">
                Get Started Free
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group"
              onClick={onWatchDemoClick}
            >
              <Play size={16} className="mr-2 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300" />
              Watch Demo
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-${['indigo', 'purple', 'pink', 'blue'][i]}-100 dark:bg-${['indigo', 'purple', 'pink', 'blue'][i]}-900/50`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1 text-sm sm:text-base text-gray-800 dark:text-gray-200">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="font-medium">50,000+</span> developers
            </div>
          </motion.div>
        </div>
        
        {/* Right column - Code snippet & illustration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 w-full max-w-xl"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 dark:opacity-40"></div>
            <HeroCodeSnippet />
            
            {/* User testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -bottom-6 -right-6 md:bottom-4 md:right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-3 pr-6 flex items-center gap-3 max-w-[220px]"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/testimonials/emily.svg"
                  alt="User avatar"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </div>
              <div className="text-xs">
                <p className="font-medium text-gray-900 dark:text-gray-100">Amazing tutorials!</p>
                <p className="text-gray-600 dark:text-gray-400">Perfect for my learning style</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
} 