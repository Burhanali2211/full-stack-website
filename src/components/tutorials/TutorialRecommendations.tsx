"use client";

import { FC, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tutorial } from "./TutorialCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

interface TutorialRecommendationsProps {
  tutorials: Tutorial[];
  currentTutorialId: string;
}

/**
 * Displays personalized tutorial recommendations in a carousel
 */
const TutorialRecommendations: FC<TutorialRecommendationsProps> = ({
  tutorials,
  currentTutorialId,
}) => {
  const recommendedTutorials = tutorials
    .filter((tutorial) => tutorial.id !== currentTutorialId)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">You might also like</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendedTutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold">{tutorial.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {tutorial.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    {tutorial.author.name}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tutorial.author.title}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {tutorial.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialRecommendations; 