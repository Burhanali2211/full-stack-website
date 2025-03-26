"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  videoId: string;
  onClose: () => void;
}

export function VideoModal({ isOpen, videoId, onClose }: VideoModalProps) {
  // Use a real video ID from your educational platform
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-2 z-10 hover:bg-black/80 transition-colors"
              onClick={onClose}
              aria-label="Close video"
            >
              <X size={24} />
            </button>
            <iframe
              src={videoSrc}
              title="Educational Platform Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 