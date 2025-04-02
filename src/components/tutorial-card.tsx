"use client";

import * as React from 'react';
import { useState } from 'react';
import { motion } from "framer-motion";
import { Star, Clock, Users, ArrowRight, Video, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { TutorialVideo } from "@/components/tutorial-video";
import { useRouter } from 'next/navigation';
import { 
  updateTutorialProgress, 
  getTutorialProgressById 
} from "@/lib/tutorial-progress";
import Image from "next/image";

// Type definitions
type IconType = React.ElementType;

// Tutorial type
type Tutorial = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  rating: number;
  students: number;
  progress: number;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  videoId?: string;
};

type TutorialCardProps = {
  tutorial: Tutorial;
  onProgressUpdate?: (tutorialId: string, progress: number) => void;
  showVideo?: boolean;
  getCardColors: (tutorial: Tutorial) => string;
  getTechnologyIcon: (tutorial: Tutorial) => IconType;
};

export function TutorialCard({ 
  tutorial, 
  onProgressUpdate,
  showVideo = false,
  getCardColors,
  getTechnologyIcon
}: TutorialCardProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(getTutorialProgressById(tutorial.id));
  const [showFullVideo, setShowFullVideo] = useState(false);
  
  // Navigate to tutorial
  const handleNavigate = () => {
    router.push(`/tutorials/${tutorial.id}`);
  };
  
  // Update progress handler
  const handleUpdateProgress = () => {
    // Add a random progress increment between 5-15% to make it more fun
    const increment = Math.floor(Math.random() * 11) + 5;
    const newProgress = Math.min(100, progress + increment);
    
    // Update local state
    setProgress(newProgress);
    
    // Update localStorage
    updateTutorialProgress(tutorial.id, newProgress);
    
    // Call parent callback if provided
    if (onProgressUpdate) {
      onProgressUpdate(tutorial.id, newProgress);
    }
    
    // Navigate to the tutorial
    handleNavigate();
  };

  // Toggle video preview
  const toggleVideoPreview = () => {
    setShowFullVideo(!showFullVideo);
  };

  // Get technology icon component
  const TechIcon = getTechnologyIcon(tutorial);
  const cardColors = getCardColors(tutorial);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-xl overflow-hidden shadow-sm border border-muted/40 bg-card/50 backdrop-blur-sm hover:shadow-md transition-shadow",
        "hover:border-primary/40"
      )}
    >
      {showFullVideo && tutorial.videoId ? (
        <div className="relative aspect-video">
          <TutorialVideo 
            videoId={tutorial.videoId} 
            title={tutorial.title} 
            autoplay={true}
          />
          <Button 
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
            onClick={toggleVideoPreview}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div 
          className={`relative aspect-video group cursor-pointer overflow-hidden ${cardColors}`}
          onClick={handleNavigate}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
          
          {tutorial.videoId && (
            <div className="absolute top-2 right-2 z-20">
              <div className="flex items-center bg-black/30 text-white px-2 py-1 rounded-full backdrop-blur-sm text-xs">
                <Video className="h-3 w-3 mr-1" />
                <span>Video</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-center h-full">
            <TechIcon className="h-24 w-24 text-white/20 opacity-50 group-hover:scale-110 transition-transform duration-300" />
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white line-clamp-1">{tutorial.title}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-black/30 text-white border-white/20 backdrop-blur-sm">
                  {tutorial.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-amber-300">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span className="text-xs">{tutorial.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold line-clamp-1">{tutorial.title}</h3>
          {tutorial.videoId && (
            <div className="ml-2 text-primary">
              <Video className="h-4 w-4" />
            </div>
          )}
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{tutorial.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tutorial.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="bg-primary/5 text-primary/80 border-primary/20">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {tutorial.duration}
          </div>
          
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {tutorial.students.toLocaleString()}
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Progress</span>
            <span className={progress > 0 ? "text-primary" : "text-muted-foreground"}>{progress}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
        
        <div className="flex gap-2">
          {tutorial.videoId && (
            <Button 
              variant="outline"
              size="sm"
              className="flex-1 text-muted-foreground hover:text-foreground"
              onClick={toggleVideoPreview}
            >
              <Video className="mr-1.5 h-3.5 w-3.5" />
              Watch Preview
            </Button>
          )}
          
          <Button 
            size="sm"
            className="flex-1 gap-1"
            onClick={handleUpdateProgress}
          >
            Start Learning <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 