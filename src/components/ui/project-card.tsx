"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { ArrowRight, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectModal } from "./project-modal";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  longDescription?: string;
  className?: string;
  showModal?: boolean;
  showLinkFooter?: boolean;
}

const difficultyColor = {
  Beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  Advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
} as const;

export function ProjectCard(props: ProjectCardProps) {
  const { 
    title, 
    description, 
    image, 
    tags, 
    link,
    difficulty, 
    duration,
    showModal = true, 
    showLinkFooter = true,
    className,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    if (showModal) {
      setIsModalOpen(true);
    }
  }, [showModal]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const CardContent = (
    <div className="h-full group">
      <div className={cn("project-card-inner", className)}>
        <div className="project-card-image">
          <Image
            src={image}
            alt={title}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="project-card-badge">
            <div className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              difficultyColor[difficulty]
            )}>
              {difficulty}
            </div>
          </div>
        </div>
        
        <h3 className="project-card-title">
          {title}
        </h3>
        
        <p className="project-card-description">
          {description}
        </p>
        
        <div className="project-card-footer">
          <div className="inline-flex items-center text-gray-500 dark:text-gray-400">
            <Clock className="mr-1 h-3.5 w-3.5" />
            <span className="text-xs">{duration}</span>
          </div>
          <div className="h-4 w-px bg-gray-300 dark:bg-gray-700"></div>
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {showLinkFooter && (
          <div className="project-card-divider">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline">
                {showModal ? "View details" : "View project"}
              </span>
              <ChevronRight className="h-4 w-4 text-indigo-600 dark:text-indigo-400 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {showModal ? (
        <div 
          onClick={handleOpenModal}
          className="cursor-pointer h-full"
        >
          <div className="h-full shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white dark:bg-gray-800/60">
            {CardContent}
          </div>
        </div>
      ) : (
        <Link href={link} className="block h-full">
          <div className="h-full shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white dark:bg-gray-800/60">
            {CardContent}
          </div>
        </Link>
      )}

      {showModal && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          project={props}
        />
      )}
    </>
  );
}