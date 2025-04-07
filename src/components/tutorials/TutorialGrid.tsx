"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Sparkles, Trophy, ArrowRight, Filter } from "lucide-react";
import { TutorialCard, type Tutorial } from "./TutorialCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

interface TutorialGridProps {
  tutorials: Tutorial[];
}

/**
 * A grid component that organizes tutorials by skill level with animations and responsive layout
 */
const TutorialGrid = ({ tutorials }: TutorialGridProps) => {
  const [savedTutorials, setSavedTutorials] = useState<string[]>([]);
  const [likedTutorials, setLikedTutorials] = useState<string[]>([]);
  const [visibleTutorials, setVisibleTutorials] = useState(8);
  const [loading, setLoading] = useState(false);
  
  const [beginnerRef, beginnerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [intermediateRef, intermediateInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [advancedRef, advancedInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Filter tutorials by skill level
  const beginnerTutorials = tutorials.filter(t => t.level === "beginner");
  const intermediateTutorials = tutorials.filter(t => t.level === "intermediate");
  const advancedTutorials = tutorials.filter(t => t.level === "advanced");
  
  // Load more tutorials on button click with simulated loading state
  const handleLoadMore = () => {
    setLoading(true);
    // Simulate loading to show loading state
    setTimeout(() => {
      setVisibleTutorials(prev => prev + 8);
      setLoading(false);
    }, 600);
  };
  
  // Handle save tutorial
  const handleSaveTutorial = (id: string) => {
    setSavedTutorials(prev => 
      prev.includes(id) 
        ? prev.filter(savedId => savedId !== id) 
        : [...prev, id]
    );
  };
  
  // Handle like tutorial
  const handleLikeTutorial = (id: string) => {
    setLikedTutorials(prev => 
      prev.includes(id) 
        ? prev.filter(likedId => likedId !== id) 
        : [...prev, id]
    );
  };
  
  // Handle share tutorial
  const handleShareTutorial = (id: string) => {
    // In a real app, this would open a share modal or use the Web Share API
    if (navigator.share) {
      navigator.share({
        title: tutorials.find(t => t.id === id)?.title || "Great tutorial",
        text: "Check out this awesome tutorial!",
        url: `${window.location.origin}/tutorials/${id}`,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/tutorials/${id}`)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch((error) => console.log('Error copying link:', error));
    }
  };
  
  useEffect(() => {
    // Simulating loading saved tutorials from localStorage or API
    const savedFromStorage = localStorage.getItem('savedTutorials');
    if (savedFromStorage) {
      setSavedTutorials(JSON.parse(savedFromStorage));
    }
    
    const likedFromStorage = localStorage.getItem('likedTutorials');
    if (likedFromStorage) {
      setLikedTutorials(JSON.parse(likedFromStorage));
    }
  }, []);
  
  useEffect(() => {
    // Persist saved tutorials to localStorage
    localStorage.setItem('savedTutorials', JSON.stringify(savedTutorials));
  }, [savedTutorials]);
  
  useEffect(() => {
    // Persist liked tutorials to localStorage
    localStorage.setItem('likedTutorials', JSON.stringify(likedTutorials));
  }, [likedTutorials]);

  // Section header animation variants
  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Container variant for staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Common grid class with responsive columns and updated spacing
  const gridClass = "grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 md:gap-7 lg:gap-8";

  return (
    <div className="space-y-12 md:space-y-20">
      {/* Beginner section */}
      <section ref={beginnerRef} className="px-2 sm:px-4 md:px-6 lg:px-0" id="all-beginners">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-2">
          <motion.div
            className="flex items-center gap-3"
            initial="hidden"
            animate={beginnerInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <div className="p-1.5 sm:p-2 rounded-full bg-green-100 dark:bg-green-900/20">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground dark:text-gray-100">Beginner Friendly</h2>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground dark:text-gray-400">Perfect starting points for newcomers</p>
            </div>
          </motion.div>
          <Button variant="ghost" className="gap-1 self-start sm:self-center hover:bg-transparent hover:text-primary dark:hover:text-primary-light" asChild>
            <a href="#all-beginners" className="text-xs sm:text-sm">
              View all
              <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>
        
        <motion.div 
          className={gridClass}
          variants={containerVariants}
          initial="hidden"
          animate={beginnerInView ? "visible" : "hidden"}
        >
          {beginnerTutorials.slice(0, 4).map((tutorial, index) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              index={index}
              onSave={handleSaveTutorial}
              onShare={handleShareTutorial}
              onLike={handleLikeTutorial}
              isSaved={savedTutorials.includes(tutorial.id)}
              isLiked={likedTutorials.includes(tutorial.id)}
            />
          ))}
        </motion.div>
      </section>
      
      <Separator className="my-8 md:my-10 lg:my-12 opacity-70 dark:opacity-50" />
      
      {/* Intermediate section */}
      <section ref={intermediateRef} className="px-2 sm:px-4 md:px-6 lg:px-0" id="all-intermediate">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-2">
          <motion.div
            className="flex items-center gap-3"
            initial="hidden"
            animate={intermediateInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
              <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground dark:text-gray-100">Level Up Your Skills</h2>
              <p className="text-sm md:text-base text-muted-foreground dark:text-gray-400">Expand your knowledge with these intermediate tutorials</p>
            </div>
          </motion.div>
          <Button variant="ghost" className="gap-1 self-start sm:self-center hover:bg-transparent hover:text-primary dark:hover:text-primary-light" asChild>
            <a href="#all-intermediate" className="text-sm">
              View all
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>
        
        <motion.div 
          className={gridClass}
          variants={containerVariants}
          initial="hidden"
          animate={intermediateInView ? "visible" : "hidden"}
        >
          {intermediateTutorials.slice(0, 4).map((tutorial, index) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              index={index}
              onSave={handleSaveTutorial}
              onShare={handleShareTutorial}
              onLike={handleLikeTutorial}
              isSaved={savedTutorials.includes(tutorial.id)}
              isLiked={likedTutorials.includes(tutorial.id)}
            />
          ))}
        </motion.div>
      </section>
      
      <Separator className="my-8 md:my-10 lg:my-12 opacity-70 dark:opacity-50" />
      
      {/* Advanced section */}
      <section ref={advancedRef} className="px-2 sm:px-4 md:px-6 lg:px-0" id="all-advanced">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-2">
          <motion.div
            className="flex items-center gap-3"
            initial="hidden"
            animate={advancedInView ? "visible" : "hidden"}
            variants={sectionVariants}
          >
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
              <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground dark:text-gray-100">Master Advanced Concepts</h2>
              <p className="text-sm md:text-base text-muted-foreground dark:text-gray-400">Challenge yourself with expert-level content</p>
            </div>
          </motion.div>
          <Button variant="ghost" className="gap-1 self-start sm:self-center hover:bg-transparent hover:text-primary dark:hover:text-primary-light" asChild>
            <a href="#all-advanced" className="text-sm">
              View all
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Button>
        </div>
        
        <motion.div 
          className={gridClass}
          variants={containerVariants}
          initial="hidden"
          animate={advancedInView ? "visible" : "hidden"}
        >
          {advancedTutorials.slice(0, 4).map((tutorial, index) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              index={index}
              onSave={handleSaveTutorial}
              onShare={handleShareTutorial}
              onLike={handleLikeTutorial}
              isSaved={savedTutorials.includes(tutorial.id)}
              isLiked={likedTutorials.includes(tutorial.id)}
            />
          ))}
        </motion.div>
      </section>
      
      <Separator className="my-8 md:my-10 lg:my-12 opacity-70 dark:opacity-50" />
      
      {/* All tutorials */}
      <section className="px-2 sm:px-4 md:px-6 lg:px-0">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-foreground dark:text-gray-100">All Tutorials</h2>
        <motion.div 
          className={gridClass}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tutorials.slice(0, visibleTutorials).map((tutorial, index) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              index={index}
              onSave={handleSaveTutorial}
              onShare={handleShareTutorial}
              onLike={handleLikeTutorial}
              isSaved={savedTutorials.includes(tutorial.id)}
              isLiked={likedTutorials.includes(tutorial.id)}
            />
          ))}
          
          {/* Loading skeleton for next items that would load */}
          {loading && Array.from({ length: 4 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="h-full rounded-xl overflow-hidden border border-border/30 dark:border-gray-700/30 bg-card/60 dark:bg-gray-800/40 animate-pulse">
              <div className="aspect-video bg-muted/70 dark:bg-gray-700/50"></div>
              <div className="p-5 space-y-3">
                <div className="h-5 bg-muted/70 dark:bg-gray-700/50 rounded w-3/4"></div>
                <div className="h-4 bg-muted/70 dark:bg-gray-700/50 rounded w-full"></div>
                <div className="h-4 bg-muted/70 dark:bg-gray-700/50 rounded w-5/6"></div>
                <div className="h-10 bg-muted/70 dark:bg-gray-700/50 rounded"></div>
                <div className="flex gap-2 pt-2">
                  <div className="h-8 w-8 bg-muted/70 dark:bg-gray-700/50 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-muted/70 dark:bg-gray-700/50 rounded w-1/2"></div>
                    <div className="h-3 bg-muted/70 dark:bg-gray-700/50 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {visibleTutorials < tutorials.length && !loading && (
          <div className="flex justify-center mt-10 md:mt-12">
            <Button 
              onClick={handleLoadMore} 
              variant="outline" 
              size="lg"
              className="gap-2 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
            >
              Load More Tutorials
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
          </div>
        )}
        
        {loading && (
          <div className="flex justify-center mt-10 md:mt-12">
            <Button 
              variant="outline" 
              size="lg"
              className="gap-2"
              disabled
            >
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default TutorialGrid; 