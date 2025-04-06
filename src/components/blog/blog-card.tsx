"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function BlogCard({ post, variant = "default", className }: BlogCardProps) {
  // Format date nicely
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Calculate read time more accurately
  const readTime = Math.max(Math.ceil(post.content.length / 1500), 1);
  
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
      className={cn("group h-full", className)}
    >
      <Link href={`/blog/${post.slug}`} className="h-full block">
        <Card 
          className={cn(
            "overflow-hidden h-full border border-border/40 bg-card relative",
            "flex flex-col rounded-lg",
            "transition-all duration-300 ease-out",
            "group-hover:border-border/60"
          )}
        >
          {/* Image Area */}
          <div className={cn(
            "relative overflow-hidden w-full", 
            variant === "featured" ? "aspect-[16/8] max-h-72" : "aspect-[16/10] max-h-56",
          )}>
            {/* Category Badge */}
            <div className="absolute top-2 right-2 z-20">
              <Badge 
                variant="secondary" 
                className="bg-background/80 backdrop-blur-sm text-[10px] px-1.5 py-0.5 capitalize border border-transparent"
              >
                {post.category}
              </Badge>
            </div>
            
            {/* Image */} 
            <Image
              src={post.image || "/images/blog/placeholder.webp"}
              alt={post.title}
              fill
              sizes={variant === "featured" 
                ? "(max-width: 768px) 100vw, 900px" 
                : "(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 500px"
              }
              className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
              priority={variant === "featured"}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent opacity-80" />
            
            {/* Metadata inside image for Featured */}
            {variant === 'featured' && (
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10 text-white">
                <div className="flex items-center gap-3 text-xs opacity-90 mb-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {formattedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {readTime} min read
                  </span>
                </div>
                <h3 className="font-semibold text-lg sm:text-xl line-clamp-2">
                  {post.title}
                </h3>
              </div>
            )}
          </div>

          {/* Content Area - Only shown for non-featured cards */}
          {variant !== 'featured' && (
            <CardHeader className="p-3 sm:p-4 flex-grow">
              {/* Metadata */}
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1.5">
                <span className="flex items-center gap-1">
                  <Calendar className="h-2.5 w-2.5 opacity-70" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5 opacity-70" />
                  {readTime} min read
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
              
              {/* Description */} 
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {post.description}
              </p>
            </CardHeader>
          )}

          {/* Footer - Tags and Read More */}
          <CardFooter className={cn(
            "pt-0 pb-3 px-3 sm:pb-4 sm:px-4 mt-auto",
            variant === "featured" && "p-4 pt-0 border-t border-border/20 bg-muted/20"
          )}>
            <div className="flex items-end justify-between w-full">
              {/* Tags */} 
              <div className="flex flex-wrap gap-1 items-center">
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[9px] px-1 py-0 border-border/50 text-muted-foreground font-normal">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 2 && (
                  <Badge variant="outline" className="text-[9px] px-1 py-0 border-border/50 text-muted-foreground font-normal">
                    +{post.tags.length - 2}
                  </Badge>
                )}
              </div>
              
              {/* Read More Arrow */}
              <div className="flex-shrink-0 ml-1">
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-0.5" />
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
} 