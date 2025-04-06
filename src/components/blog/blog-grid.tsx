"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogPost } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogGridProps {
  posts: BlogPost[];
  featuredPost?: boolean;
  initialPosts?: number;
  className?: string;
  variant?: "default" | "compact";
}

export function BlogGrid({
  posts,
  featuredPost = true,
  initialPosts = 7, // Adjusted to fit 3 columns + featured
  className,
  variant = "default",
}: BlogGridProps) {
  const [visiblePosts, setVisiblePosts] = useState(initialPosts);
  
  const hasMorePosts = visiblePosts < posts.length;
  
  // Load 6 more posts (2 rows for 3-col layout)
  const loadMorePosts = () => {
    setVisiblePosts((prev) => Math.min(prev + 6, posts.length));
  };

  const showFeaturedPost = featuredPost && posts.length > 0;
  
  // Adjust slicing for featured post
  const postsToDisplay = showFeaturedPost 
    ? posts.slice(1, visiblePosts) 
    : posts.slice(0, visiblePosts);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Featured Post */} 
      {showFeaturedPost && (
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="show"
          className="mb-5"
        >
          <BlogCard 
            post={posts[0]} 
            variant="featured" 
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
          />
        </motion.div>
      )}
      
      {/* Regular Post Grid */} 
      <motion.div
        key={posts.length} // Re-trigger animation on posts change
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 auto-rows-fr"
      >
        {postsToDisplay.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <BlogCard 
                post={post} 
                variant={variant}
                className="h-full shadow-sm hover:shadow-md transition-shadow duration-300"
              />
            </motion.div>
        ))}
      </motion.div>
      
      {/* Load More Button */} 
      {hasMorePosts && (
        <div className="mt-8 flex justify-center">
          <Button 
            onClick={loadMorePosts} 
            variant="outline" 
            size="sm"
            className="group px-4 py-1.5 h-8 text-xs rounded-full bg-card border-border/60 hover:bg-accent/50"
          >
            Load More Articles
            <ChevronDown className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5 text-muted-foreground" />
          </Button>
        </div>
      )}
    </div>
  );
} 