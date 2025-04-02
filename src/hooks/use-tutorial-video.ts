"use client";

import { useState, useEffect } from 'react';

interface UseTutorialVideoProps {
  videoId?: string;
  autoplay?: boolean;
}

export function useTutorialVideo({ videoId, autoplay = false }: UseTutorialVideoProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if video ID is valid
  const isValidVideoId = !!videoId && videoId.length > 5;

  // Handle play action
  const handlePlay = () => {
    if (!isValidVideoId) {
      setError("Video not available. Please try another tutorial.");
      return;
    }
    
    setIsLoading(true);
    setIsPlaying(true);
  };

  // Handle close action
  const handleClose = () => {
    setIsPlaying(false);
    setIsFullscreen(false);
    setIsLoading(false);
  };

  // Toggle mute state
  const toggleMute = () => setIsMuted(!isMuted);

  // Handle video load complete
  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  // Handle video error
  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
  };

  // Reset error after delay
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Set timeout for loading
  useEffect(() => {
    if (isLoading) {
      const loadTimeout = setTimeout(() => {
        if (isLoading) {
          setError("Video is taking too long to load. Please try again.");
          setIsPlaying(false);
          setIsLoading(false);
        }
      }, 10000);
      
      return () => clearTimeout(loadTimeout);
    }
  }, [isLoading]);

  return {
    isPlaying,
    isMuted,
    isFullscreen,
    isLoading,
    error,
    isValidVideoId,
    handlePlay,
    handleClose,
    toggleMute,
    setIsFullscreen,
    handleLoadComplete,
    handleError,
    setError
  };
} 