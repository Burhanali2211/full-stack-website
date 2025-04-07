"use client";

import { useState } from "react";
import { Play, Pause, Maximize2, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TutorialVideoProps {
  videoId: string;
  title: string;
}

export function TutorialVideo({ videoId, title }: TutorialVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    const iframe = document.querySelector("iframe");
    if (!iframe) return;

    if (!isFullscreen) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-950">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&mute=${isMuted ? 1 : 0}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-white/80"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
              <span className="sr-only">
                {isPlaying ? "Pause video" : "Play video"}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-white/80"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
              <span className="sr-only">
                {isMuted ? "Unmute video" : "Mute video"}
              </span>
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFullscreen}
            className="text-white hover:text-white/80"
          >
            <Maximize2 className="h-5 w-5" />
            <span className="sr-only">Toggle fullscreen</span>
          </Button>
        </div>
      </div>
    </div>
  );
} 