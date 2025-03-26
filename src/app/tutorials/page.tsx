"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/main-layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Sample tutorials data
const tutorials = [
  {
    id: "1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development, including HTML, CSS, and JavaScript.",
    duration: "2 hours",
    level: "beginner",
    category: "Web Development",
    topics: ["HTML", "CSS", "JavaScript"],
    image: "/images/tutorials/web-dev-intro.jpg",
  },
  {
    id: "2",
    title: "Advanced React Patterns",
    description: "Master advanced React patterns and best practices for building scalable applications.",
    duration: "3 hours",
    level: "advanced",
    category: "React",
    topics: ["React", "TypeScript", "Design Patterns"],
    image: "/images/tutorials/react-patterns.jpg",
  },
  // Add more tutorials as needed
];

// Tutorial categories and difficulty levels
const categories = ["All", "Web Development", "React", "Node.js", "Python", "Data Science"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function TutorialsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesCategory = selectedCategory === "All" || tutorial.category === selectedCategory;
    const matchesLevel = selectedLevel === "All Levels" || tutorial.level === selectedLevel.toLowerCase();
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Interactive Tutorials
            </h1>
            <p className="text-lg text-muted-foreground">
              Learn programming through hands-on tutorials with step-by-step guidance
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search tutorials..."
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
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm transition-all",
                    selectedLevel === level
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tutorial Cards */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/tutorials/${tutorial.id}`}>
                  <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-primary/10">
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {tutorial.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {tutorial.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {tutorial.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" className="bg-primary/5 text-primary/80">
                            {topic}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{tutorial.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{tutorial.level.charAt(0).toUpperCase() + tutorial.level.slice(1)}</span>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-primary/10">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Start Tutorial</span>
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </div>
                        <Badge variant="secondary" className="bg-primary/5 text-primary/80">
                          {tutorial.category}
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