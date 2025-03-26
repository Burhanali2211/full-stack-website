"use client";

import { motion } from "framer-motion";

export function ProjectCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg bg-card"
    >
      {/* Image skeleton */}
      <div className="relative h-48 animate-pulse bg-muted">
        {/* Badge skeletons */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <div className="h-6 w-20 rounded-full bg-muted-foreground/10" />
          <div className="h-6 w-16 rounded-full bg-muted-foreground/10" />
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-7 w-3/4 animate-pulse rounded-md bg-muted-foreground/10" />

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted-foreground/10" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted-foreground/10" />
        </div>

        {/* Tags skeleton */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-16 animate-pulse rounded-full bg-muted-foreground/10"
            />
          ))}
        </div>

        {/* Link skeleton */}
        <div className="h-6 w-28 animate-pulse rounded bg-muted-foreground/10" />
      </div>

      {/* Loading shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </motion.div>
  );
} 