"use client";

import { useState } from "react";
import { Share, Copy, Check, Twitter, Facebook, Linkedin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TutorialShareProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TutorialShare({ title, isOpen, onClose }: TutorialShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleShare = (platform: string) => {
    const text = `Check out this tutorial: ${title}`;
    let url = "";

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }

    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Tutorial</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="grid flex-1 gap-2">
              <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 border-0 bg-transparent text-sm text-muted-foreground focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={handleCopy}
              className="shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy link</span>
            </Button>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleShare("twitter")}
              className="hover:text-blue-400 hover:border-blue-400"
            >
              <Twitter className="h-4 w-4" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleShare("facebook")}
              className="hover:text-blue-600 hover:border-blue-600"
            >
              <Facebook className="h-4 w-4" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleShare("linkedin")}
              className="hover:text-blue-700 hover:border-blue-700"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 