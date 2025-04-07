"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  variant?: "default" | "featured";
  className?: string;
}

export function BlogCard({ post, index = 0, variant = "default", className }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={cn("group", className)}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div className="relative aspect-video">
            <Image
              src={imageError ? "/blog/default-cover.svg" : post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={variant === "featured" 
                ? "(max-width: 768px) 100vw, 900px" 
                : "(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 500px"
              }
              priority={variant === "featured"}
              onError={() => setImageError(true)}
            />
          </div>
          
          <div className="p-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {post.category}
              </Badge>
              {post.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="bg-muted/50 hover:bg-muted"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div>
              <h3 className={cn(
                "font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2",
                variant === "featured" ? "text-2xl" : "text-lg"
              )}>
                {post.title}
              </h3>
              <p className="mt-2 text-muted-foreground line-clamp-2">
                {post.description}
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>3 comments</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
} 