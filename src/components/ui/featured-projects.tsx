"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FeaturedProject {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Get difficulty color based on level
  const getDifficultyColor = (difficulty: FeaturedProject["difficulty"]) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <section className="w-full py-24 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <div className="inline-flex mb-4 items-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              <Rocket size={16} className="mr-1" />
              Featured Projects
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Learn by building
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"> real-world applications</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-lg">
              Our project-based approach ensures you gain practical experience while learning the theories behind modern web development.
            </p>
            <Button variant="outline" asChild className="rounded-lg group">
              <Link href="/projects" className="inline-flex items-center">
                Browse all projects
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="grid gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Link href={project.link} className="absolute inset-0 z-10" aria-label={project.title}>
                  <span className="sr-only">View project</span>
                </Link>
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="sm:w-1/3 relative h-48 sm:h-auto bg-indigo-50 dark:bg-indigo-900/20">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-contain p-4"
                      priority={index === 0}
                    />
                  </div>
                  <div className="sm:w-2/3 p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock size={14} className="mr-1" />
                      {project.duration}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/30 dark:group-hover:border-indigo-500/30 rounded-xl pointer-events-none transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 