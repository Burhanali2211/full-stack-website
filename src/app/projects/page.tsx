"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Code2, GitBranch, Star, Eye } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/main-layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Sample projects data
const projects = [
  {
    id: "1",
    title: "React Task Manager",
    description: "A full-stack task management application built with React, Node.js, and MongoDB",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    difficulty: "intermediate",
    stars: 245,
    forks: 68,
    watchers: 156,
    image: "/images/projects/task-manager.jpg",
  },
  {
    id: "2",
    title: "Python Data Analysis Tool",
    description: "A data analysis tool built with Python, Pandas, and Matplotlib",
    technologies: ["Python", "Pandas", "Matplotlib", "NumPy"],
    difficulty: "advanced",
    stars: 189,
    forks: 45,
    watchers: 98,
    image: "/images/projects/data-analysis.jpg",
  },
  // Add more projects as needed
];

// Project categories and difficulty levels
const categories = ["All", "Web", "Mobile", "Data Science", "Machine Learning", "DevOps"];
const difficulties = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) => {
    const matchesDifficulty = selectedDifficulty === "All Levels" || 
      project.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDifficulty && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Explore Projects
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover hands-on projects to build your portfolio and enhance your skills
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search projects..."
                className="pl-10 bg-background/50 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-all",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-all",
                    selectedDifficulty === difficulty
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Project Cards */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/projects/${project.id}`}>
                  <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-primary/10">
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-primary/5 text-primary/80">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="h-4 w-4" />
                          <span>{project.forks}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{project.watchers}</span>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-primary/10">
                        <div className="flex items-center gap-2">
                          <Code2 className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">View Project</span>
                        </div>
                        <Badge
                          className={cn(
                            project.difficulty === "beginner" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                            project.difficulty === "intermediate" ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                            "bg-red-500/10 text-red-400 border-red-500/20"
                          )}
                        >
                          {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 