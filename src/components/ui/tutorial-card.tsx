"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Bookmark, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

export interface TutorialCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  thumbnail?: string;
  tags?: string[];
  progress?: number;
}

const categoryIcons: Record<string, string> = {
  javascript: "/images/tutorials/javascript.svg",
  python: "/images/tutorials/python.svg",
  react: "/images/tutorials/react.svg",
  "html-css": "/images/tutorials/html-css.svg",
  typescript: "/images/tutorials/typescript.svg",
  nextjs: "/images/tutorials/nextjs.svg",
  default: "/images/tutorials/code.svg"
};

const levelColors = {
  beginner: "text-green-400",
  intermediate: "text-yellow-400",
  advanced: "text-red-400",
};

const levelIconMap = {
  beginner: BookOpen,
  intermediate: BookOpen, 
  advanced: BookOpen
};

const placeholderImageMap: Record<string, string> = {
  javascript: "/images/tutorials/javascript-placeholder.jpg",
  python: "/images/tutorials/python-placeholder.jpg",
  react: "/images/tutorials/react-placeholder.jpg",
  nextjs: "/images/tutorials/nextjs-placeholder.jpg",
  typescript: "/images/tutorials/typescript-placeholder.jpg",
  "html-css": "/images/tutorials/html-css-placeholder.jpg",
  default: "/images/tutorials/code-placeholder.jpg"
};

export function TutorialCard({
  id,
  slug,
  title,
  description,
  category,
  level,
  duration,
  author,
  date,
  thumbnail,
  tags = [],
  progress = 0,
}: TutorialCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  // Motion values for 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform x and y motion values to rotation values
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);
  
  // Create pulsing animation for difficulty badge
  const [isPulsing, setIsPulsing] = useState(false);

  // Handle scroll for gradient border shift
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Toggle pulsing animation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const categoryIcon = categoryIcons[category.toLowerCase()] || categoryIcons.default;
  const placeholderImage = placeholderImageMap[category.toLowerCase()] || placeholderImageMap.default;
  const actualThumbnail = thumbnail || placeholderImage;
  const LevelIcon = levelIconMap[level];
  const levelColor = levelColors[level];
  
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  
  // Calculate gradient rotation based on scroll position for dynamic effect
  const gradientRotation = (scrollY * 0.1) % 360;

  return (
    <motion.div 
      className="relative perspective"
      onMouseMove={(e) => {
        // Calculate mouse position within card
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        
        // Update motion values
        x.set(mouseX);
        y.set(mouseY);
      }}
      onMouseLeave={() => {
        // Reset tilt on mouse leave
        x.set(0);
        y.set(0);
        setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glowing gradient border */}
      <div 
        className={cn(
          "absolute inset-0 rounded-[8px] p-[3px] z-0 transition-opacity duration-500",
          isHovered ? "opacity-100" : "opacity-70"
        )}
        style={{
          background: `linear-gradient(${gradientRotation}deg, #5B21B6, #D946EF, #5B21B6)`,
          backgroundSize: "200% 200%",
          animation: isHovered ? "borderGlow 3s ease infinite" : "none",
        }}
      />
      
      <motion.div 
        className={cn(
          "relative w-[320px] h-[420px] rounded-[8px] overflow-hidden p-[10px]",
          "bg-[#0F0F0F] shadow-xl z-10"
        )}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <Link href={`/tutorials/${slug}`} className="block h-full">
          {/* 3D Thumbnail container */}
          <motion.div 
            className="relative w-[300px] h-[200px] mx-auto overflow-hidden rounded-[6px]"
            style={{
              transformStyle: "preserve-3d",
              transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
              transition: "transform 250ms ease-out",
            }}
          >
            <Image
              src={actualThumbnail}
              alt={title}
              width={300}
              height={200}
              className="object-cover h-full w-full"
              priority
            />

            {/* Bookmark button with neon effect */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsBookmarked(!isBookmarked);
              }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "absolute top-2 right-2 z-30 p-1.5 rounded-full",
                "bg-black/40 backdrop-blur-sm transition-all",
                isBookmarked ? "text-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.7)]" : "text-white hover:text-yellow-200"
              )}
              aria-label={isBookmarked ? "Unsave tutorial" : "Save tutorial"}
              style={{
                boxShadow: isBookmarked ? "0 0 10px rgba(250,204,21,0.7)" : "none",
              }}
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked ? "fill-yellow-400" : "")} />
            </motion.button>
          </motion.div>
          
          {/* Content section */}
          <div className="p-3 flex flex-col h-[200px] mt-2">
            {/* Title with neon glow */}
            <h3 
              className="text-[22px] font-bold mb-2 line-clamp-2 text-white tracking-tight"
              style={{
                textShadow: isHovered ? "0 0 8px rgba(167,139,250,0.7)" : "0 0 5px rgba(167,139,250,0.4)",
              }}
            >
              {title}
            </h3>
            
            {/* Description - limited to 2 lines */}
            <p className="text-[14px] text-[#D1D5DB] mb-4 line-clamp-2">
              {description}
            </p>
            
            {/* Author section */}
            <div className="flex items-center mt-auto mb-4">
              <div className="w-[32px] h-[32px] rounded-full overflow-hidden mr-3 border border-gray-800">
                {author.avatar ? (
                  <Image 
                    src={author.avatar} 
                    alt={author.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] text-white font-medium">
                  {author.name}
                </span>
                <span className="text-[12px] text-[#9CA3AF]">
                  {formattedDate}
                </span>
              </div>
            </div>
            
            {/* Duration and level badges with animated effects */}
            <div className="flex justify-end gap-3">
              <motion.div 
                className="flex items-center bg-[#1E1E1E] px-3 py-1.5 rounded-full text-white text-[12px]"
                whileHover={{ scale: 1.05 }}
                style={{
                  boxShadow: isHovered ? "0 0 8px rgba(139,92,246,0.5)" : "none",
                }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                >
                  <Clock className="h-3 w-3 mr-1.5" />
                </motion.div>
                {duration}
              </motion.div>
              
              <motion.div
                className={cn(
                  "flex items-center px-3 py-1.5 rounded-full text-white text-[12px] bg-[#1E1E1E]",
                )}
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: isPulsing 
                    ? ["0 0 0px rgba(139,92,246,0)", "0 0 8px rgba(139,92,246,0.6)", "0 0 0px rgba(139,92,246,0)"]
                    : "0 0 0px rgba(139,92,246,0)",
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
              >
                <LevelIcon className={cn("h-3 w-3 mr-1.5", levelColor)} />
                <span className={levelColor}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </span>
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>
      
      {/* Add CSS keyframes for animations */}
      <style jsx global>{`
        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .perspective {
          perspective: 1000px;
        }
      `}</style>
    </motion.div>
  );
} 