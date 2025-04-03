"use client";

import { useState, useEffect, Suspense, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code, BookOpen, BookMarked, ChevronRight, Search as SearchIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: "project" | "blog" | "tutorial";
  href: string;
}

// Enhanced search database - would be loaded from backend in production
// This should be in a shared location with the navbar component in a real app
const searchDatabase: SearchResult[] = [
  { id: 1, title: "Building a Chat App", description: "Learn to build a real-time chat application with WebSockets", category: "project", href: "/projects/chat-app" },
  { id: 2, title: "CSS Animation Tricks", description: "Master CSS animations for modern UI experiences", category: "blog", href: "/blog/css-animation-tricks" },
  { id: 3, title: "Portfolio Website", description: "Create a professional developer portfolio", category: "project", href: "/projects/portfolio" },
  { id: 4, title: "Next.js Fundamentals", description: "Learn the basics of Next.js from scratch", category: "tutorial", href: "/tutorials/nextjs-fundamentals" },
  { id: 5, title: "TypeScript for React", description: "Get started with TypeScript in React applications", category: "tutorial", href: "/tutorials/typescript-for-react" },
  { id: 6, title: "Responsive Design Patterns", description: "Modern approaches to responsive web design", category: "blog", href: "/blog/responsive-design-patterns" },
  { id: 7, title: "E-commerce Dashboard", description: "Build a complete e-commerce admin dashboard", category: "project", href: "/projects/ecommerce-dashboard" },
  { id: 8, title: "API Authentication", description: "Implement secure authentication for your APIs", category: "tutorial", href: "/tutorials/api-authentication" },
  { id: 9, title: "Database Optimization", description: "Tips and tricks for optimizing database performance", category: "blog", href: "/blog/database-optimization" },
  { id: 10, title: "Tailwind CSS Masterclass", description: "Master utility-first CSS with Tailwind", category: "tutorial", href: "/tutorials/tailwind-css-masterclass" },
  { id: 11, title: "React State Management", description: "Compare different state management solutions for React apps", category: "blog", href: "/blog/react-state-management" },
  { id: 12, title: "Node.js REST API", description: "Build a RESTful API with Node.js, Express, and MongoDB", category: "project", href: "/projects/nodejs-rest-api" },
  { id: 13, title: "GraphQL Basics", description: "Introduction to GraphQL for modern APIs", category: "tutorial", href: "/tutorials/graphql-basics" },
  { id: 14, title: "CSS Grid Layout", description: "Master CSS Grid for complex layouts", category: "tutorial", href: "/tutorials/css-grid-layout" },
  { id: 15, title: "JWT Authentication", description: "Implement JWT authentication in your web applications", category: "tutorial", href: "/tutorials/jwt-authentication" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState(query);

  // Filter results based on the query and active filter - optimized with debounce
  useEffect(() => {
    // Set loading state
    setIsLoading(true);
    
    // Simulate network delay for realistic search experience - using debounce pattern
    const timer = setTimeout(() => {
      if (!query) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      // Filter database based on search term - case insensitive search
      const searchQuery = query.toLowerCase();
      let filtered = searchDatabase.filter(item => {
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        
        return title.includes(searchQuery) || description.includes(searchQuery);
      });

      // Apply category filter if not "all"
      if (activeFilter !== "all") {
        filtered = filtered.filter(item => item.category === activeFilter);
      }
      
      setResults(filtered);
      setIsLoading(false);
    }, 300); // Reduced delay for better responsiveness

    return () => clearTimeout(timer);
  }, [query, activeFilter]);

  // Update search term and URL when submitting the search form
  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL without full page reload
    const url = new URL(window.location.href);
    url.searchParams.set("q", searchTerm);
    window.history.pushState({}, "", url.toString());
  }, [searchTerm]);

  // Category counts for filters - memoized to prevent recalculation on every render
  const categoryCounts = useMemo(() => ({
    all: results.length,
    project: results.filter(r => r.category === "project").length,
    tutorial: results.filter(r => r.category === "tutorial").length,
    blog: results.filter(r => r.category === "blog").length,
  }), [results]);

  return (
    <div className="container py-16 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-16 pb-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {isLoading
            ? "Searching..."
            : results.length > 0
            ? `Found ${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`
            : `No results found for "${query}"`}
        </p>

        {/* Search form */}
        <div className="max-w-2xl mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for projects, tutorials, blog posts..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent"
              />
            </div>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              Search
            </Button>
          </form>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === "all"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            All ({categoryCounts.all})
          </button>
          <button
            onClick={() => setActiveFilter("project")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === "project"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Projects ({categoryCounts.project})
          </button>
          <button
            onClick={() => setActiveFilter("tutorial")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === "tutorial"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Tutorials ({categoryCounts.tutorial})
          </button>
          <button
            onClick={() => setActiveFilter("blog")}
            className={`px-4 py-2 rounded-full text-sm ${
              activeFilter === "blog"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            Blog Posts ({categoryCounts.blog})
          </button>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          </div>
        ) : results.length > 0 ? (
          <div className="grid gap-4 md:gap-6">
            {results.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={result.href}
                  className="block p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                          {result.category === "project" ? (
                            <>
                              <Code className="mr-1 h-3 w-3" />
                              Project
                            </>
                          ) : result.category === "blog" ? (
                            <>
                              <BookOpen className="mr-1 h-3 w-3" />
                              Blog Post
                            </>
                          ) : (
                            <>
                              <BookMarked className="mr-1 h-3 w-3" />
                              Tutorial
                            </>
                          )}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-2">{result.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {result.description}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-4">
                      <span className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 group">
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="mx-auto max-w-md">
              <h3 className="text-lg font-medium mb-3">No results found</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We couldn't find any matches for "{query}". Try adjusting your search term or browse our popular content.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button asChild variant="outline">
                  <Link href="/tutorials">Explore Tutorials</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/projects">Browse Projects</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/blog">Read Blog</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

// Fallback loading state for Suspense
function SearchLoading() {
  return (
    <div className="container max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-36">
      <div className="flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
      </div>
    </div>
  );
}

export default function SearchPage() {
  // Wrap in Suspense boundary to handle useSearchParams()
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
} 