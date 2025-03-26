"use client";

import Image from "next/image";
import { useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectModal } from "./project-modal";

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
    difficulty, 
    duration 
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div
        onClick={handleOpenModal}
        className="group relative cursor-pointer overflow-hidden rounded-lg bg-gradient-to-br from-card to-card/80 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      >
        <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(650px_circle_at_50%_50%,rgba(255,255,255,0.1),transparent_80%)]" />

        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <Badge
              variant="outline"
              className={`${difficultyColor[difficulty]} border-0`}
            >
              {difficulty}
            </Badge>
            <Badge variant="outline" className="border-0 bg-white/20 text-white">
              {duration}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="px-2 py-0.5 transition-colors hover:bg-primary/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="group/link inline-flex items-center gap-2 text-primary hover:text-primary/80">
            View Details <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </div>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={props}
      />
    </>
  );
}