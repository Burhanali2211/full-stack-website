"use client";

import { motion } from 'framer-motion';
import { CourseContentProps } from '@/types/tutorial';
import { TutorialSection } from './tutorial-section';

export function CourseContent({
  sections,
  onSectionComplete,
}: CourseContentProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {sections.map((section) => (
        <motion.div key={section.id} variants={item}>
          <TutorialSection
            {...section}
            onComplete={onSectionComplete}
          />
        </motion.div>
      ))}
    </motion.div>
  );
} 