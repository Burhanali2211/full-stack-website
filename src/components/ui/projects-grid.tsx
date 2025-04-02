import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './project-card';
import { ProjectCardSkeleton } from './project-card-skeleton';
import { cn } from '@/lib/utils';

interface Project {
  id: string | number;
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
  createdAt: string | Date;
}

interface ProjectsGridProps {
  projects: Project[];
  selectedTechFilters: string[];
  selectedDifficultyFilters: string[];
  sortOption: string;
  isLoading?: boolean;
  className?: string;
  showModal?: boolean;
  showLinkFooter?: boolean;
}

const difficultyOrder = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

export function ProjectsGrid({
  projects,
  selectedTechFilters,
  selectedDifficultyFilters,
  sortOption,
  isLoading,
  className,
  showModal = true,
  showLinkFooter = true,
}: ProjectsGridProps) {
  const filteredAndSortedProjects = useMemo(() => {
    if (isLoading) return [];

    // Filter projects
    let filtered = projects;

    if (selectedTechFilters.length > 0) {
      filtered = filtered.filter((project) =>
        project.tags.some((tag) => selectedTechFilters.includes(tag))
      );
    }

    if (selectedDifficultyFilters.length > 0) {
      filtered = filtered.filter((project) =>
        selectedDifficultyFilters.includes(project.difficulty)
      );
    }

    // Sort projects
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'difficulty-asc':
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'difficulty-desc':
          return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
        default:
          return 0;
      }
    });
  }, [projects, selectedTechFilters, selectedDifficultyFilters, sortOption, isLoading]);

  if (isLoading) {
    return (
      <div className={cn("projects-grid", className)} role="list">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div 
      className={cn("projects-grid", className)}
      role="list"
      aria-label="Projects grid"
    >
      <AnimatePresence mode="popLayout">
        {filteredAndSortedProjects.map((project) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.2 },
              layout: { duration: 0.3 },
            }}
            className="h-full"
          >
            <ProjectCard 
              {...project} 
              showModal={showModal}
              showLinkFooter={showLinkFooter}
            />
          </motion.div>
        ))}
        {filteredAndSortedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <p className="text-muted-foreground">
              No projects match your selected filters.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 