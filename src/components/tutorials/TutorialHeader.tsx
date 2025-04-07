"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, Award, Share2, Bookmark, Heart, Star, Download, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Tutorial } from "./TutorialCard";

interface TutorialHeaderProps {
  tutorial: Tutorial;
  onSave: () => void;
  onShare: () => void;
  onLike: () => void;
  isSaved: boolean;
  isLiked: boolean;
}

/**
 * Header component for tutorial detail page with progress tracking and actions
 */
const TutorialHeader: FC<TutorialHeaderProps> = ({
  tutorial,
  onSave,
  onShare,
  onLike,
  isSaved,
  isLiked
}) => {
  const { 
    title, 
    description, 
    level, 
    duration, 
    author, 
    tags, 
    progress = 0,
    rating,
    likes,
    comments 
  } = tutorial;

  return (
    <div className="relative">
      {/* Gradient background with subtle animation */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-background to-background opacity-80" />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute -top-40 -right-40 h-[500px] w-[500px] opacity-5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M46.5,-78.3C59.4,-71.3,68.9,-58.1,77.5,-44.1C86.1,-30.1,93.9,-15.1,93.5,-0.2C93.1,14.6,84.6,29.1,74.4,41.1C64.1,53.1,52.1,62.5,39.1,69.3C26.1,76.1,13,80.3,-1.7,83C-16.5,85.8,-33,87.2,-45.9,80.6C-58.7,74,-67.9,59.4,-75.4,44.7C-82.9,30,-88.7,15,-89.9,-0.7C-91.1,-16.3,-87.7,-32.7,-79.1,-45.3C-70.6,-57.9,-56.8,-66.8,-42.8,-73.2C-28.8,-79.6,-14.4,-83.5,0.6,-84.5C15.6,-85.5,31.2,-83.7,46.5,-78.3Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="container py-8 space-y-6">
        {/* Navigation and Metadata */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <Button variant="ghost" asChild size="sm" className="h-9">
            <Link href="/tutorials" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Tutorials
            </Link>
          </Button>
          
          <div className="h-4 w-px bg-border" />
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="h-4 w-4" />
            <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({likes} ratings)</span>
          </div>
        </div>

        {/* Main Header Content */}
        <div className="grid md:grid-cols-[1fr_250px] gap-8 items-start">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-3"
            >
              {title}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mb-6 text-lg"
            >
              {description}
            </motion.p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="px-2 py-1">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-sm font-medium">{author.name}</span>
                <span className="text-xs text-muted-foreground">{author.title}</span>
              </div>
            </div>
          </div>
          
          {/* Progress and Actions Card */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border bg-card shadow-sm p-6 sticky top-20"
            >
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Your Progress</h3>
                    <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{comments} comments</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Resources (4)</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="w-full"
                          onClick={onSave}
                        >
                          <Bookmark 
                            className={`h-4 w-4 ${isSaved ? 'fill-primary text-primary' : ''}`} 
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isSaved ? 'Saved' : 'Save tutorial'}</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="w-full"
                          onClick={onShare}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Share tutorial</p>
                      </TooltipContent>
                    </Tooltip>
                    
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="w-full"
                          onClick={onLike}
                        >
                          <Heart 
                            className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{isLiked ? 'Liked' : 'Like tutorial'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <Button className="w-full">
                  {progress > 0 ? "Continue Learning" : "Start Learning"}
                </Button>
                
                <Button variant="outline" className="w-full">
                  Download Materials
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialHeader; 