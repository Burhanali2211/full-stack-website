"use client";

import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingFallback() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full overflow-hidden rounded-lg"
      >
        <Skeleton className="aspect-[21/9] w-full" />
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-4">
          {/* What You'll Learn */}
          <Skeleton className="h-[200px] rounded-lg" />

          {/* Course Content */}
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>

        {/* Sidebar */}
        <div className="hidden md:block">
          <Skeleton className="h-[400px] rounded-lg" />
        </div>
      </div>
    </div>
  );
} 