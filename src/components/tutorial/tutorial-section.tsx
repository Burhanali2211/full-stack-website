"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TutorialSectionProps } from '@/types/tutorial';
import { Button } from '@/components/ui/button';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Dynamically import the markdown renderer to avoid SSR issues
const MarkdownRenderer = dynamic(
  () => import('@/components/markdown-renderer'),
  { ssr: false }
);

export function TutorialSection({
  id,
  title,
  content,
  isCompleted,
  onComplete,
}: TutorialSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="border rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'w-full flex items-center justify-between p-4',
          'hover:bg-accent/50 transition-colors',
          isCompleted && 'bg-green-500/10'
        )}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
          <h3 className="font-medium">{title}</h3>
        </div>
        {isCompleted && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t">
              <MarkdownRenderer content={content} />
              {!isCompleted && (
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => onComplete(id)}
                    className="gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark as Complete
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 