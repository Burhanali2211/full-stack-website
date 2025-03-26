import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MainLayout from './main-layout';

interface ProjectLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ProjectLayout({
  title,
  description,
  children,
}: ProjectLayoutProps) {
  return (
    <MainLayout>
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground mb-12">{description}</p>

          {children}
        </div>
      </div>
    </MainLayout>
  );
} 