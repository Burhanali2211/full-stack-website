"use client";

import { FC, useMemo, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
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
  index,
  onSave,
  onShare,
  onLike,
  isSaved,
  isLiked
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mount effect
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const {
    id,
    title,
    description,
    level,
    duration,
    author,
    tags,
    image,
    progress,
    rating,
    likes,
    comments,
    category
  } = tutorial;

  // Determine the appropriate image to use based on category or tags
  const thumbnailImage = useMemo(() => {
    // If a valid image URL is provided, use it
    if (image && (image.startsWith('http') || image.startsWith('/'))) {
      return image;
    }

    // Map category or tags to tutorial SVG images
    if (category.toLowerCase().includes('javascript') || tags.some(tag => tag.toLowerCase().includes('javascript'))) {
      return '/images/tutorials/javascript.svg';
    } else if (category.toLowerCase().includes('react') || tags.some(tag => tag.toLowerCase().includes('react'))) {
      return '/images/tutorials/react.svg';
    } else if (category.toLowerCase().includes('python') || tags.some(tag => tag.toLowerCase().includes('python'))) {
      return '/images/tutorials/python.svg';
    } else if (category.toLowerCase().includes('html') || category.toLowerCase().includes('css') || 
              tags.some(tag => tag.toLowerCase().includes('html') || tag.toLowerCase().includes('css'))) {
      return '/images/tutorials/html-css.svg';
    } else if (category.toLowerCase().includes('typescript') || tags.some(tag => tag.toLowerCase().includes('typescript'))) {
      return '/images/tutorials/typescript.svg';
    } else if (category.toLowerCase().includes('next') || tags.some(tag => tag.toLowerCase().includes('next'))) {
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
        return 'group-hover:border-indigo-500';
      case 'intermediate':
        return 'group-hover:border-blue-500';
      case 'advanced':
        return 'group-hover:border-purple-500';
      default:
        return 'group-hover:border-primary';
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

  // Prevent scrolling when modal is open
  const preventScroll = useCallback((prevent: boolean) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = prevent ? 'hidden' : '';
    }
  }, []);

  // Handle preview toggle with improved event handling
  const togglePreview = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Toggle preview clicked"); // Debug
    setShowPreview(prev => {
      const newValue = !prev;
      preventScroll(newValue);
      return newValue;
    });
  }, [preventScroll]);

  // Handle modal close separately
  const closePreview = useCallback((e: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowPreview(false);
    preventScroll(false);
  }, [preventScroll]);

  // Force close modal - can be called without event
  const forceClosePreview = useCallback(() => {
    setShowPreview(false);
    preventScroll(false);
  }, [preventScroll]);

  // Handle modal content click to prevent closing when clicking inside
  const handleModalContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

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
    return (
      <div 
        // Increased backdrop opacity and blur for better focus
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }} // Ensure full coverage
        onClick={closePreview}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          // Enhanced styling: darker bg, slightly larger max-width, consistent borders
          className="bg-gray-900 relative rounded-xl overflow-hidden border border-gray-700/60 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl m-4"
          onClick={handleModalContentClick}
        >
          {/* Modal Header */}
          <div className="relative aspect-video sm:aspect-[16/9] border-b border-gray-700/50">
            {/* Subtle gradient overlay matching the level */}
            <div className={`absolute inset-0 bg-gradient-to-br ${levelGradient} opacity-15`} />
            {/* Centralized image container */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
                <Image 
                  src={thumbnailImage} // Use the calculated thumbnail
                  alt={`${title} logo`}
                  width={150}
                  height={150}
                  className="object-contain drop-shadow-lg"
                  priority // Prioritize loading the modal image
                />
              </div>
            </div>
            {/* Close Button - Improved styling */}
            <Button 
              onClick={closePreview}
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 rounded-full bg-black/40 hover:bg-black/60 text-gray-300 hover:text-white border border-white/10 shadow-lg z-10 h-8 w-8"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Modal Content Body */}
          {/* Added scrollbar styling for webkit */}
          <div className="p-5 sm:p-6 flex-grow overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {/* Title and Description */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
              <p className="text-gray-400 text-base">{description}</p>
            </div>
            
            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
              <Badge 
                className={cn(`px-2.5 py-1 text-xs font-medium`, 
                  level === "beginner" ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30" :
                  level === "intermediate" ? "bg-blue-600/20 text-blue-300 border border-blue-500/30" :
                  "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                )}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Badge>
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1.5 opacity-70" /> {duration}
              </span>
              <span className="flex items-center">
                <Star className="h-4 w-4 mr-1.5 text-yellow-400 fill-yellow-400" /> {rating.toFixed(1)} Rating
              </span>
            </div>
            
            {/* Separator */}
            <div className="border-t border-gray-700/50" />

            {/* What You'll Learn */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/40">
              <h3 className="font-semibold mb-2 text-gray-200">What you'll learn:</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-300">
                <li>Core concepts of {category} programming</li>
                <li>How to build real-world applications</li>
                <li>Best practices and modern techniques</li>
                <li>Practical examples to reinforce learning</li>
              </ul>
            </div>
            
            {/* Skills You'll Gain */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-200">Skills you'll gain:</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-blue-600/15 text-indigo-300 text-xs border border-indigo-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Author Info */}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-700/50 mt-4">
              <Avatar
                src={author.avatar}
                alt={`${author.name}'s avatar`}
                className="h-10 w-10"
              />
              <div>
                <div className="font-medium text-gray-200">{author.name}</div>
                <div className="text-xs text-gray-400">{author.title}</div>
              </div>
            </div>
          </div>
          
          {/* Modal Footer */}
          <div className="p-4 border-t border-gray-700/50 flex justify-between items-center bg-gray-900/50">
            {/* Social Share Buttons (Optional - can be added here if needed) */}
            <div>
              {/* Placeholder for potential future share icons in footer */}
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="border-gray-600 hover:bg-gray-700/50 hover:border-gray-500" 
                onClick={closePreview}
              >
                Close
              </Button>
              <Button 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md" 
                asChild
              >
                <Link href={`/tutorials/${id}`} onClick={forceClosePreview}>
                  Start Learning <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
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
          "group relative h-full rounded-xl overflow-hidden border bg-card transition-all duration-300 flex flex-col",
          "hover:shadow-lg hover:shadow-indigo-500/10",
          "border-transparent hover:border-opacity-100 transition-colors",
          cardBorderGradient
        )}
      >
        {/* Hover highlight effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-transparent transition-opacity duration-300" />
        
        {/* Image section with overlay */}
        <div className="relative aspect-video overflow-hidden">
          {/* Tutorial Image with proper Next.js Image optimization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`absolute inset-0 bg-gradient-to-br ${levelGradient} opacity-20`} />
            <div className="relative w-24 h-24 flex items-center justify-center z-10">
              <Image 
                src={thumbnailImage}
                alt={`${title} thumbnail`}
                width={96}
                height={96}
                className="object-contain transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          
          {/* Preview button */}
          <Button
            onClick={togglePreview}
            size="sm"
            variant="secondary"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-indigo-600 hover:text-indigo-700 shadow-md"
          >
            <Play className="h-4 w-4 mr-1" /> Preview
          </Button>
          
          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <Badge 
              className={`px-2 py-1 ${
                level === "beginner" ? "bg-indigo-500/80 hover:bg-indigo-500/90" : 
                level === "intermediate" ? "bg-blue-500/80 hover:bg-blue-500/90" : 
                "bg-purple-500/80 hover:bg-purple-500/90"
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Badge>
            
            {tutorial.popularity > 85 && (
              <Badge variant="outline" className="bg-pink-500/20 text-pink-400 border-pink-400/50">
                Popular
              </Badge>
            )}
          </div>
          
          {/* Duration badge */}
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </div>
          
          {/* Bottom progress and metadata */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col">
            {progress !== undefined && (
              <Tooltip>
                <TooltipTrigger asChild className="w-full mb-2">
                  <div className="cursor-default">
                    <div className="flex items-center justify-between text-xs text-white mb-1">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-1 bg-white/20" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-800 text-white border-gray-700">
                  <p>You've completed {Math.round(progress)}% of this tutorial.</p>
                </TooltipContent>
              </Tooltip>
            )}
            
            {/* Rating */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-xs text-white">{rating.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-white/80 text-xs">
                  <Heart className="h-3 w-3 mr-1" />
                  {likes}
                </div>
                <div className="flex items-center text-white/80 text-xs">
                  <MessageSquare className="h-3 w-3 mr-1" />
                  {comments}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <div className="flex-1 p-5 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <Link href={`/tutorials/${id}`} className="outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded">
              {title}
            </Link>
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
            {description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground text-xs">
                +{tags.length - 3} more
              </span>
            )}
          </div>
          
          {/* Author */}
          <div className="flex items-center gap-4">
            <Avatar
              src={author.avatar}
              alt={`${author.name}'s avatar`}
              className="h-10 w-10"
            />
            <div>
              <p className="font-medium text-sm">{author.name}</p>
              <p className="text-xs text-muted-foreground">{author.title}</p>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between items-center mt-auto">
            <div className="flex gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8"
                    onClick={handleSave}
                  >
                    <Bookmark 
                      className={`h-4 w-4 ${isSaved ? 'fill-indigo-500 text-indigo-500' : ''}`} 
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
                      className="h-8 w-8"
                      onClick={handleShareButtonClick}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share tutorial</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* Share Menu Dropdown */}
                {shareMenuOpen && (
                  <div 
                    className="absolute bottom-full mb-2 -left-2 bg-card rounded-lg shadow-lg border border-border p-2 w-[130px] z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex flex-col gap-1">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="justify-start text-sm h-8 px-2" 
                        onClick={(e) => handleShareSocial('twitter', e)}
                      >
                        <Twitter className="h-3.5 w-3.5 mr-2 text-blue-400" />
                        Twitter
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="justify-start text-sm h-8 px-2" 
                        onClick={(e) => handleShareSocial('facebook', e)}
                      >
                        <Facebook className="h-3.5 w-3.5 mr-2 text-blue-600" />
                        Facebook
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="justify-start text-sm h-8 px-2" 
                        onClick={(e) => handleShareSocial('linkedin', e)}
                      >
                        <Linkedin className="h-3.5 w-3.5 mr-2 text-blue-700" />
                        LinkedIn
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="justify-start text-sm h-8 px-2" 
                        onClick={(e) => handleShareSocial('copy', e)}
                      >
                        <ExternalLink className="h-3.5 w-3.5 mr-2" />
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
                    className="h-8 w-8"
                    onClick={handleLike}
                  >
                    <Heart 
                      className={`h-4 w-4 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`}
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isLiked ? 'Liked' : 'Like tutorial'}</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-md" 
              asChild
            >
              <Link href={`/tutorials/${id}`}>
                Start Learning <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Preview Modal - using ReactDOM.createPortal for better cross-browser support */}
        {isMounted && showPreview && typeof document !== 'undefined' && ReactDOM.createPortal(
          <PreviewModal />,
          document.body
        )}
      </motion.div>
    </TooltipProvider>
  );
};

export default TutorialCard;