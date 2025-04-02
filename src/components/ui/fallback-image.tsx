"use client";

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface FallbackImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  altText?: string;
}

export function FallbackImage({
  src,
  alt,
  fallbackSrc = "/images/thumbnails/placeholder.jpg",
  className = "",
  altText
}: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  // Handle image error
  const handleError = () => {
    setHasError(true);
    setLoaded(true);
  };
  
  // Handle image load
  const handleLoad = () => {
    setLoaded(true);
  };
  
  // Determine source based on error state
  const imageSrc = hasError ? fallbackSrc : src;
  
  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse flex items-center justify-center">
          <div className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
      
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center flex-col p-4">
          <AlertCircle className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-center text-sm text-muted-foreground">
            {altText || 'Image not available'}
          </p>
        </div>
      )}
      
      <img 
        src={imageSrc}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out'
        }}
      />
    </div>
  );
} 