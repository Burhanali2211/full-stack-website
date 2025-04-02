"use client";

import { useEffect, useRef } from 'react';
import { Play, Maximize2, Volume2, VolumeX, X, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { FallbackImage } from '@/components/ui/fallback-image';
import { useTutorialVideo } from '@/hooks/use-tutorial-video';

type TutorialVideoProps = {
  videoId: string;
  title: string;
  thumbnailUrl?: string;
  autoplay?: boolean;
  className?: string;
};

export function TutorialVideo({ 
  videoId, 
  title, 
  thumbnailUrl,
  autoplay = false,
  className = ""
}: TutorialVideoProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const {
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
  } = useTutorialVideo({ videoId, autoplay });

  // Toggle fullscreen for iframe
  const toggleFullscreen = () => {
    if (!iframeRef.current) return;

    if (!isFullscreen) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen().catch(err => {
          console.error("Error attempting to enter fullscreen:", err);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error("Error attempting to exit fullscreen:", err);
        });
      }
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [setIsFullscreen]);

  // Handle iframe loaded
  const handleIframeLoaded = () => {
    handleLoadComplete();
  };

  // Default thumbnail if none provided
  const defaultThumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "/images/thumbnails/placeholder.jpg";

  if (!isValidVideoId) {
    return (
      <div className={`relative w-full rounded-xl overflow-hidden border border-primary/20 bg-card/80 backdrop-blur-sm shadow-md ${className}`}>
        <div className="aspect-video w-full flex flex-col items-center justify-center p-4 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">Video is currently unavailable</p>
          <Button size="sm" variant="outline" onClick={() => window.location.href = "/tutorials"}>
            Browse other tutorials
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full rounded-xl overflow-hidden border border-primary/20 bg-card/80 backdrop-blur-sm shadow-md group ${className}`}>
      {!isPlaying ? (
        <div 
          className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-lg" 
          onClick={handlePlay}
        >
          {/* Video thumbnail with fallback */}
          <FallbackImage
            src={thumbnailUrl || defaultThumbnail}
            alt={title}
            fallbackSrc="/images/thumbnails/placeholder.jpg"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            altText={title}
          />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <Play className="h-7 w-7 sm:h-8 sm:w-8 text-white fill-white ml-1" />
            </div>
          </div>
          
          {/* Video title */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-white font-medium line-clamp-1 text-sm sm:text-base">{title}</h3>
          </div>
        </div>
      ) : (
        <div className="relative aspect-video w-full">
          <AnimatePresence>
            <motion.div 
              className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'aspect-video'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                    <p className="text-white text-sm">Loading video...</p>
                  </div>
                </div>
              )}
              
              <iframe
                ref={iframeRef}
                id={`youtube-${videoId}`}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0${isMuted ? '&mute=1' : ''}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-lg"
                onLoad={handleIframeLoaded}
                onError={() => handleError("Unable to load video")}
              ></iframe>
              
              {/* Video controls overlay */}
              <div className="absolute top-2 right-2 flex gap-1 sm:gap-2 z-10">
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                >
                  {isMuted ? <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
                </Button>
                
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                >
                  <Maximize2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
                
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                >
                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/90 text-muted-foreground z-20">
          <div className="text-center max-w-xs p-4">
            <AlertCircle className="h-10 w-10 mx-auto mb-2 text-primary/70" />
            <p className="mb-4">{error}</p>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => {
                setError(null);
                handleClose();
              }}
            >
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 