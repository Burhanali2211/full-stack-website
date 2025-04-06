"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter, X, FileUp } from "lucide-react";
import { BlogHero } from "@/components/blog/blog-hero";
import { BlogFilter } from "@/components/blog/blog-filter";
import { BlogGrid } from "@/components/blog/blog-grid";
import { BlogBreadcrumb } from "@/components/blog/blog-breadcrumb";
import { Button } from "@/components/ui/button";
import { BackToTopButton } from "@/components/ui/back-to-top-button";
import { BlogPost, BlogCategory } from "@/types/blog";
import { useToast } from "@/components/ui/use-toast";
import { blogPosts } from "@/data/mock-blog-posts";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  // Filtering state
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "All">("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories and tags from posts
  const categories: BlogCategory[] = [
    "All",
    ...Array.from(new Set(blogPosts.map(post => post.category))),
  ] as BlogCategory[];
  
  const allTags = blogPosts.flatMap(post => post.tags);
  const tags = Array.from(new Set(allTags)).sort();

  // Fetch posts (simulated)
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        setPosts(blogPosts);
        setFilteredPosts(blogPosts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Apply filters
  useEffect(() => {
    const applyFilters = () => {
      let result = [...posts];
      if (selectedCategory !== "All") {
        result = result.filter(post => post.category === selectedCategory);
      }
      if (selectedTags.length > 0) {
        result = result.filter(post => selectedTags.some(tag => post.tags.includes(tag)));
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          post =>
            post.title.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      setFilteredPosts(result);
    };
    if (posts.length) {
      applyFilters();
    }
  }, [posts, selectedCategory, selectedTags, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedTags([]);
    setSearchQuery("");
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const hasActiveFilters = selectedCategory !== "All" || selectedTags.length > 0 || searchQuery.trim() !== "";

  return (
    <div className="min-h-screen bg-background">
      <BlogHero />
      
      <div className="mx-auto px-0 py-0 max-w-full">
        {/* Action Bar */} 
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4 px-4 sm:px-6">
          <BlogBreadcrumb items={[]} />
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs gap-1 bg-card border-border/60 hover:bg-accent/50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-3 w-3" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 h-3 w-3 bg-primary text-[9px] rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  {selectedTags.length + (selectedCategory !== "All" ? 1 : 0) + (searchQuery.trim() !== "" ? 1 : 0)}
                </span>
              )}
            </Button>
          </div>
        </div>
        
        {/* Filters Panel - Conditionally Rendered & Animated */} 
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden mb-4 border-b border-border/40"
          >
            <div className="p-4 bg-muted/30">
              <BlogFilter
                categories={categories}
                tags={tags}
                selectedCategory={selectedCategory}
                selectedTags={selectedTags}
                searchQuery={searchQuery}
                onCategoryChange={setSelectedCategory}
                onTagToggle={handleTagToggle}
                onSearchChange={setSearchQuery}
                onClearFilters={clearFilters}
              />
            </div>
          </motion.div>
        )}
        
        {/* Status Bar */} 
        {(isLoading || hasActiveFilters) && !showFilters && (
          <div className="text-xs text-muted-foreground mb-4 px-4 sm:px-6 flex items-center gap-2">
            {isLoading ? (
              <Skeleton className="h-4 w-32 bg-muted/40" />
            ) : (
              <>
                Showing <span className="font-medium text-foreground">{filteredPosts.length}</span> of <span className="font-medium text-foreground">{posts.length}</span> posts
                {hasActiveFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="ml-1 h-5 px-1 py-0 text-[10px] text-muted-foreground hover:text-foreground gap-1"
                  >
                    <X className="h-2.5 w-2.5"/>
                    Reset
                  </Button>
                )}
              </>
            )}
          </div>
        )}
        
        {/* Main Content Area */} 
        <div className="space-y-5">
          {/* Blog Grid */} 
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-72 w-full bg-muted/40 rounded-lg" />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <BlogGrid posts={filteredPosts} className="w-full" />
          ) : (
            <div className="text-center py-12 bg-card/50 rounded-lg border border-dashed border-border/40">
              <FileUp className="h-8 w-8 text-muted-foreground mx-auto mb-3 opacity-50" />
              <h3 className="text-base font-medium mb-1">No posts found</h3>
              <p className="text-xs text-muted-foreground mb-3">
                Try adjusting your filters or search query.
              </p>
              <Button 
                onClick={clearFilters} 
                variant="outline"
                size="sm"
                className="h-7 text-xs bg-card border-border/60"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <BackToTopButton />
    </div>
  );
} 