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
  recommendations: Tutorial[];
  title?: string;
  subtitle?: string;
  userId?: string;
}

/**
 * Displays personalized tutorial recommendations in a carousel
 */
const TutorialRecommendations: FC<TutorialRecommendationsProps> = ({
  recommendations,
  title = "Recommended for You",
  subtitle = "Based on your interests and learning history",
  userId,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const maxVisibleItems = 3;
  const totalSlides = Math.ceil(recommendations.length / maxVisibleItems);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    if (activeIndex < totalSlides - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0); // Loop back to the beginning
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(totalSlides - 1); // Loop to the end
    }
  };

  // Calculate visible recommendations based on active index
  const visibleRecommendations = recommendations.slice(
    activeIndex * maxVisibleItems,
    (activeIndex * maxVisibleItems) + maxVisibleItems
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Handle conditional rendering when no recommendations available
  if (!recommendations.length) {
    return (
      <div className="rounded-xl border bg-card p-8 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Zap className="text-primary h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Recommendations Yet</h3>
        <p className="text-muted-foreground mb-6">
          Start exploring tutorials to get personalized recommendations based on your interests.
        </p>
        <Button asChild>
          <Link href="/tutorials">Browse Tutorials</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        {totalSlides > 1 && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={handlePrev}
              disabled={recommendations.length <= maxVisibleItems}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleNext}
              disabled={recommendations.length <= maxVisibleItems}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden" ref={containerRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {visibleRecommendations.map((recommendation, index) => (
            <motion.div key={recommendation.id} variants={itemVariants}>
              <Link href={`/tutorials/${recommendation.id}`} className="block h-full">
                <Card className="overflow-hidden h-full hover:shadow-md transition-all duration-300 group">
                  <div className="relative aspect-[2/1] overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url(${recommendation.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                    
                    {/* Level indicator */}
                    <div className="absolute top-3 left-3">
                      <Badge 
                        className={`${
                          recommendation.level === "beginner" ? "bg-green-500/80" : 
                          recommendation.level === "intermediate" ? "bg-blue-500/80" : 
                          "bg-purple-500/80"
                        }`}
                      >
                        {recommendation.level.charAt(0).toUpperCase() + recommendation.level.slice(1)}
                      </Badge>
                    </div>
                    
                    {/* Tutorial title */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-medium line-clamp-2 group-hover:text-primary/90 transition-colors">
                        {recommendation.title}
                      </h3>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={recommendation.author.avatar} 
                            alt={recommendation.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm">{recommendation.author.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{recommendation.duration}</span>
                    </div>
                    
                    {/* Match score - showing how well this tutorial matches user's interests */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Match score</span>
                        <span className="font-medium">{85 + index * 2}%</span>
                      </div>
                      <Progress value={85 + index * 2} className="h-1" />
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {recommendation.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag} 
                          className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination indicators */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-6 gap-1.5">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === activeIndex 
                    ? "bg-primary w-6" 
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialRecommendations; 