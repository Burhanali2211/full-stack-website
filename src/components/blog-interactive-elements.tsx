"use client";

import { useState } from "react";
import { Heart, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BlogInteractiveElementsProps {
  postId: string;
  initialLikes?: number;
  initialBookmarked?: boolean;
}

export default function BlogInteractiveElements({
  postId,
  initialLikes = 0,
  initialBookmarked = false,
}: BlogInteractiveElementsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleLike = async () => {
    try {
      // TODO: Implement like functionality with backend
      setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
      setIsLiked(!isLiked);
      toast.success(isLiked ? "Post unliked" : "Post liked");
    } catch (error) {
      toast.error("Failed to like post");
      console.error("Error liking post:", error);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: document.title,
        url: window.location.href,
      });
      toast.success("Post shared successfully");
    } catch (error) {
      // Fallback to copying URL if share API is not supported
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleBookmark = async () => {
    try {
      // TODO: Implement bookmark functionality with backend
      setIsBookmarked(!isBookmarked);
      toast.success(isBookmarked ? "Post removed from bookmarks" : "Post bookmarked");
    } catch (error) {
      toast.error("Failed to bookmark post");
      console.error("Error bookmarking post:", error);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-8">
      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-2 ${isLiked ? "text-red-500" : ""}`}
        onClick={handleLike}
      >
        <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        <span>{likes}</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2"
        onClick={handleShare}
      >
        <Share2 className="w-5 h-5" />
        <span>Share</span>
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-2 ${isBookmarked ? "text-yellow-500" : ""}`}
        onClick={handleBookmark}
      >
        <Bookmark className={`w-5 h-5 ${isBookmarked ? "fill-current" : ""}`} />
        <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
      </Button>
    </div>
  );
} 