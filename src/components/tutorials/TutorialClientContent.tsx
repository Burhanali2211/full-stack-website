"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Bookmark, Share2, Download, ArrowRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { TutorialVideo } from "@/components/tutorial-video";
import { TutorialShare } from "@/components/tutorial-share";
import { cn } from "@/lib/utils";

interface TutorialClientContentProps {
  tutorialId: string;
  tutorialContent: string;
  sections: {
    id: string;
    title: string;
    isCompleted: boolean;
  }[];
  progress: number;
  videoId?: string;
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
}

// Sample comments for the tutorial
const sampleComments = [
  {
    id: "1",
    user: {
      name: "Alex Johnson",
      avatar: "/avatars/alex.svg"
    },
    content: "This tutorial was incredibly helpful. I was struggling with understanding key concepts, but now it all makes sense!",
    date: "2 days ago",
    likes: 8
  },
  {
    id: "2",
    user: {
      name: "Emma Wilson",
      avatar: "/avatars/emma.svg"
    },
    content: "Great explanation of the structure. It would be nice to have more examples though.",
    date: "1 week ago",
    likes: 5
  },
  {
    id: "3",
    user: {
      name: "Miguel Brown",
      avatar: "/avatars/miguel.svg"
    },
    content: "The code examples were super clear. I was able to follow along and build my project with ease.",
    date: "3 weeks ago",
    likes: 12
  }
];

