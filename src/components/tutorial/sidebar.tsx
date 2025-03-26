"use client";

import { motion } from 'framer-motion';
import { SidebarProps } from '@/types/tutorial';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ChevronRight } from 'lucide-react';

export function Sidebar({
  difficulty,
  category,
  prerequisites,
  onStartLearning,
}: SidebarProps) {
  const difficultyColor = {
    beginner: 'bg-green-500/10 text-green-500',
    intermediate: 'bg-yellow-500/10 text-yellow-500',
    advanced: 'bg-red-500/10 text-red-500',
  }[difficulty];

  return (
    <Card className="p-6 sticky top-4">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Course Info</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Difficulty</span>
              <Badge variant="outline" className={difficultyColor}>
                {difficulty}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Category</span>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {category}
              </Badge>
            </div>
          </div>
        </div>

        {prerequisites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold mb-2">Prerequisites</h3>
            <ul className="space-y-2">
              {prerequisites.map((prerequisite, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{prerequisite}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}

        <Button
          onClick={onStartLearning}
          className="w-full gap-2"
          size="lg"
        >
          Start Learning
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
} 