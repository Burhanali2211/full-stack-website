"use client";

import { motion } from 'framer-motion';
import { WhatYouLearnProps } from '@/types/tutorial';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export function WhatYouLearn({ points }: WhatYouLearnProps) {
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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2"
      >
        {points.map((point, index) => (
          <motion.li
            key={index}
            variants={item}
            className="flex items-start gap-2"
          >
            <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
            <span>{point}</span>
          </motion.li>
        ))}
      </motion.ul>
    </Card>
  );
} 