"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

const technologies = [
  { name: "Next.js", logo: "/logos/nextjs.svg" },
  { name: "React", logo: "/logos/react.svg" },
  { name: "TypeScript", logo: "/logos/typescript.svg" },
  { name: "Tailwind CSS", logo: "/logos/tailwind.svg" },
  { name: "Prisma", logo: "/logos/prisma.svg" },
  { name: "MongoDB", logo: "/logos/mongodb.svg" },
  { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
  { name: "Supabase", logo: "/logos/supabase.svg" },
];

export function TechStack() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
      },
    },
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 max-w-3xl mx-auto"
    >
      {/* Background gradient - enhanced for better visibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-indigo-500/10 via-transparent to-transparent opacity-70" />

      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          variants={itemVariants}
          className="group relative flex flex-col items-center justify-center p-3 sm:p-4 md:p-6 rounded-xl glass-effect card-shadow hover:card-hover border border-gray-200/50 dark:border-gray-700/50"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-2 sm:mb-3 md:mb-4">
            {isLoading && (
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-pulse" />
            )}
            <div className="relative w-full h-full">
              <Image
                src={tech.logo}
                alt={tech.name}
                className="object-contain filter dark:invert-[0.85] transition-transform duration-300 group-hover:scale-110"
                fill
                sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 64px"
                priority={index < 4}
                onLoad={handleImageLoad}
              />
            </div>
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-300 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors text-center">
            {tech.name}
          </span>
          
          {/* Hover effect overlay - enhanced for better visibility */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Spotlight effect on hover */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden pointer-events-none">
            <div className="absolute -inset-px bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-sm group-hover:animate-pulse-slow" />
          </div>

          {/* Border effect on hover */}
          <div className="absolute inset-0 rounded-xl border border-indigo-500/0 group-hover:border-indigo-500/30 dark:group-hover:border-indigo-500/20 transition-colors duration-300" />
        </motion.div>
      ))}
    </motion.div>
  );
} 