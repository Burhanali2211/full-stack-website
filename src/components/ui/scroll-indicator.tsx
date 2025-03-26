"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  className?: string;
  showAfterMs?: number;
  hideAfterScroll?: boolean;
}

export function ScrollIndicator({
  className,
  showAfterMs = 1000,
  hideAfterScroll = true,
}: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, showAfterMs);

    const handleScroll = () => {
      if (hideAfterScroll && window.scrollY > window.innerHeight * 0.3) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAfterMs, hideAfterScroll]);

  const scrollToNextSection = () => {
    const viewportHeight = window.innerHeight;
    window.scrollTo({
      top: viewportHeight,
      behavior: "smooth",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  const iconVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, 8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className={cn(
        "fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2",
        "cursor-pointer select-none",
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={scrollToNextSection}
    >
      <motion.span
        className="text-sm font-medium text-muted-foreground"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll Down
      </motion.span>
      <motion.div
        className="relative"
        variants={iconVariants}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 rounded-full bg-primary/10 blur-lg" />
        <ChevronDown className="relative z-10 h-6 w-6 text-primary" />
      </motion.div>
    </motion.div>
  );
} 