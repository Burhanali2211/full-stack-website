"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Star, Play, X, MessageSquare, Bookmark, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Section {
  title: string;
  content: string;
  duration: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  author: {
    name: string;
    title: string;
  };
  tags: string[];
  image: string;
  progress?: number;
  rating: number;
  likes: number;
  comments: number;
  popularity: number;
  videoId: string;
  slug: string;
  sections: Section[];
}

interface TutorialCardProps {
  tutorial: Tutorial;
  index: number;
  onSave: (id: string) => void;
  onShare: (id: string) => void;
  onLike: (id: string) => void;
  isSaved: boolean;
  isLiked: boolean;
}

export function TutorialCard({ tutorial, index, onSave, onShare, onLike, isSaved, isLiked }: TutorialCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const togglePreview = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPreviewOpen(!isPreviewOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsPreviewOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }
    };

    if (isPreviewOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isPreviewOpen]);

  const levelStyles = {
    beginner: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    intermediate: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    advanced: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  };
    
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative h-full"
    >
      <Link href={`/tutorials/${tutorial.slug}`}>
        <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10">
          <div className="relative aspect-video">
            <Image 
              src={tutorial.image}
              alt={tutorial.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {tutorial.videoId && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute inset-0 m-auto bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
                onClick={togglePreview}
              >
                <Play className="h-6 w-6" />
              </Button>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10">{tutorial.category}</Badge>
              <Badge variant="outline" className={cn("capitalize border", levelStyles[tutorial.level])}>
                {tutorial.level}
              </Badge>
              {tutorial.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-300 line-clamp-2">
                {tutorial.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {tutorial.description}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{tutorial.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{tutorial.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4" />
                <span>{tutorial.comments}</span>
              </div>
            </div>
            {tutorial.progress !== undefined && (
              <div className="pt-1">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{tutorial.progress}%</span>
                </div>
                <Progress value={tutorial.progress} className="h-1.5" />
              </div>
            )}
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{tutorial.author.name}</span>
                <span className="text-xs text-muted-foreground">
                  {tutorial.author.title}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    onLike(tutorial.id);
                  }}
                  className={cn(
                    "hover:text-primary transition-colors duration-300",
                    isLiked && "text-primary"
                  )}
                >
                  <Star className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    onSave(tutorial.id);
                  }}
                  className={cn(
                    "hover:text-primary transition-colors duration-300",
                    isSaved && "text-primary"
                  )}
                >
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    onShare(tutorial.id);
                  }}
                  className="hover:text-primary transition-colors duration-300"
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-card rounded-lg shadow-xl max-w-4xl w-full mx-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">{tutorial.title}</h2>
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => setIsPreviewOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="aspect-video relative">
              <iframe
                src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                title={tutorial.title}
              />
            </div>
            <div className="p-4 border-t">
              <p className="text-muted-foreground">{tutorial.description}</p>
            </div>
          </div>
          </div>
        )}
      </motion.div>
  );
}