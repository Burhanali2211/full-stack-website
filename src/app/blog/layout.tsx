"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, TrendingUp } from 'lucide-react';

interface BlogLayoutProps {
  children: React.ReactNode;
}

const featuredPosts = [
  {
    title: "Getting Started with Python Programming",
    excerpt: "Learn the basics of Python programming language and start your coding journey.",
    date: "2024-03-15",
    readTime: 5,
  },
  {
    title: "Advanced Next.js Patterns",
    excerpt: "Explore advanced patterns and best practices in Next.js development.",
    date: "2024-03-14",
    readTime: 8,
  },
  {
    title: "Debugging Python Applications",
    excerpt: "Master the art of debugging Python applications with professional tools.",
    date: "2024-03-13",
    readTime: 10,
  },
];

const popularTags = [
  "Python",
  "Next.js",
  "React",
  "TypeScript",
  "Web Development",
  "Programming",
  "Tutorial",
  "Debugging",
];

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Blog</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 rounded-full border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <main className="lg:col-span-3">{children}</main>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Featured posts */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border p-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Featured Posts</h2>
            </div>
            <div className="space-y-4">
              {featuredPosts.map((post) => (
                <motion.article
                  key={post.title}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                >
                  <h3 className="font-medium hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* Popular tags */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-lg border p-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Popular Tags</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Newsletter subscription */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg border p-4"
          >
            <h2 className="font-semibold mb-2">Subscribe to our newsletter</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest articles and tutorials directly in your inbox.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.section>
        </aside>
      </div>
    </div>
  );
} 