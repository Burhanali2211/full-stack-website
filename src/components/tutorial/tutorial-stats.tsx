"use client";

import { motion } from 'framer-motion';
import { TutorialStatsProps } from '@/types/tutorial';
import { Users, BookOpen, Clock, Star } from 'lucide-react';

export function TutorialStats({
  students,
  chapters,
  duration,
  rating,
}: TutorialStatsProps) {
  const stats = [
    {
      label: 'Students',
      value: students.toLocaleString(),
      icon: Users,
    },
    {
      label: 'Chapters',
      value: chapters,
      icon: BookOpen,
    },
    {
      label: 'Duration',
      value: `${duration} min`,
      icon: Clock,
    },
    {
      label: 'Rating',
      value: rating.toFixed(1),
      icon: Star,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 p-4 rounded-lg bg-card/50"
        >
          <stat.icon className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 