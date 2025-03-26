"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Add a smooth transition class to the document when theme changes
  useEffect(() => {
    document.documentElement.classList.add("[&_*]:!transition-colors");
    document.documentElement.classList.add("[&_*]:!duration-200");
    return () => {
      document.documentElement.classList.remove("[&_*]:!transition-colors");
      document.documentElement.classList.remove("[&_*]:!duration-200");
    };
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 flex items-center justify-center">
        <motion.div 
          className="w-5 h-5 bg-muted-foreground/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle dark mode"
      type="button"
      className="w-9 h-9 bg-transparent flex items-center justify-center rounded-lg border border-transparent transition-colors hover:border-border relative overflow-hidden"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <div className="relative w-5 h-5">
        <AnimatePresence mode="wait">
          {!isDark ? (
            <motion.svg
              key="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute inset-0 text-primary transition-colors"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </motion.svg>
          ) : (
            <motion.svg
              key="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute inset-0 text-primary transition-colors"
              initial={{ opacity: 0, rotate: 180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -180 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        className="absolute inset-0 bg-primary/5"
        initial={false}
        animate={{
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
} 