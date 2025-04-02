"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Twitter, Linkedin, Link2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TutorialShareProps {
  title: string;
  url?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TutorialShare({ 
  title, 
  url = typeof window !== 'undefined' ? window.location.href : '', 
  isOpen,
  onClose
}: TutorialShareProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };
  
  const handleShareSocial = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    if (typeof window === 'undefined') return;
    
    let shareUrl = '';
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="p-6 rounded-xl bg-card border shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Share Tutorial</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={onClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-600"
                    onClick={() => handleShareSocial('facebook')}
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 hover:text-sky-600"
                    onClick={() => handleShareSocial('twitter')}
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-full bg-blue-700/10 text-blue-700 hover:bg-blue-700/20 hover:text-blue-800"
                    onClick={() => handleShareSocial('linkedin')}
                  >
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={url}
                      readOnly
                      className="w-full px-3 py-2 rounded-md bg-muted/50 border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  
                  <Button
                    variant={copied ? "default" : "outline"}
                    size="sm"
                    className={copied ? "bg-green-600 hover:bg-green-700" : ""}
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-1.5 h-3.5 w-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Link2 className="mr-1.5 h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 