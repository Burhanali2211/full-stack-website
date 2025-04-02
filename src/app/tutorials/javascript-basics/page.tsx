"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  User,
  Copy,
  Check,
  MessageCircle,
  X,
  Send,
  Heart,
  Bookmark,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TutorialShare } from "@/components/tutorial-share";
import { TutorialVideo } from "@/components/tutorial-video";

// Define section type
interface Section {
  id: string;
  title: string;
}

// JavaScript Basics Tutorial
export default function JavaScriptBasicsTutorial() {
  // State for interactive elements
  const [activeSection, setActiveSection] = useState("intro");
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [userCode, setUserCode] = useState("// Your JavaScript code here\n\n");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(65);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Define sections - memoized to prevent recreating on each render
  const sections = useMemo<Section[]>(() => [
    { id: "intro", title: "Introduction to JavaScript" },
    { id: "variables", title: "Variables & Data Types" },
    { id: "functions", title: "Functions" },
    { id: "conditionals", title: "Conditionals & Loops" },
    { id: "practice", title: "Practice Exercise" },
    { id: "conclusion", title: "Conclusion" }
  ], []);

  // Function to mark a section as completed
  const completeSection = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      const newCompletedSections = [...completedSections, sectionId];
      setCompletedSections(newCompletedSections);
      const newProgress = (newCompletedSections.length / sections.length) * 100;
      setProgress(newProgress);
    }
  };

  // Handle like functionality
  const handleLike = () => {
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-950 via-amber-950 to-gray-950 text-white overflow-hidden">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full relative">
        {/* Main content area */}
        <div className="flex-grow">
          {/* Header Section */}
          <header className="pt-28 pb-12 px-4 md:px-8 relative">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-900/50 text-yellow-300 border border-yellow-700/30">
                  JavaScript
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-900/50 text-amber-300 border border-amber-700/30">
                  Beginner
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-900/50 text-orange-300 border border-orange-700/30">
                  Web Development
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  JavaScript Fundamentals
                </h1>
                
                <div className="flex items-center gap-3 self-start">
                  <Button 
                    onClick={handleLike}
                    variant="ghost" 
                    size="sm"
                    className={`flex items-center gap-1.5 ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                    <span>{likeCount}</span>
                  </Button>
                  
                  <Button 
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    variant="ghost" 
                    size="sm"
                    className={`flex items-center gap-1.5 ${isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                  >
                    <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-yellow-500' : ''}`} />
                    <span className="sr-only md:not-sr-only md:inline-block">
                      {isBookmarked ? 'Saved' : 'Save'}
                    </span>
                  </Button>
                  
                  <div className="relative">
                    <TutorialShare
                      title="JavaScript Fundamentals"
                      isOpen={isShareOpen}
                      onClose={() => setIsShareOpen(false)}
                    />
                  </div>
                </div>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mb-6">
                Learn the core concepts of JavaScript, from variables and functions to conditionals and loops
              </p>

              <div className="flex flex-wrap items-center gap-3 gap-y-2 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1.5" />
                  <span>By Sarah Mitchell</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>Updated April 1, 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>18 min read</span>
                </div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
              <div className="absolute top-20 right-10 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent"></div>
            </div>
          </header>

          {/* Main content */}
          <main className="px-4 sm:px-6 md:px-8 pb-20 pt-4 max-w-5xl mx-auto">
            <div className="p-8 rounded-xl bg-gray-900/50 backdrop-blur-md border border-gray-800">
              {/* Video Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Introduction to JavaScript</h2>
                
                <TutorialVideo
                  videoId="W6NZfCO5SIk"
                  title="JavaScript Tutorial for Beginners"
                />
                
                <p className="text-gray-300 mt-4">
                  JavaScript is one of the most popular programming languages in the world, powering the interactive elements of nearly every website. 
                  Originally created to make web pages dynamic, it's now used for both front-end and back-end development, mobile apps, desktop applications, and more.
                </p>

                <Button 
                  className="mt-4 bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={() => completeSection("intro")}
                >
                  Mark Introduction Complete
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 