"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectLayout from "@/components/project-layout";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Github, Star, GitFork, Users } from "lucide-react";

interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  html_url: string;
}

export default function ApiDashboardProject() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/yourusername/repos");
        if (!response.ok) throw new Error("Failed to fetch repositories");
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <ProjectLayout
      title="GitHub API Dashboard"
      description="A real-time dashboard that visualizes GitHub repository data using the GitHub REST API. Built with Next.js and TypeScript, featuring a modern UI and live data updates."
    >
      <div className="space-y-8">
        {/* Project Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="text-muted-foreground">
            This dashboard demonstrates real-time integration with the GitHub API,
            displaying repository statistics and information in an elegant and
            responsive interface. The project showcases API integration, data
            visualization, and modern React patterns.
          </p>
        </section>

        {/* Live Demo */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Live Demo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex gap-4">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </Card>
              ))
            ) : error ? (
              <Alert variant="destructive" className="col-span-full">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              repos.map((repo) => (
                <motion.div
                  key={repo.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="p-6 h-full flex flex-col">
                    <h3 className="text-lg font-semibold mb-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        {repo.name}
                      </a>
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">
                      {repo.description || "No description available"}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{repo.watchers_count}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </section>

        {/* Features */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="space-y-2 list-disc list-inside text-muted-foreground">
            <li>Real-time GitHub API integration</li>
            <li>Responsive grid layout with modern card design</li>
            <li>Loading states with skeleton placeholders</li>
            <li>Error handling and user feedback</li>
            <li>Animated transitions and hover effects</li>
            <li>TypeScript for type safety</li>
          </ul>
        </section>

        {/* Technology Stack */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js",
              "TypeScript",
              "GitHub API",
              "Tailwind CSS",
              "Framer Motion",
              "Radix UI",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </ProjectLayout>
  );
} 