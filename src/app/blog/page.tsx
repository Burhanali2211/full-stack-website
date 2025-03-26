"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/main-layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Sample blog posts data
const posts = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    description: "Learn how to set up a new React project with TypeScript and understand the basics of type safety in your components.",
    date: "2024-03-15",
    readTime: "8 min read",
    category: "React",
    tags: ["React", "TypeScript", "Web Development"],
    image: "/images/blog/react-typescript.jpg",
  },
  {
    id: "2",
    title: "Building Scalable APIs with Node.js and Express",
    description: "A comprehensive guide to creating robust and scalable REST APIs using Node.js and Express framework.",
    date: "2024-03-12",
    readTime: "12 min read",
    category: "Backend",
    tags: ["Node.js", "Express", "API", "Backend"],
    image: "/images/blog/nodejs-express.jpg",
  },
  // Add more blog posts as needed
];

// Blog categories
const categories = ["All", "React", "Backend", "DevOps", "Machine Learning", "Web Development"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        {/* Hero Section */}
        <div className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Educational Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore in-depth articles, tutorials, and insights about programming and technology
            </p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 bg-background/50 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="container mx-auto px-4 mb-8">
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
        </div>

        {/* Blog Posts Grid */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/blog/${post.id}`}>
                  <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-primary/10">
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {post.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary/80">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-primary/10">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Read Article</span>
                          <ArrowRight className="h-4 w-4 text-primary" />
                        </div>
                        <Badge variant="secondary" className="bg-primary/5 text-primary/80">
                          {post.category}
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