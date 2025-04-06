"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, Search, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { BlogCategory } from "@/types/blog";

interface BlogFilterProps {
  categories: BlogCategory[];
  tags: string[];
  selectedCategory: BlogCategory | "All";
  selectedTags: string[];
  searchQuery: string;
  onCategoryChange: (category: BlogCategory | "All") => void;
  onTagToggle: (tag: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export function BlogFilter({
  categories,
  tags,
  selectedCategory,
  selectedTags,
  searchQuery,
  onCategoryChange,
  onTagToggle,
  onSearchChange,
  onClearFilters
}: BlogFilterProps) {
  const hasActiveFilters = selectedCategory !== "All" || selectedTags.length > 0 || searchQuery.trim() !== "";

  return (
    <div className="w-full space-y-3">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search posts by title, description, or tag..."
          className="pl-9 pr-8 h-9 text-sm bg-card border-border/60 rounded-md"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onSearchChange("")}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-sm"
          >
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>

      {/* Filter Controls */} 
      <div className="flex flex-wrap items-center gap-2">
        {/* Category Filter */} 
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-card border-border/60 hover:bg-accent/50">
              <Filter className="h-3 w-3" />
              {selectedCategory === "All" ? "Category" : selectedCategory}
              {selectedCategory !== "All" && (
                <span className="ml-0.5 h-1 w-1 bg-primary rounded-full" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-48 p-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onCategoryChange(category)}
                className="w-full justify-start h-8 text-xs capitalize"
              >
                {category}
              </Button>
            ))}
          </PopoverContent>
        </Popover>

        {/* Tag Filter */} 
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 bg-card border-border/60 hover:bg-accent/50">
              Tags
              {selectedTags.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-4 px-1.5 text-[10px] font-medium rounded-sm">
                  {selectedTags.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-64 p-0">
            <div className="p-2 text-xs font-medium border-b border-border/40">Filter by Tags</div>
            <div className="max-h-60 overflow-y-auto p-1 space-y-1">
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => onTagToggle(tag)}
                  className="w-full justify-between h-8 text-xs"
                >
                  {tag}
                  {selectedTags.includes(tag) && (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  )}
                </Button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Clear Filters Button */} 
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="h-7 text-xs text-muted-foreground hover:text-foreground px-2 gap-1"
          >
            <X className="h-3 w-3" />
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
} 