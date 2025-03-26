"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { TutorialHeroProps } from '@/types/tutorial';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function TutorialHero({
  title,
  description,
  image,
  difficulty,
  category,
}: TutorialHeroProps) {
  const difficultyColor = {
    beginner: 'bg-green-500/10 text-green-500',
    intermediate: 'bg-yellow-500/10 text-yellow-500',
    advanced: 'bg-red-500/10 text-red-500',
  }[difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full overflow-hidden rounded-lg"
    >
      <div className="relative aspect-[21/9] w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className={cn('capitalize', difficultyColor)}>
            {difficulty}
          </Badge>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {category}
          </Badge>
        </div>

        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
      </div>
    </motion.div>
  );
} 