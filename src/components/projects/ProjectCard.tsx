import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="h-full"
      >
        <Card className="group relative h-full overflow-hidden bg-background">
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 90vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
          </div>
          
          <div className="relative p-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-primary/10">
                {project.category}
              </Badge>
            </div>
            
            <h3 className="mt-4 text-xl font-semibold tracking-tight">
              {project.title}
            </h3>
            
            <p className="mt-2 line-clamp-2 text-muted-foreground">
              {project.description}
            </p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{project.technologies.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Image
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(project.author.name)}`}
                  alt={project.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span>{project.author.name}</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
} 