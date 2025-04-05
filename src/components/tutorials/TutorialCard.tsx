"use client";

import React, { FC, useMemo, useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Star, Share2, Bookmark, MessageSquare, Heart, Play, X, ArrowRight, ExternalLink, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Add a reusable Avatar component
const Avatar = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative h-10 w-10 rounded-full overflow-hidden bg-muted", className)}>
      <Image
        src={error ? "/avatars/placeholder.svg" : src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
};

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  tags: string[];
  image: string;
  progress?: number;
  rating: number;
  likes: number;
  comments: number;
  popularity: number;
  videoId?: string;
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

/**
 * A visually stunning tutorial card component with interactive elements
 */
const TutorialCard: FC<TutorialCardProps> = ({
  tutorial,
  index = 0,
  onSave,
  onShare,
  onLike,
  isSaved = false,
  isLiked = false,
}) => {
  // Extract tutorial properties
  const { id, title, description, level, duration, author, image, category, tags, rating, likes, comments } = tutorial;
  
  console.log(`Rendering TutorialCard for ${id}`);
  
  // State hooks
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [shareMenuOpen, setShareMenuOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  console.log(`Initial state - showPreview: ${showPreview}, isMounted: ${isMounted}`);
  
  // Effect hook for mounting
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  // Prevent body scroll when modal is open
  const preventScroll = useCallback((prevent: boolean) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = prevent ? 'hidden' : '';
    }
  }, []);

  // Toggle preview modal
  const togglePreview = (e: React.MouseEvent) => {
    console.log("Preview button clicked");
    // Prevent event from bubbling up to parent links
    e.preventDefault();
    e.stopPropagation();
    
    // Set the preview state
    console.log("Setting showPreview to true");
    setShowPreview(true);
    preventScroll(true);
    console.log("Preview state set, current UI should update");
  };

  // Close preview modal
  const closePreview = () => {
    console.log("Closing preview");
    setShowPreview(false);
    preventScroll(false);
  };

  // Handle modal content click to prevent closing when clicking inside
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Forcefully close preview (used by the Start Learning button)
  const forceClosePreview = () => {
    console.log("Force closing preview");
    setShowPreview(false);
    preventScroll(false);
  };

  // Log state changes
  useEffect(() => {
    console.log(`Preview state changed to: ${showPreview}`);
  }, [showPreview]);

  // Determine the appropriate image to use based on category or tags
  const thumbnailImage = useMemo(() => {
    // If a valid image URL is provided, use it
    if (image && (image.startsWith('http') || image.startsWith('/'))) {
      return image;
    }

    // Map category to tutorial SVG images
    if (category.toLowerCase().includes('javascript')) {
      return '/images/tutorials/javascript.svg';
    } else if (category.toLowerCase().includes('react')) {
      return '/images/tutorials/react.svg';
    } else if (category.toLowerCase().includes('python')) {
      return '/images/tutorials/python.svg';
    } else if (category.toLowerCase().includes('html') || category.toLowerCase().includes('css')) {
      return '/images/tutorials/html-css.svg';
    } else if (category.toLowerCase().includes('typescript')) {
      return '/images/tutorials/typescript.svg';
    } else if (category.toLowerCase().includes('next')) {
      return '/images/tutorials/nextjs.svg';
    } else {
      // Default fallback image
      return '/images/tutorials/code.svg';
    }
  }, [image, category, tags]);

  // Generate a gradient background based on the tutorial's level
  const levelGradient = useMemo(() => {
    switch(level) {
      case 'beginner':
        return 'from-indigo-500 via-indigo-400 to-blue-500';
      case 'intermediate':
        return 'from-blue-500 via-indigo-500 to-purple-500';
      case 'advanced':
        return 'from-purple-500 via-purple-400 to-pink-500';
      default:
        return 'from-indigo-500 via-purple-500 to-pink-500';
    }
  }, [level]);

  // Get the card border gradient based on level
  const cardBorderGradient = useMemo(() => {
    switch(level) {
      case 'beginner':
        return 'group-hover:border-indigo-500 dark:group-hover:border-indigo-500/70';
      case 'intermediate':
        return 'group-hover:border-blue-500 dark:group-hover:border-blue-500/70';
      case 'advanced':
        return 'group-hover:border-purple-500 dark:group-hover:border-purple-500/70';
      default:
        return 'group-hover:border-primary dark:group-hover:border-primary/70';
    }
  }, [level]);

  // Animation variants for staggered appearance
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Handle save action with confirmation
  const handleSave = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave(id);
  }, [id, onSave]);

  // Handle like action with confirmation
  const handleLike = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike(id);
  }, [id, onLike]);

  // Handle share button click
  const handleShareButtonClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShareMenuOpen(prev => !prev);
  }, []);

  // Handle share to social media
  const handleShareSocial = useCallback((platform: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window === 'undefined') return;
    
    const shareUrl = `${window.location.origin}/tutorials/${id}`;
    const shareTitle = encodeURIComponent(`Check out this tutorial: ${title}`);
    
    let socialUrl = '';
    
    switch (platform) {
      case 'twitter':
        socialUrl = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        socialUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        // Default to copy link
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert("Link copied to clipboard!");
        }).catch(err => {
          console.error("Could not copy link: ", err);
        });
        break;
    }
    
    if (socialUrl) {
      window.open(socialUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
    
    setShareMenuOpen(false);
    onShare(id);
  }, [id, onShare, title]);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShareMenuOpen(false);
    };

    if (shareMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [shareMenuOpen]);

  // Escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShareMenuOpen(false);
        forceClosePreview();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forceClosePreview]);

  // Cleanup effect when component unmounts
  useEffect(() => {
    return () => {
      preventScroll(false);
    };
  }, [preventScroll]);

  // PreviewModal component - extracted for clarity
  const PreviewModal = () => {
    console.log("Rendering preview modal for:", id);
    
    // Memoize handler function to prevent recreation on re-renders
    const handleModalShare = useCallback((platform: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (typeof window === 'undefined') return;
      
      const shareUrl = `${window.location.origin}/tutorials/${id}`;
      const shareTitle = encodeURIComponent(`Check out this tutorial: ${title}`);
      
      let socialUrl = '';
      
      switch (platform) {
        case 'twitter':
          socialUrl = `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case 'facebook':
          socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
          break;
        case 'linkedin':
          socialUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
          break;
        default:
          // Copy link with improved feedback
          navigator.clipboard.writeText(shareUrl).then(() => {
            // More subtle notification instead of alert
            const notification = document.createElement('div');
            notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-[200] animate-in fade-in slide-in-from-bottom-5 duration-300';
            notification.textContent = 'Link copied to clipboard!';
            document.body.appendChild(notification);
            
            // Remove after 2 seconds
            setTimeout(() => {
              notification.classList.add('animate-out', 'fade-out', 'slide-out-to-right-5');
              setTimeout(() => document.body.removeChild(notification), 300);
            }, 2000);
          }).catch(err => {
            console.error("Could not copy link: ", err);
          });
          break;
      }
      
      if (socialUrl) {
        window.open(socialUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
      }
    }, [id, title]);
    
    // Image loading state for better UX
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return (
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-2 sm:p-4 overflow-auto"
        onClick={closePreview}
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
        // Add data-state for potential animation triggers
        data-state="open"
      >
        <div 
          className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 w-full max-w-6xl max-h-[90vh] md:max-h-[85vh] lg:h-auto flex flex-col md:flex-row shadow-2xl animate-in fade-in zoom-in-95 duration-300"
          onClick={handleModalContentClick}
          // Improved focus management
          tabIndex={-1}
        >
          {/* Close button - large, accessible and easy to click */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closePreview();
            }}
            className="absolute top-4 right-4 z-[150] rounded-full bg-gray-900/70 dark:bg-gray-700/90 text-white p-2 w-10 h-10 flex items-center justify-center hover:bg-gray-900/90 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
          
          {/* Left section with video/image - optimized for performance */}
          <div className="md:w-[45%] lg:w-1/2 relative">
            <div className="aspect-video md:aspect-auto md:h-full relative overflow-hidden bg-gradient-to-br from-indigo-500/90 via-purple-500/90 to-pink-500/90 dark:from-indigo-600/80 dark:via-purple-600/80 dark:to-pink-600/80">
              {/* Video placeholder or tutorial image */}
              <div className="absolute inset-0 flex items-center justify-center">
                {tutorial.videoId ? (
                  <div className="relative w-full h-full flex items-center justify-center bg-black/30">
                    <Image 
                      src={thumbnailImage}
                      alt={`${title} preview`}
                      fill
                      className={`object-cover opacity-70 transition-opacity duration-500 ${imageLoaded ? 'opacity-70' : 'opacity-0'}`}
                      onLoad={() => setImageLoaded(true)}
                      loading="eager" // Load immediately since this is the main modal content
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute flex items-center justify-center p-4 rounded-full bg-white/20 backdrop-blur-md transition-transform hover:scale-110 duration-300 cursor-pointer">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                    <span className="absolute bottom-6 left-6 text-white text-sm font-medium">Preview available</span>
                  </div>
                ) : (
                  <Image 
                    src={thumbnailImage}
                    alt={`${title} thumbnail`}
                    fill
                    className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setImageLoaded(true)}
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                
                {/* Loading state placeholder */}
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500/90 via-purple-500/90 to-pink-500/90">
                    <div className="w-12 h-12 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
                  </div>
                )}
              </div>
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Tutorial metadata on image */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                  <Badge className={`px-2 py-1 text-xs ${
                    level === "beginner" ? "bg-indigo-500/90 hover:bg-indigo-500" : 
                    level === "intermediate" ? "bg-blue-500/90 hover:bg-blue-500" : 
                    "bg-purple-500/90 hover:bg-purple-500"
                  }`}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Badge>
                  
                  <div className="flex items-center text-xs gap-1">
                    <Clock className="h-3 w-3" />
                    {duration}
                  </div>
                  
                  <div className="flex items-center text-xs gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                    {rating.toFixed(1)}
                  </div>
                </div>
                
                <div className="flex items-center mt-2 sm:mt-3 gap-2 sm:gap-3">
                  <Avatar
                    src={author.avatar}
                    alt={`${author.name}'s avatar`}
                    className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-white/30"
                  />
                  <div>
                    <p className="font-medium text-xs sm:text-sm text-white">{author.name}</p>
                    <p className="text-[10px] sm:text-xs text-gray-300">{author.title}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right section with content - optimized for mobile */}
          <div className="flex-1 flex flex-col h-full max-h-[60vh] md:max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="p-4 sm:p-6 md:p-8 flex-1">
              <h2 id="modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                {title}
              </h2>
              
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                {description}
              </p>
              
              {/* What you'll learn section - optimized for space */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">What you'll learn</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {["Master key concepts", "Build real-world projects", "Understand best practices", "Develop professional skills"].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="mt-1 rounded-full bg-green-500/20 dark:bg-green-500/10 p-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Skills you'll gain - improved layout */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">Skills you'll gain</h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-[10px] sm:text-xs transition-colors hover:bg-indigo-200 dark:hover:bg-indigo-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Course stats - more compact on mobile */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">{Math.round(tutorial.rating * 100) / 10}</div>
                  <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">Average Rating</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">{tutorial.likes}</div>
                  <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">Students Liked</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">{tutorial.comments}</div>
                  <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">Comments</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-2 sm:p-3 text-center">
                  <div className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">{duration}</div>
                  <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">Duration</div>
                </div>
              </div>
            </div>
            
            {/* Footer with actions - more mobile friendly */}
            <div className="mt-auto border-t border-gray-200 dark:border-gray-800 p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row sm:items-center gap-3 justify-between bg-gray-50 dark:bg-gray-800/40">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mr-1">Share:</span>
                <button 
                  onClick={(e) => handleModalShare('twitter', e)}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button 
                  onClick={(e) => handleModalShare('facebook', e)}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button 
                  onClick={(e) => handleModalShare('linkedin', e)}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button 
                  onClick={(e) => handleModalShare('copy', e)}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Copy link"
                >
                  <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              
              <Button 
                size="default"
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300" 
                asChild
                onClick={(e) => {
                  e.stopPropagation();
                  forceClosePreview(); // Use the forceClosePreview function to ensure it closes
                }}
              >
                <Link href={`/tutorials/${id}`} className="flex items-center justify-center gap-1 sm:gap-2">
                  Start Learning <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 animate-pulse" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <motion.div
        custom={index}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className={cn(
          "group relative h-full rounded-xl overflow-hidden border bg-card dark:bg-gray-800/40 transition-all duration-300 flex flex-col",
          "hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5",
          "border-transparent hover:border-opacity-100 transition-colors",
          cardBorderGradient
        )}
      >
        {/* Hover highlight effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-transparent dark:from-indigo-500/10 dark:via-purple-500/10 transition-opacity duration-300" />
        
        {/* Image section with overlay */}
        <div className="relative aspect-video overflow-hidden">
          {/* Tutorial Image with proper Next.js Image optimization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`absolute inset-0 bg-gradient-to-br ${levelGradient} opacity-20 dark:opacity-30`} />
            <div className="relative w-20 sm:w-24 h-20 sm:h-24 flex items-center justify-center z-10">
              <Image 
                src={thumbnailImage}
                alt={`${title} thumbnail`}
                width={96}
                height={96}
                className="object-contain transition-transform duration-500 group-hover:scale-110"
                priority={index < 4}
                loading={index >= 4 ? 'lazy' : undefined}
              />
            </div>
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          
          {/* Preview button using native HTML button */}
          <button
            onClick={togglePreview}
            type="button"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 shadow-md rounded-md px-3 py-1.5 text-sm font-medium flex items-center"
            aria-label="Preview tutorial"
          >
            <Play className="h-4 w-4 mr-1.5" /> Preview
          </button>
          
          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge 
              className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs ${
                level === "beginner" ? "bg-indigo-500/80 dark:bg-indigo-500/70 hover:bg-indigo-500/90 dark:hover:bg-indigo-500/80" : 
                level === "intermediate" ? "bg-blue-500/80 dark:bg-blue-500/70 hover:bg-blue-500/90 dark:hover:bg-blue-500/80" : 
                "bg-purple-500/80 dark:bg-purple-500/70 hover:bg-purple-500/90 dark:hover:bg-purple-500/80"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Badge>
            
            {tutorial.popularity > 85 && (
              <Badge variant="outline" className="bg-pink-500/20 dark:bg-pink-500/10 text-pink-400 dark:text-pink-300 border-pink-400/50 dark:border-pink-400/30 text-[10px] sm:text-xs px-1.5 py-0">
                Popular
              </Badge>
            )}
          </div>
          
          {/* Duration badge */}
          <div className="absolute top-3 right-3 bg-black/40 dark:bg-black/50 backdrop-blur-sm text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md flex items-center">
            <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
            {duration}
          </div>
          
          {/* Bottom progress and metadata */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 flex flex-col">
            {tutorial.progress !== undefined && (
              <Tooltip>
                <TooltipTrigger asChild className="w-full mb-1.5 sm:mb-2">
                  <div className="cursor-default">
                    <div className="flex items-center justify-between text-[10px] sm:text-xs text-white mb-0.5 sm:mb-1">
                      <span>Progress</span>
                      <span>{Math.round(tutorial.progress)}%</span>
                    </div>
                    <Progress value={tutorial.progress} className="h-1 bg-white/20" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-800 text-white border-gray-700">
                  <p>You've completed {Math.round(tutorial.progress)}% of this tutorial.</p>
                </TooltipContent>
              </Tooltip>
            )}
            
            {/* Rating */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400 fill-yellow-400 mr-0.5 sm:mr-1" />
                <span className="text-[10px] sm:text-xs text-white">{tutorial.rating.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-white/80 text-[10px] sm:text-xs">
                  <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                  {tutorial.likes}
                </div>
                <div className="flex items-center text-white/80 text-[10px] sm:text-xs">
                  <MessageSquare className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                  {tutorial.comments}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col">
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-2.5 line-clamp-2 group-hover:text-indigo-600 dark:text-gray-100 dark:group-hover:text-indigo-400 transition-colors">
            <Link href={`/tutorials/${tutorial.id}`} className="outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded">
              {tutorial.title}
            </Link>
          </h3>
          
          <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-1 leading-relaxed">
            {tutorial.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
            {tutorial.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-1.5 sm:px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-[10px] sm:text-xs"
              >
                {tag}
              </span>
            ))}
            {tutorial.tags.length > 3 && (
              <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-muted/40 dark:bg-gray-700/40 text-muted-foreground dark:text-gray-300 text-[10px] sm:text-xs">
                +{tutorial.tags.length - 3} more
              </span>
            )}
          </div>
          
          {/* Author */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Avatar
              src={tutorial.author.avatar}
              alt={`${tutorial.author.name}'s avatar`}
              className="h-8 w-8 sm:h-9 sm:w-9"
            />
            <div>
              <p className="font-medium text-xs sm:text-sm text-foreground dark:text-gray-200">{tutorial.author.name}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground dark:text-gray-400">{tutorial.author.title}</p>
            </div>
          </div>
          
          {/* Action buttons - improved Start Learning button visibility and size */}
          <div className="flex justify-between items-center mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-border/30 dark:border-gray-700/30">
            <div className="flex gap-0.5 sm:gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    onClick={handleSave}
                    aria-label={isSaved ? 'Remove from bookmarks' : 'Save tutorial'}
                  >
                    <Bookmark 
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isSaved ? 'fill-indigo-500 text-indigo-500 dark:fill-indigo-400 dark:text-indigo-400' : ''}`} 
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isSaved ? 'Saved' : 'Save tutorial'}</p>
                </TooltipContent>
              </Tooltip>
              
              <div className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      onClick={handleShareButtonClick}
                      aria-label="Share tutorial"
                    >
                      <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share tutorial</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* Share Menu Dropdown */}
                {shareMenuOpen && (
                  <div 
                    className="absolute bottom-full mb-2 -left-2 bg-card dark:bg-gray-800 rounded-lg shadow-lg border border-border dark:border-gray-700 p-2 w-[130px] z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="justify-start text-xs sm:text-sm h-7 sm:h-8 px-2 hover:bg-gray-100 dark:hover:bg-gray-700/50" 
                        onClick={(e) => handleShareSocial('twitter', e)}
                      >
                        <Twitter className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-400" />
                        Twitter
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="justify-start text-xs sm:text-sm h-7 sm:h-8 px-2 hover:bg-gray-100 dark:hover:bg-gray-700/50" 
                        onClick={(e) => handleShareSocial('facebook', e)}
                      >
                        <Facebook className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-600" />
                        Facebook
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="justify-start text-xs sm:text-sm h-7 sm:h-8 px-2 hover:bg-gray-100 dark:hover:bg-gray-700/50" 
                        onClick={(e) => handleShareSocial('linkedin', e)}
                      >
                        <Linkedin className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2 text-blue-700" />
                        LinkedIn
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="justify-start text-xs sm:text-sm h-7 sm:h-8 px-2 hover:bg-gray-100 dark:hover:bg-gray-700/50" 
                        onClick={(e) => handleShareSocial('copy', e)}
                      >
                        <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1.5 sm:mr-2" />
                        Copy Link
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                    onClick={handleLike}
                    aria-label={isLiked ? 'Unlike tutorial' : 'Like tutorial'}
                  >
                    <Heart 
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isLiked ? 'fill-pink-500 text-pink-500 dark:fill-pink-400 dark:text-pink-400' : ''}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isLiked ? 'Liked' : 'Like tutorial'}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            {/* Enhanced Start Learning button with better visibility */}
            <Button 
              size="sm" 
              className="h-8 sm:h-9 text-xs sm:text-sm px-3 sm:px-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-10 transition-all duration-300" 
              asChild
            >
              <Link href={`/tutorials/${tutorial.id}`} className="flex items-center gap-1">
                Start Learning <ArrowRight className="ml-1 sm:ml-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Simple preview modal implementation */}
        {isMounted && showPreview && (
          <div id="modal-wrapper">
            {ReactDOM.createPortal(
              <PreviewModal />,
              document.body
            )}
          </div>
        )}
      </motion.div>
    </TooltipProvider>
  );
};

// Add a global style for custom scrollbar
const globalStyle = typeof document !== 'undefined' && (() => {
  const style = document.createElement('style');
  style.innerHTML = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 5px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: rgba(156, 163, 175, 0.5);
      border-radius: 20px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: rgba(156, 163, 175, 0.7);
    }
  `;
  document.head.appendChild(style);
  return true;
})();

export default TutorialCard;