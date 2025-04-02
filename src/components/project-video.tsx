"use client";

import { useState } from 'react';
import { Play, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ProjectVideoProps {
  videoId: string;
  title: string;
  autoplay?: boolean;
  className?: string;
}

export function ProjectVideo({ 
  videoId, 
  title, 
  autoplay = false,
  className = "" 
}: ProjectVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = () => {
    setIsPlaying(false);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
      {!isPlaying ? (
        <div 
          className="relative aspect-video cursor-pointer group"
          onClick={handlePlay}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/70 z-10"></div>
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
            alt={`${title} thumbnail`} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <button className="h-16 w-16 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm
                transition-transform duration-300 group-hover:scale-110">
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 z-20">
            <h3 className="text-white text-lg font-semibold drop-shadow-md">{title}</h3>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div 
            className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'aspect-video'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute top-2 right-2 z-30 flex space-x-2">
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                onClick={toggleFullscreen}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-8 w-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <iframe 
              src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 1}&rel=0`} 
              title={title}
              className="w-full h-full border-0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
} 