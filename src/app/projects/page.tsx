import { Metadata } from 'next';
import { ProjectsClient } from '@/components/projects/ProjectsClient';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects - Educational Platform',
  description: 'Explore our collection of educational projects and hands-on learning experiences.',
};

export default function ProjectsPage() {
  const categories = Array.from(new Set(projects.map(project => project.category)));
  const technologies = Array.from(
    new Set(projects.flatMap(project => project.technologies))
  ).sort();

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Educational Projects
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our collection of hands-on projects designed to help you learn and grow as a developer.
        </p>
      </div>

      <ProjectsClient 
        projects={projects}
        categories={categories}
        technologies={technologies}
      />
    </div>
  );
} 