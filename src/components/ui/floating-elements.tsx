"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function FloatingElements() {
  return (
    <div className="hidden md:block absolute inset-0 pointer-events-none">
      {/* Top-right circles */}
      <FloatingElement 
        className="top-1/4 right-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-indigo-200 to-indigo-300 dark:from-indigo-600/30 dark:to-indigo-700/30" 
        delay={0.2}
      />
      
      {/* Bottom-left triangle */}
      <FloatingElement 
        className="bottom-[20%] left-[10%]" 
        delay={0.3}
      >
        <div className="w-16 h-16 transform rotate-45 bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-600/30 dark:to-purple-700/30"></div>
      </FloatingElement>
      
      {/* Top-left square */}
      <FloatingElement 
        className="top-[15%] left-[15%]" 
        delay={0.4}
      >
        <div className="w-12 h-12 rounded-md bg-gradient-to-br from-pink-200 to-pink-300 dark:from-pink-600/30 dark:to-pink-700/30"></div>
      </FloatingElement>
      
      {/* Middle-right polygon */}
      <FloatingElement 
        className="top-1/2 right-[5%]" 
        delay={0.5}
      >
        <div className="w-20 h-20">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" className="fill-indigo-200 dark:fill-indigo-700/30" />
          </svg>
        </div>
      </FloatingElement>
      
      {/* Bottom-right dots */}
      <FloatingElement 
        className="bottom-[15%] right-[20%]" 
        delay={0.6}
      >
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-purple-300 dark:bg-purple-600/50"></div>
          <div className="w-3 h-3 rounded-full bg-indigo-300 dark:bg-indigo-600/50"></div>
          <div className="w-3 h-3 rounded-full bg-pink-300 dark:bg-pink-600/50"></div>
        </div>
      </FloatingElement>
    </div>
  );
}

interface FloatingElementProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}

function FloatingElement({ children, className, delay = 0 }: FloatingElementProps) {
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
} 