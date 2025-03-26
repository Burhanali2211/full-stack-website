import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Badge } from './badge';
import { Button } from './button';
import { X, Github, ExternalLink, BookOpen } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubUrl?: string;
    liveUrl?: string;
    docsUrl?: string;
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    duration: string;
    longDescription?: string;
  };
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!isOpen) return null;

  const difficultyColor = {
    Beginner: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Intermediate: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Advanced: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative mx-4 max-w-4xl overflow-hidden rounded-lg bg-background shadow-xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 text-muted-foreground backdrop-blur-sm transition-colors hover:bg-background hover:text-foreground"
          >
            <X size={20} />
          </button>

          {/* Project Image */}
          <div className="relative h-64 w-full sm:h-80">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <Badge
                variant="outline"
                className={`${difficultyColor[project.difficulty]} border-0`}
              >
                {project.difficulty}
              </Badge>
              <Badge variant="outline" className="border-0">
                {project.duration}
              </Badge>
            </div>

            <p className="mb-6 text-muted-foreground">
              {project.longDescription || project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="mb-2 text-sm font-semibold uppercase text-muted-foreground">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-2 py-0.5">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <Button variant="outline" className="gap-2" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github size={18} />
                    GitHub
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="outline" className="gap-2" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                </Button>
              )}
              {project.docsUrl && (
                <Button variant="outline" className="gap-2" asChild>
                  <a href={project.docsUrl} target="_blank" rel="noopener noreferrer">
                    <BookOpen size={18} />
                    Documentation
                  </a>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 