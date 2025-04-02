"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Users, Code, Award, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  {
    value: "1000+",
    label: "Projects Completed",
    icon: <Code strokeWidth={1.5} className="h-5 w-5" />,
  },
  {
    value: "50K+",
    label: "Community Members",
    icon: <Users strokeWidth={1.5} className="h-5 w-5" />,
  },
  {
    value: "24/7",
    label: "Support Available",
    icon: <Award strokeWidth={1.5} className="h-5 w-5" />,
  },
  {
    value: "180+",
    label: "Countries Reached",
    icon: <Globe strokeWidth={1.5} className="h-5 w-5" />,
  },
];

interface CounterProps {
  value: string;
  duration?: number;
  onComplete?: () => void;
}

function Counter({ value, duration = 2, onComplete }: CounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  
  useEffect(() => {
    let start = 0;
    const end = Math.min(numericValue, 5000); // Cap to avoid performance issues
    const incrementTime = Math.floor(duration * 1000 / end) || 1;
    
    if (start === end) return;
    
    let timer = setInterval(() => {
      start += 1;
      const progress = Math.floor((start / end) * numericValue);
      setDisplayValue(`${progress}${suffix}`);
      
      if (start >= end) {
        setDisplayValue(`${numericValue}${suffix}`);
        clearInterval(timer);
        onComplete?.();
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [numericValue, duration, suffix, onComplete]);
  
  return (
    <span className="font-display tracking-tight tabular-nums">
      {displayValue}
    </span>
  );
}

export function Stats() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/80">
      <div className="container px-4 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
            Join a growing community of learners
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Be part of our global community dedicated to making coding education accessible to everyone
          </p>
        </div>
        
        <motion.div 
          ref={ref}
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center mb-4 w-12 h-12 rounded-full bg-primary/10 text-primary">
                  {stat.icon}
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  {inView ? (
                    <Counter 
                      value={stat.value}
                      duration={1.5}
                    />
                  ) : (
                    stat.value
                  )}
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-12 text-center"
            variants={itemVariants}
          >
            <a href="/join-us" className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors">
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                Join our global community today →
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 