"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/main-layout";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  // Add a third post for better appearance
  {
    id: "3",
    title: "Modern CSS Techniques Every Developer Should Know",
    description: "Explore the latest CSS features and techniques that can improve your web design and development workflow.",
    date: "2024-03-10",
    readTime: "10 min read",
    category: "Web Development",
    tags: ["CSS", "Web Design", "Frontend"],
    image: "/images/blog/modern-css.jpg",
  },
];

// Blog categories
const categories = ["All", "React", "Backend", "DevOps", "Machine Learning", "Web Development"];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Sticky Header & Search */}
        <div 
          className={cn(
            "sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md transition-shadow duration-300 py-4 px-4", 
            isScrolled && "shadow-md"
          )}
        >
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-72 lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="sm:hidden">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowMobileFilter(!showMobileFilter)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
              
              <div className="hidden sm:flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-full transition-all",
                      selectedCategory === category
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"
                        : "bg-white hover:bg-gray-50 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Categories */}
        <AnimatePresence>
          {showMobileFilter && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-wrap gap-2 justify-start">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowMobileFilter(false);
                      }}
                      className={cn(
                        "px-3 py-1 text-xs rounded-full transition-all",
                        selectedCategory === category
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"
                          : "bg-white hover:bg-gray-50 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
                      )}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <div className="relative py-12 sm:py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
            >
              Educational Blog
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-700 dark:text-gray-300"
            >
              Explore in-depth articles, tutorials, and insights about programming and technology
            </motion.p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="container mx-auto px-4 pb-20">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={childVariants}
                  whileHover={{ y: -5 }}
                  className="h-full"
                >
                  <Link href={`/blog/${post.id}`} className="h-full">
                    <Card className="group h-full overflow-hidden bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-800 rounded-xl">
                      <div className="relative w-full h-48 overflow-hidden">
                        {/* Add default image fallback for local development */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-full absolute" />
                      </div>
                      <div className="p-6 space-y-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                          {post.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 2 && (
                            <Badge variant="secondary" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                              +{post.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <div className="pt-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-800">
                          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                            <span className="text-sm font-medium">Read Article</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                          <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">No articles found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We couldn't find any articles matching your search criteria.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600"
                >
                  Clear filters
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
} 