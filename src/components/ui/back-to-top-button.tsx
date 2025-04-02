"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * A button that appears when the user scrolls down, allowing them to quickly return to the top of the page.
 */
export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    // Use documentElement.scrollTop for broader compatibility
    if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll smoothly to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    // Initial check in case the page is already scrolled down on load
    toggleVisibility(); 
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        className={cn(
          "h-10 w-10 rounded-full border-gray-600 bg-gray-900/80 text-gray-300 backdrop-blur-md transition-opacity duration-300 hover:bg-gray-800 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
} 