export default function TutorialClientContent({
  tutorialId,
  tutorialContent,
  sections,
  progress,
  videoId
}: TutorialClientContentProps) {
  const [activeTab, setActiveTab] = useState<string>("content");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopButton, setShowTopButton] = useState(false);
  const [localProgress, setLocalProgress] = useState(progress);
  const [currentSection, setCurrentSection] = useState<string>("introduction");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'larger'>('normal');
  const [darkMode, setDarkMode] = useState(false);
  
  // Handle scroll progress and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = (currentScroll / totalScroll) * 100;
      setScrollProgress(progress);
      setShowTopButton(currentScroll > 500);
      
      // Detect current section based on scroll position
      // This is simplified - in a real app you'd check headings in the DOM
      if (currentScroll < 300) {
        setCurrentSection("introduction");
      } else if (currentScroll < 600) {
        setCurrentSection("prerequisites");
      } else if (currentScroll < 900) {
        setCurrentSection("getting-started");
      } else if (currentScroll < 1200) {
        setCurrentSection("core-concepts");
      } else {
        setCurrentSection("exercise");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Load saved state and completed sections from localStorage
  useEffect(() => {
    // Load saved state
    const savedTutorials = localStorage.getItem('savedTutorials');
    if (savedTutorials) {
      const saved = JSON.parse(savedTutorials) as string[];
      setIsSaved(saved.includes(tutorialId));
    }
    
    // Load liked state
    const likedTutorials = localStorage.getItem('likedTutorials');
    if (likedTutorials) {
      const liked = JSON.parse(likedTutorials) as string[];
      setIsLiked(liked.includes(tutorialId));
    }
    
    // Load completed sections
    const completedSectionsKey = `tutorial-${tutorialId}-completed-sections`;
    const savedCompletedSections = localStorage.getItem(completedSectionsKey);
    if (savedCompletedSections) {
      setCompletedSections(JSON.parse(savedCompletedSections));
    }
    
    // Load font size preference
    const fontSizePref = localStorage.getItem('tutorial-font-size');
    if (fontSizePref) {
      setFontSize(fontSizePref as 'normal' | 'large' | 'larger');
    }
    
    // Load dark mode preference
    const darkModePref = localStorage.getItem('tutorial-dark-mode');
    if (darkModePref) {
      setDarkMode(darkModePref === 'true');
    }
  }, [tutorialId]);
  
  // Save to localStorage when state changes
  useEffect(() => {
    const savedTutorials = localStorage.getItem('savedTutorials');
    let saved: string[] = [];
    
    if (savedTutorials) {
      saved = JSON.parse(savedTutorials);
    }
    
    if (isSaved && !saved.includes(tutorialId)) {
      saved.push(tutorialId);
    } else if (!isSaved && saved.includes(tutorialId)) {
      saved = saved.filter(id => id !== tutorialId);
    }
    
    localStorage.setItem('savedTutorials', JSON.stringify(saved));
  }, [isSaved, tutorialId]);
  
  // Save liked state to localStorage
  useEffect(() => {
    const likedTutorials = localStorage.getItem('likedTutorials');
    let liked: string[] = [];
    
    if (likedTutorials) {
      liked = JSON.parse(likedTutorials);
    }
    
    if (isLiked && !liked.includes(tutorialId)) {
      liked.push(tutorialId);
    } else if (!isLiked && liked.includes(tutorialId)) {
      liked = liked.filter(id => id !== tutorialId);
    }
    
    localStorage.setItem('likedTutorials', JSON.stringify(liked));
  }, [isLiked, tutorialId]);
  
  // Save completed sections to localStorage
  useEffect(() => {
    const completedSectionsKey = `tutorial-${tutorialId}-completed-sections`;
    localStorage.setItem(completedSectionsKey, JSON.stringify(completedSections));
    
    // Update progress based on completed sections
    const totalSections = sections.length;
    const completedCount = completedSections.length;
    const newProgress = Math.round((completedCount / totalSections) * 100);
    setLocalProgress(newProgress);
    localStorage.setItem(`tutorial-${tutorialId}-progress`, newProgress.toString());
  }, [completedSections, sections.length, tutorialId]);
  
  // Save font size preference
  useEffect(() => {
    localStorage.setItem('tutorial-font-size', fontSize);
  }, [fontSize]);
  
  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('tutorial-dark-mode', darkMode.toString());
  }, [darkMode]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const newCommentObj = {
      id: `temp-${Date.now()}`,
      user: {
        name: "You",
        avatar: "/avatars/user.jpg"
      },
      content: newComment,
      date: "Just now",
      likes: 0
    };
    
    setComments([newCommentObj, ...comments]);
    setNewComment("");
  };

  const handleSave = () => {
    setIsSaved(prev => !prev);
  };
  
  const handleLike = () => {
    setIsLiked(prev => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  const handleCompleteSection = (sectionId: string) => {
    if (completedSections.includes(sectionId)) {
      // Mark as incomplete
      setCompletedSections(prev => prev.filter(id => id !== sectionId));
    } else {
      // Mark as complete
      setCompletedSections(prev => [...prev, sectionId]);
    }
  };
  
  const handleChangeFontSize = () => {
    // Cycle through font sizes
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('larger');
    else setFontSize('normal');
  };
  
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  
  // Determine content class based on font size
  const contentFontClass = fontSize === 'normal' 
    ? 'text-base' 
    : fontSize === 'large' 
      ? 'text-lg' 
      : 'text-xl';

  return (
    <div className={`space-y-6 mt-8 ${darkMode ? 'dark-content' : ''}`}>
      {/* Share modal */}
      <TutorialShare 
        title="Tutorial" 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
      />
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary/30 z-50"
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
      {/* Floating Table of Contents Button for mobile */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-6 left-6 z-40 md:hidden"
        >
          <Tabs defaultValue="toc" className="w-10 h-10">
            <TabsList className="grid grid-cols-1">
              <TabsTrigger value="toc" className="p-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-primary/10 border-primary/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
                    <line x1="8" x2="21" y1="6" y2="6"></line>
                    <line x1="8" x2="21" y1="12" y2="12"></line>
                    <line x1="8" x2="21" y1="18" y2="18"></line>
                    <line x1="3" x2="3.01" y1="6" y2="6"></line>
                    <line x1="3" x2="3.01" y1="12" y2="12"></line>
                    <line x1="3" x2="3.01" y1="18" y2="18"></line>
                  </svg>
                </Button>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="toc" className="absolute bottom-full mb-2 left-0 w-60 rounded-lg bg-card p-3 shadow-lg border border-border">
              <div className="font-medium mb-2">Tutorial Sections</div>
              <ul className="space-y-1">
                {sections.map(section => (
                  <li key={section.id}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start text-sm ${currentSection === section.id ? 'bg-primary/10 text-primary font-medium' : ''}`}
                      onClick={() => {
                        const element = document.getElementById(section.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <div className={`h-4 w-4 mr-2 flex-shrink-0 rounded-full border ${completedSections.includes(section.id) ? 'bg-primary border-primary' : 'border-muted-foreground'}`}>
                        {completedSections.includes(section.id) && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                      {section.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </motion.div>
      </AnimatePresence>
      
      {/* Back to top button */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full bg-primary shadow-lg flex items-center justify-center text-primary-foreground"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Reading Options Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/30 p-3 rounded-lg mb-6">
        {/* Left Side: Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-full border-primary/20",
                    isLiked && "text-rose-500 border-rose-500/30 bg-rose-500/10"
                  )}
                  onClick={handleLike}
                  aria-label={isLiked ? 'Unlike this tutorial' : 'Like this tutorial'}
                >
                  <Heart className={cn("h-4 w-4", isLiked && "fill-rose-500")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{isLiked ? 'Unlike' : 'Like'} this tutorial</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-full border-primary/20",
                    isSaved && "text-amber-500 border-amber-500/30 bg-amber-500/10"
                  )}
                  onClick={handleSave}
                  aria-label={isSaved ? 'Remove from bookmarks' : 'Save to bookmarks'}
                >
                  <Bookmark className={cn("h-4 w-4", isSaved && "fill-amber-500")} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{isSaved ? 'Remove from' : 'Save to'} bookmarks</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-primary/20"
                  onClick={() => setShareModalOpen(true)}
                  aria-label="Share this tutorial"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Share this tutorial</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-primary/20"
                  onClick={() => window.print()}
                  aria-label="Download tutorial"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Download tutorial</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {/* Right Side: Reading Options */}
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-full border-primary/20 px-3"
                  onClick={handleChangeFontSize}
                  aria-label="Change font size"
                >
                  <span className="mr-2">Aa</span>
                  <span className="text-xs">{fontSize === 'normal' ? 'Normal' : fontSize === 'large' ? 'Large' : 'Larger'}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Change font size</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-9 w-9 rounded-full border-primary/20",
                    darkMode && "bg-gray-800 text-gray-200 border-gray-700"
                  )}
                  onClick={toggleDarkMode}
                  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {darkMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Toggle {darkMode ? 'light' : 'dark'} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {/* Tutorial progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-1">
          <span>Your progress</span>
          <span className="font-medium">{localProgress}%</span>
        </div>
        <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
          <div 
            className={`h-full ${localProgress === 100 ? 'bg-green-500' : 'bg-primary'} transition-all duration-500 ease-out`}
            style={{ width: `${localProgress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Add the video component here */}
      {videoId && (
        <div className="mb-8 max-w-4xl rounded-xl overflow-hidden shadow-lg border border-muted">
          <TutorialVideo
            videoId={videoId}
            title="Tutorial Video"
            autoplay={false}
          />
        </div>
      )}
      
      {/* Content tabs */}
      <Tabs defaultValue="content" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full max-w-md grid grid-cols-2">
          <TabsTrigger value="content">Tutorial Content</TabsTrigger>
          <TabsTrigger value="comments">
            Comments <span className="ml-1.5 text-xs text-muted-foreground">({comments.length})</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Tutorial content or comments */}
      <div className="pt-4">
        {activeTab === "content" ? (
          <div className={`content-wrapper ${contentFontClass} ${darkMode ? 'dark-mode-content' : ''}`}>
            <MarkdownRenderer content={tutorialContent} />
            
            <div className="mt-8 flex flex-wrap gap-3">
              <Button 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white group"
                size="lg"
                onClick={() => handleCompleteSection("exercise")}
              >
                <span>{completedSections.includes("exercise") ? "Completed!" : "Complete Tutorial"}</span>
                {!completedSections.includes("exercise") && (
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
              
              {completedSections.length > 0 && (
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => setCompletedSections([])}
                  className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  Reset Progress
                </Button>
              )}
            </div>
          </div>
        ) : (
          // Comments section
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-4">
              <div className="flex-1">
                <textarea 
                  className="w-full p-3 rounded-lg bg-muted/30 border border-muted placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  rows={3}
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
              </div>
              <Button 
                className="self-end sm:self-start"
                disabled={!newComment.trim()} 
                onClick={handleAddComment}
              >
                Post Comment
              </Button>
            </div>
            
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-3 p-4 rounded-xl bg-muted/30 border border-muted/50">
                  <div className="h-10 w-10 rounded-full overflow-hidden shrink-0">
                    <img 
                      src={comment.user.avatar} 
                      alt={comment.user.name}
                      className="h-full w-full object-cover"
                      onError={(e) => (e.currentTarget.src = '/avatars/placeholder.svg')}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 mb-1">
                      <h4 className="font-medium">{comment.user.name}</h4>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Heart className="h-3 w-3" />
                        <span>{comment.likes || 0}</span>
                      </button>
                      <button className="hover:text-primary transition-colors">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* CSS for dark mode content */}
      <style jsx global>{`
        .dark-mode-content {
          background-color: #1a1a1a;
          color: #e6e6e6;
        }
        .dark-mode-content pre {
          background-color: #2d2d2d !important;
          border-color: #444 !important;
        }
        .dark-mode-content code {
          color: #e6e6e6 !important;
        }
        .dark-mode-content a {
          color: #90caf9 !important;
        }
        .dark-mode-content blockquote {
          border-color: #444 !important;
          background-color: #2d2d2d !important;
        }
      `}</style>
    </div>
  );
}
