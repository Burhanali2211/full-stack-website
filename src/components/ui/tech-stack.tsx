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
      setIsLoading(false);
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

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className="relative grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
    >
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          variants={itemVariants}
          className="group relative flex flex-col items-center justify-center p-6 rounded-xl glass-effect card-shadow hover:card-hover"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative w-16 h-16 mb-4">
            {isLoading && (
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse" />
            )}
            <div className="relative w-full h-full">
              <Image
                src={tech.logo}
                alt={tech.name}
                className="object-contain filter dark:invert-[0.85] transition-transform duration-300 group-hover:scale-110"
                fill
                sizes="(max-width: 768px) 64px, 96px"
                priority={index < 4}
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>
          </div>
          <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
            {tech.name}
          </span>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
      <div className="absolute inset-0 -z-10 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
    </motion.div>
  );
} 