"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Play, 
  ChevronRight, 
  Clock, 
  Calendar, 
  User, 
  Copy, 
  Check, 
  ExternalLink,
  Download,
  MessageCircle,
  X,
  Maximize,
  Code as CodeIcon,
  AlertTriangle,
  Star,
  Send,
  Sparkles,
  Users,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Heart,
  Bookmark,
  SkipBack,
  SkipForward,
  Volume2,
  Pause,
  Settings,
  Fullscreen
} 
from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Define section type
interface Section {
  id: string;
  title: string;
}

// Tutorial page component
export default function PythonLoopsTutorial() {
  // State for interactive elements
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullScreenCode, setIsFullScreenCode] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [userCode, setUserCode] = useState("# Write your loop here\n\n");
  const [output, setOutput] = useState("");
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(124);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Define sections
  const sections: Section[] = [
    { id: "intro", title: "Introduction to Loops" },
    { id: "core", title: "For Loops" },
    { id: "while", title: "While Loops" },
    { id: "practice", title: "Practice Challenges" },
    { id: "advanced", title: "Advanced Techniques" },
    { id: "conclusion", title: "Conclusion" }
  ];

  // Refs for scroll tracking
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    concepts: useRef<HTMLDivElement>(null),
    practice: useRef<HTMLDivElement>(null),
    advanced: useRef<HTMLDivElement>(null),
    conclusion: useRef<HTMLDivElement>(null),
  };

  // Ensure components are mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle section completion
  const completeSection = (section: string) => {
    if (!completedSections.includes(section)) {
      const newCompleted = [...completedSections, section];
      setCompletedSections(newCompleted);
      setProgress((newCompleted.length / 5) * 100);
    }
  };

  // Handle code copy
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  // Handle code execution simulation
  const runCode = () => {
    // Simple simulation - in a real app, this would use a proper code execution engine
    try {
      if (userCode.includes("for") && userCode.includes("range") && userCode.includes("print")) {
        setOutput("0\n2\n4\n6\n8\n10");
        completeSection("practice");
      } else {
        setOutput("Error: Make sure your code includes a for loop with range() and print()");
      }
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  // Scroll tracking for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      // Check each section's position
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current && 
            scrollPosition >= ref.current.offsetTop && 
            scrollPosition < ref.current.offsetTop + ref.current.offsetHeight) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Example Python code snippets
  const forLoopExample = `# Basic for loop example
for i in range(5):
    print(i)

# Output:
# 0
# 1
# 2
# 3
# 4`;

  const advancedExample = `# Using enumerate for index tracking
fruits = ["apple", "banana", "cherry"]
for index, fruit in enumerate(fruits):
    print(f"Index {index}: {fruit}")

# Output:
# Index 0: apple
# Index 1: banana
# Index 2: cherry`;

  const practiceChallenge = `# Write a loop to print even numbers from 0 to 10
for i in range(0, 11, 2):
    print(i)`;

  // Handle like functionality
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  // Handle share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = "Master Python Loops in 15 Minutes";
  
  const shareSocial = (platform: string) => {
    if (typeof window === 'undefined') return;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(window.location.href)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-indigo-950 to-gray-950 text-white overflow-hidden">
      {/* Main Container - Adding better mobile responsive layout */}
      <div className="flex flex-col lg:flex-row w-full relative">
        {/* Main content area */}
        <div className="flex-grow">
          {/* Header Section */}
          <header className="pt-28 pb-12 px-4 md:px-8 relative">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-700/30">
                  Python
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-700/30">
                  Beginner
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-700/30">
                  Coding
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                  Master Python Loops in 15 Minutes
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
                    <Button 
                      onClick={() => setIsShareOpen(!isShareOpen)}
                      variant="ghost" 
                      size="sm"
                      className="flex items-center gap-1.5 text-gray-400 hover:text-indigo-400"
                    >
                      <Share2 className="h-5 w-5" />
                      <span className="sr-only md:not-sr-only md:inline-block">Share</span>
                    </Button>
                    
                    {isShareOpen && (
                      <div className="absolute top-full right-0 mt-2 bg-gray-900 border border-gray-800 rounded-lg shadow-lg p-2 z-20">
                        <div className="flex items-center gap-2 p-1">
                          <Button 
                            onClick={() => shareSocial('twitter')}
                            variant="ghost" 
                            size="sm"
                            className="flex-1 flex items-center justify-center gap-1.5 text-gray-300 hover:text-blue-400 hover:bg-blue-900/20"
                          >
                            <Twitter className="h-4 w-4" />
                            <span className="text-xs">Twitter</span>
                          </Button>
                          
                          <Button 
                            onClick={() => shareSocial('facebook')}
                            variant="ghost" 
                            size="sm"
                            className="flex-1 flex items-center justify-center gap-1.5 text-gray-300 hover:text-blue-600 hover:bg-blue-900/20"
                          >
                            <Facebook className="h-4 w-4" />
                            <span className="text-xs">Facebook</span>
                          </Button>
                          
                          <Button 
                            onClick={() => shareSocial('linkedin')}
                            variant="ghost" 
                            size="sm"
                            className="flex-1 flex items-center justify-center gap-1.5 text-gray-300 hover:text-blue-700 hover:bg-blue-900/20"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span className="text-xs">LinkedIn</span>
                          </Button>
                        </div>
                        
                        <div className="mt-2 px-2">
                          <div className="flex items-center bg-gray-950 rounded-md p-1.5">
                            <input 
                              type="text" 
                              value={shareUrl}
                              readOnly
                              className="flex-1 bg-transparent border-none text-xs text-gray-400 focus:outline-none"
                            />
                            <Button 
                              onClick={() => {
                                navigator.clipboard.writeText(shareUrl);
                              }}
                              variant="ghost" 
                              size="sm"
                              className="text-xs text-indigo-400 hover:text-indigo-300"
                            >
                              Copy
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mb-6">
                Learn loops with hands-on examples and real-time coding
              </p>

              <div className="flex flex-wrap items-center gap-3 gap-y-2 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1.5" />
                  <span>By Jane Doe</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>Updated March 31, 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>15 min read</span>
                </div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
              <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
            </div>
          </header>

          {/* Main content sections */}
          <main className="px-4 sm:px-6 md:px-8 pb-20 pt-4 max-w-5xl mx-auto">
            {/* Hero visual section - Improved for mobile */}
            <div className="relative aspect-video sm:aspect-[16/9] md:aspect-[2/1] lg:aspect-video mb-12 overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur border border-gray-800/50">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-gray-900/50"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="w-full max-w-md">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-white">
                    Visual Learning & Interactive Code
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300 mb-6">
                    Watch a quick overview video and then practice with our interactive code editor
                  </p>
                  
                  <Button 
                    onClick={() => setIsVideoOpen(true)}
                    size="lg" 
                    className="bg-indigo-600 hover:bg-indigo-700 mx-auto flex items-center gap-2"
                  >
                    <Play className="h-5 w-5" /> 
                    <span>Watch Introduction</span>
                  </Button>
                </div>
              </div>
              
              {/* Animated loop graphic background */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full max-w-xl max-h-xl relative">
                  {/* Animated code orbit elements would go here */}
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
                </div>
              </div>
            </div>

            {/* Section 1: Introduction to Loops */}
            <section id="introduction" className="mb-16">
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                <div className="md:w-1/3 lg:w-1/4 shrink-0">
                  <div className="aspect-square bg-gray-900/50 rounded-lg overflow-hidden relative">
                    <Image 
                      src="/images/thumbnails/python.svg"
                      alt="Introduction to Loops"
                      fill
                      className="object-cover p-5"
                    />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
                    Introduction to Loops
                  </h2>
                  
                  <div className="prose prose-invert prose-blue max-w-none">
                    <p className="mb-4">
                      Loops are a fundamental concept in programming that allow you to execute a block of code multiple times. Python offers several types of loops, each with its own specific use case:
                    </p>
                    
                    <ul className="space-y-2 mb-6">
                      <li>
                        <strong>For loops</strong> - Used to iterate over sequences (lists, tuples, dictionaries, sets, strings)
                      </li>
                      <li>
                        <strong>While loops</strong> - Execute a block of code as long as a condition is true
                      </li>
                      <li>
                        <strong>Nested loops</strong> - Loops inside loops for working with multi-dimensional data
                      </li>
                    </ul>
                    
                    <p>
                      In this tutorial, we'll explore all these loop types with practical examples.
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-3">
                    <Button 
                      onClick={() => setActiveSection("core")}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      Continue to Core Concepts <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                    
                    <Button
                      onClick={() => completeSection("intro")}
                      variant="outline"
                      className="border-gray-700"
                    >
                      Mark as Complete
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Core Concepts */}
            <section 
              id="concepts" 
              ref={sectionRefs.concepts} 
              className="mb-16 bg-gray-900/30 border border-gray-800 rounded-xl p-6 md:p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">2. For Loops</h2>
              
              <p className="text-gray-300 text-lg mb-6">
                For loops iterate over sequences such as lists, tuples, or strings. The basic syntax uses the <code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">for</code> keyword followed by a variable name and the <code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">in</code> keyword.
              </p>

              <div className="mb-8">
                <div className="mb-2 flex justify-between items-center">
                  <h3 className="font-semibold text-white">Basic For Loop Example</h3>
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => copyCode(forLoopExample)}
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-gray-400 hover:text-white"
                    >
                      {codeCopied ? (
                        <Check className="h-3.5 w-3.5 mr-1.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 mr-1.5" />
                      )}
                      {codeCopied ? "Copied!" : "Copy"}
                    </Button>
                    <Button 
                      onClick={() => {
                        // Simulate code running
                        completeSection("concepts");
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-8 bg-indigo-600/30 text-xs text-indigo-300 hover:bg-indigo-600/50"
                    >
                      <Play className="h-3.5 w-3.5 mr-1.5" />
                      Run
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <pre className="bg-gray-950/70 border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto text-gray-300">
                    <code>{forLoopExample}</code>
                  </pre>
                  <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
              </div>

              <div className="mb-8 bg-gray-900/60 border border-gray-800 rounded-lg p-5">
                <h3 className="font-semibold mb-4 text-white">Interactive Code Editor</h3>
                <p className="text-gray-300 mb-4">Try modifying the code below and run it to see the output.</p>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-md">editor.py</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => setIsFullScreenCode(!isFullScreenCode)}
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-gray-400 hover:text-white"
                      >
                        <Maximize className="h-3.5 w-3.5 mr-1.5" />
                        {isFullScreenCode ? "Exit Full" : "Full Screen"}
                      </Button>
                      <Button 
                        onClick={runCode}
                        variant="ghost"
                        size="sm"
                        className="h-8 bg-green-600/30 text-xs text-green-300 hover:bg-green-600/50"
                      >
                        <Play className="h-3.5 w-3.5 mr-1.5" />
                        Run Code
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden">
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full bg-gray-950 text-gray-300 font-mono text-sm p-4 min-h-[120px] focus:outline-none border-b border-gray-800"
                    />
                    
                    <div className="p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-xs text-gray-500">Output:</span>
                      </div>
                      <pre className="font-mono text-sm text-gray-300 min-h-[80px] p-2 bg-black/30 rounded-md">
                        {output || "# Run the code to see output here"}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-5">
                  <h3 className="font-semibold mb-3 text-white">The range() Function</h3>
                  <p className="text-gray-300 mb-3">
                    The <code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">range()</code> function generates a sequence of numbers:
                  </p>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li><code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">range(stop)</code> - From 0 to stop-1</li>
                    <li><code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">range(start, stop)</code> - From start to stop-1</li>
                    <li><code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">range(start, stop, step)</code> - Using step increments</li>
                  </ul>
                </div>
                <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-5">
                  <h3 className="font-semibold mb-3 text-white">Loop Variables</h3>
                  <p className="text-gray-300 mb-3">
                    The loop variable (e.g., <code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">i</code>) takes each value in the sequence:
                  </p>
                  <div className="bg-gray-950/70 border border-gray-800 rounded-lg p-3 font-mono text-sm text-gray-300">
                    <p># The variable i takes values: 0, 1, 2</p>
                    <p>for i in range(3):</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;print(i)</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Practice */}
            <section 
              id="practice" 
              ref={sectionRefs.practice} 
              className="mb-16 bg-gray-900/30 border border-gray-800 rounded-xl p-6 md:p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">3. Practice Challenge</h2>
              
              <p className="text-gray-300 text-lg mb-6">
                Let's apply what we've learned by working through a practical challenge. This will help solidify your understanding of loops.
              </p>

              <div className="mb-8 bg-indigo-900/20 border border-indigo-800/30 rounded-lg p-5">
                <h3 className="font-semibold mb-3 text-white">Challenge: Print Even Numbers</h3>
                <p className="text-gray-300 mb-4">
                  Write a loop that prints all even numbers from 0 to 10 (inclusive).
                </p>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-indigo-300 font-medium">Your Solution:</span>
                    <Button 
                      onClick={() => setShowSolution(!showSolution)}
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-gray-400 hover:text-white"
                    >
                      {showSolution ? "Hide Solution" : "Show Solution"}
                    </Button>
                  </div>
                  
                  <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden transition-all duration-300">
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="w-full bg-gray-950 text-gray-300 font-mono text-sm p-4 min-h-[120px] focus:outline-none"
                      placeholder="# Write your code here"
                    />
                  </div>

                  <div className="flex justify-end mt-2">
                    <Button 
                      onClick={runCode}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Run Code
                    </Button>
                  </div>

                  {output && (
                    <div className="mt-4 bg-gray-950/70 border border-gray-800 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-xs text-gray-500">Output:</span>
                      </div>
                      <pre className="font-mono text-sm text-gray-300">
                        {output}
                      </pre>
                    </div>
                  )}
                </div>
                
                <AnimatePresence>
                  {showSolution && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-indigo-900/30 border border-indigo-700/30 rounded-lg">
                        <h4 className="font-medium text-indigo-300 mb-2">Solution:</h4>
                        <pre className="bg-gray-950/70 border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto text-gray-300">
                          <code>{practiceChallenge}</code>
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-5">
                <h3 className="font-semibold mb-4 text-white">Knowledge Check</h3>
                <p className="text-gray-300 mb-6">Test your understanding with this quick question:</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-white mb-3">What does range(3) output?</h4>
                  <div className="space-y-2">
                    {[
                      { value: "1, 2, 3", label: "[1, 2, 3]" },
                      { value: "0, 1, 2", label: "[0, 1, 2]" },
                      { value: "0, 1, 2, 3", label: "[0, 1, 2, 3]" },
                      { value: "1, 2", label: "[1, 2]" }
                    ].map((option) => (
                      <div 
                        key={option.value}
                        onClick={() => setQuizAnswer(option.value)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          quizAnswer === option.value
                            ? quizAnswer === "0, 1, 2"
                              ? "bg-green-900/20 border-green-700/50 text-green-300"
                              : "bg-red-900/20 border-red-700/50 text-red-300"
                            : "bg-gray-900/60 border-gray-800 text-gray-300 hover:bg-gray-800/60"
                        }`}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                </div>
                
                {quizAnswer && (
                  <div className={`p-4 rounded-lg ${
                    quizAnswer === "0, 1, 2"
                      ? "bg-green-900/20 border border-green-700/50 text-green-300"
                      : "bg-red-900/20 border border-red-700/50 text-red-300"
                  }`}>
                    {quizAnswer === "0, 1, 2" ? (
                      <p className="flex items-start">
                        <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Correct! <code className="px-1.5 py-0.5 bg-gray-800/30 rounded-md font-mono text-sm">range(3)</code> generates the sequence [0, 1, 2].</span>
                      </p>
                    ) : (
                      <p className="flex items-start">
                        <X className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <span>Not quite. <code className="px-1.5 py-0.5 bg-gray-800/30 rounded-md font-mono text-sm">range(3)</code> generates the sequence [0, 1, 2]. The end parameter is exclusive.</span>
                      </p>
                    )}
                  </div>
                )}
                
                {quizAnswer === "0, 1, 2" && (
                  <div className="mt-4 flex justify-center">
                    <div className="bg-indigo-900/30 border border-indigo-700/30 rounded-full px-4 py-2 flex items-center">
                      <span className="text-indigo-300 font-medium mr-2">+50 XP</span>
                      <span className="text-xs text-indigo-400">Earned for completing quiz</span>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Section 4: Advanced Tips */}
            <section 
              id="advanced" 
              ref={sectionRefs.advanced} 
              className="mb-16 bg-gray-900/30 border border-gray-800 rounded-xl p-6 md:p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">4. Advanced Tips</h2>
              
              <p className="text-gray-300 text-lg mb-6">
                Once you've mastered the basics, these advanced techniques will help you write more elegant and efficient Python code.
              </p>

              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-5">
                  <h3 className="font-semibold mb-3 text-white flex items-center">
                    <CodeIcon className="mr-2 h-4 w-4 text-indigo-400" />
                    Using enumerate()
                  </h3>
                  <p className="text-gray-300 mb-4">
                    When you need both the index and value from a sequence, use <code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">enumerate()</code> instead of tracking the index manually.
                  </p>
                  <div className="relative mb-2">
                    <pre className="bg-gray-950/70 border border-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto text-gray-300">
                      <code>{advancedExample}</code>
                    </pre>
                    <div className="absolute -inset-px bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                  <Button 
                    onClick={() => copyCode(advancedExample)}
                    variant="ghost"
                    size="sm"
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    {codeCopied ? (
                      <Check className="h-3.5 w-3.5 mr-1.5" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 mr-1.5" />
                    )}
                    {codeCopied ? "Copied!" : "Copy Code"}
                  </Button>
                </div>
                
                <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-5">
                  <h3 className="font-semibold mb-3 text-white flex items-center">
                    <Play className="mr-2 h-4 w-4 text-indigo-400" />
                    Video: Enumerate in Action
                  </h3>
                  <div className="aspect-video relative bg-black/50 rounded-lg overflow-hidden mb-2">
                    {/* Video thumbnail - would be actual video component in production */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button 
                        onClick={() => {
                          // Would play video
                          completeSection("advanced");
                        }}
                        variant="ghost"
                        className="h-12 w-12 rounded-full bg-indigo-600/50 hover:bg-indigo-600/80 backdrop-blur-sm text-white"
                      >
                        <Play className="h-6 w-6" />
                      </Button>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                    <p className="absolute bottom-3 left-3 text-sm text-white font-medium">
                      1-min demo of enumerate()
                    </p>
                    <Image 
                      src="/images/thumbnails/python.svg" 
                      alt="Enumerate Demo"
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-gray-400">
                    Hover to play this quick demo of enumerate in action.
                  </p>
                </div>
              </div>

              <div className="mb-8 bg-red-900/20 border border-red-800/30 rounded-lg p-5">
                <div className="flex items-start mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-red-300 mb-2">Caution: Avoid Infinite Loops</h3>
                    <p className="text-gray-300">
                      When using loops, especially while loops, always ensure there's a way to exit the loop. Infinite loops can crash your program or cause it to become unresponsive.
                    </p>
                  </div>
                </div>
                
                <div className="bg-red-950/30 border border-red-900/30 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Common causes of infinite loops:</h4>
                  <ul className="space-y-2 text-gray-300 list-disc list-inside">
                    <li>Forgetting to update the loop counter</li>
                    <li>Condition that never becomes false</li>
                    <li>Using wrong comparison operators</li>
                    <li>Logic errors in the loop body</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-5">
                  <h3 className="font-semibold mb-3 text-white">Loop Control</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li><code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">break</code> - Exit the loop early</li>
                    <li><code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">continue</code> - Skip to next iteration</li>
                    <li><code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">else</code> - Execute when loop completes</li>
                  </ul>
                </div>
                
                <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-5">
                  <h3 className="font-semibold mb-3 text-white">Iterating Techniques</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Use <code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">zip()</code> for multiple lists</li>
                    <li>Dictionary loops with <code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">items()</code></li>
                    <li>Set loops for unique values</li>
                  </ul>
                </div>
                
                <div className="bg-gray-900/60 border border-gray-800 rounded-lg p-5">
                  <h3 className="font-semibold mb-3 text-white">Performance Tips</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Use list comprehensions</li>
                    <li>Avoid modifying during iteration</li>
                    <li>Consider generator expressions</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: Conclusion */}
            <section 
              id="conclusion" 
              ref={sectionRefs.conclusion} 
              className="mb-16 bg-gray-900/30 border border-gray-800 rounded-xl p-6 md:p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">5. Conclusion</h2>
              
              <p className="text-gray-300 text-lg mb-6">
                Congratulations! You've mastered the basics of Python loops in just 15 minutes. Let's recap what you've learned:
              </p>

              <div className="mb-8 bg-gray-900/60 border border-gray-800 rounded-lg p-5">
                <h3 className="font-semibold mb-4 text-white">Key Takeaways</h3>
                <ul className="space-y-3 text-gray-300 list-disc list-inside">
                  <li>Loops help you execute code repeatedly and efficiently</li>
                  <li>For loops iterate over sequences using the format <code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">for item in sequence</code></li>
                  <li>The <code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">range()</code> function generates number sequences to iterate over</li>
                  <li>Use <code className="px-1.5 py-0.5 bg-gray-800 rounded-md text-indigo-300 font-mono text-sm">enumerate()</code> when you need both index and value</li>
                  <li>Be careful to avoid infinite loops in your code</li>
                </ul>
              </div>

              <div className="mb-8 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-700/30 rounded-lg p-5">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-600/50 flex items-center justify-center mr-4">
                    <Sparkles className="h-5 w-5 text-indigo-200" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">What's Next?</h3>
                    <p className="text-gray-300">
                      Ready to continue your Python journey? Check out these recommended topics:
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                  <Link 
                    href="/tutorials/python-functions"
                    className="bg-indigo-900/30 hover:bg-indigo-900/50 border border-indigo-700/30 rounded-lg p-3 text-indigo-200 transition-colors"
                  >
                    Python Functions
                  </Link>
                  <Link 
                    href="/tutorials/python-lists"
                    className="bg-indigo-900/30 hover:bg-indigo-900/50 border border-indigo-700/30 rounded-lg p-3 text-indigo-200 transition-colors"
                  >
                    Python Lists & Dictionaries
                  </Link>
                  <Link 
                    href="/tutorials/python-classes"
                    className="bg-indigo-900/30 hover:bg-indigo-900/50 border border-indigo-700/30 rounded-lg p-3 text-indigo-200 transition-colors"
                  >
                    Python Classes
                  </Link>
                </div>
              </div>

              <Button 
                onClick={() => completeSection("conclusion")}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3"
              >
                Complete Tutorial
              </Button>
            </section>

            {/* Resources Bar */}
            <div className="mb-16 bg-gray-900/30 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-white mb-4">Additional Resources</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                  <Link 
                    href="https://docs.python.org/3/tutorial/controlflow.html#for-statements"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-300 hover:text-indigo-200 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Python Documentation
                  </Link>
                  <Link 
                    href="https://github.com/python/cpython"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-indigo-300 hover:text-indigo-200 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    GitHub Repository
                  </Link>
                  <Link 
                    href="/tutorials/python-functions"
                    className="flex items-center text-indigo-300 hover:text-indigo-200 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Next Tutorial: Python Functions
                  </Link>
                </div>
                
                <div className="flex items-center justify-center md:justify-end">
                  <Button 
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white"
                    onClick={() => {
                      // Download logic would go here
                    }}
                  >
                    <Download className="h-4 w-4" />
                    Download Python Loops Cheat Sheet (PDF)
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Tutorials */}
            <div className="mb-16">
              <h3 className="font-semibold text-2xl text-white mb-6">Related Tutorials</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Python Functions",
                    description: "Learn how to create and use functions in Python",
                    image: "/images/thumbnails/python.svg",
                    href: "/tutorials/python-functions",
                    duration: "12 min",
                    level: "Beginner"
                  },
                  {
                    title: "Python Lists",
                    description: "Master working with lists and list comprehensions",
                    image: "/images/thumbnails/python.svg",
                    href: "/tutorials/python-lists",
                    duration: "10 min",
                    level: "Beginner"
                  },
                  {
                    title: "Python Dictionaries",
                    description: "Store and retrieve data with key-value pairs",
                    image: "/images/thumbnails/python.svg",
                    href: "/tutorials/python-dictionaries",
                    duration: "15 min",
                    level: "Intermediate"
                  }
                ].map((tutorial, index) => (
                  <Link 
                    key={index}
                    href={tutorial.href}
                    className="group bg-gray-900/40 hover:bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden transition-all hover:shadow-lg hover:shadow-indigo-900/20"
                  >
                    <div className="aspect-video relative">
                      <Image 
                        src={tutorial.image}
                        alt={tutorial.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-300 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {tutorial.duration}
                          </span>
                          <span className="bg-indigo-900/70 text-indigo-300 text-xs rounded-full px-2 py-0.5">
                            {tutorial.level}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                        {tutorial.title}
                      </h4>
                      <p className="text-sm text-gray-400 mb-2">
                        {tutorial.description}
                      </p>
                      <div className="flex items-center text-xs text-indigo-400">
                        <span>Learn more</span>
                        <ChevronRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Community Comments */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-2xl text-white">Community Discussion</h3>
                <span className="bg-indigo-900/40 text-indigo-300 text-sm rounded-full px-3 py-1 flex items-center">
                  <Users className="h-3.5 w-3.5 mr-1.5" />
                  Join 5k learners
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                {[
                  {
                    name: "Sarah Miller",
                    avatar: "/avatars/sarah.svg",
                    timestamp: "2 days ago",
                    content: "This tutorial was fantastic! I finally understand how loops work in Python. Thank you!",
                    likes: 12
                  },
                  {
                    name: "David Chen",
                    avatar: "/avatars/alex.svg",
                    timestamp: "1 week ago",
                    content: "The interactive code examples really helped me grasp the concepts. I would love to see more advanced loop patterns in a follow-up tutorial.",
                    likes: 8
                  },
                  {
                    name: "Michelle Rodriguez",
                    avatar: "/avatars/sophie.svg",
                    timestamp: "3 weeks ago",
                    content: "Great explanation of enumerate()! I've been using Python for a while but never knew about this feature. This is going to save me so much time.",
                    likes: 24
                  }
                ].map((comment, index) => (
                  <div 
                    key={index}
                    className="bg-gray-900/40 border border-gray-800 rounded-xl p-4"
                  >
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gray-800 overflow-hidden mr-3">
                        <Image 
                          src={comment.avatar}
                          alt={comment.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <div>
                            <span className="font-medium text-white">{comment.name}</span>
                            <span className="text-xs text-gray-500 ml-2">{comment.timestamp}</span>
                          </div>
                          <Button 
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs text-gray-400 hover:text-indigo-300"
                          >
                            <Star className="h-3.5 w-3.5 mr-1.5" />
                            {comment.likes}
                          </Button>
                        </div>
                        <p className="text-gray-300">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4">
                <h4 className="font-medium text-white mb-3">Add Your Comment</h4>
                <textarea 
                  className="w-full bg-gray-950/70 border border-gray-800 rounded-lg p-3 text-gray-300 min-h-[100px] focus:outline-none focus:border-indigo-700"
                  placeholder="Share your thoughts or ask a question..."
                />
                <div className="flex justify-end mt-3">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Post Comment
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
        
        {/* Sidebar - Make it a sticky sidebar on desktop, and a bottom sheet on mobile */}
        <div className="hidden lg:block lg:w-64 xl:w-72 shrink-0 p-4">
          <div className="sticky top-24 w-full">
            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800/50 rounded-xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Table of Contents</h3>
                <div className="w-10 h-10 rounded-full bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium relative"
                    style={{
                      background: `conic-gradient(theme(colors.indigo.500) ${progress}%, transparent 0)`,
                    }}
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-950 flex items-center justify-center">
                      {Math.round(progress)}%
                    </div>
                  </div>
                </div>
              </div>
              
              <nav className="space-y-1">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left ${
                      activeSection === section.id
                        ? "bg-indigo-900/30 text-indigo-300"
                        : "text-gray-400 hover:text-gray-300"
                    } ${
                      completedSections.includes(section.id)
                        ? "border-l-2 border-green-500"
                        : ""
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    {section.title}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>
        
        {/* Mobile Table of Contents (bottom sheet) */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
          <div 
            className={`${
              isMobileNavOpen 
                ? "translate-y-0" 
                : "translate-y-full"
            } transform transition-transform duration-300 ease-in-out`}
          >
            <div className="bg-gray-900/95 backdrop-blur-xl border-t border-gray-800 rounded-t-xl shadow-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Table of Contents</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  className="rounded-full h-8 w-8 p-0"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1 items-center text-xs text-gray-400">
                  <div className="w-6 h-6 rounded-full bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-xs">
                    {Math.round(progress)}%
                  </div>
                  <span>Complete</span>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-xs"
                  onClick={() => {
                    const nextSection = sections.find(
                      (s) => !completedSections.includes(s.id)
                    );
                    if (nextSection) setActiveSection(nextSection.id);
                  }}
                >
                  Continue Learning
                </Button>
              </div>
              
              <nav className="grid grid-cols-2 gap-1 max-h-60 overflow-y-auto">
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant="ghost"
                    size="sm"
                    className={`justify-start text-left text-sm ${
                      activeSection === section.id
                        ? "bg-indigo-900/30 text-indigo-300"
                        : "text-gray-400"
                    } ${
                      completedSections.includes(section.id)
                        ? "border-l-2 border-green-500"
                        : ""
                    }`}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsMobileNavOpen(false);
                    }}
                  >
                    {section.title}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Mobile Navigation Tab */}
          <Button
            className="mx-auto -mt-3 flex items-center justify-center gap-1 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-full shadow-lg px-4 py-1 text-sm relative z-10"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            <span>Contents</span>
            <div className="w-5 h-5 rounded-full bg-indigo-900/80 border border-indigo-500/30 flex items-center justify-center text-[10px]">
              {Math.round(progress)}%
            </div>
          </Button>
        </div>
      </div>
      
      {/* Chat bubble for mobile - Fixed position */}
      <div className="fixed bottom-16 right-4 z-40">
        <Button
          size="icon"
          className={`h-12 w-12 rounded-full shadow-lg ${
            isChatOpen
              ? "bg-red-600 hover:bg-red-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5" />
          )}
        </Button>
        
        {isChatOpen && (
          <div className="absolute bottom-16 right-0 w-72 sm:w-80 bg-gray-900 border border-gray-800 rounded-lg shadow-xl p-3">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-sm">Learning Assistant</h4>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 rounded-full p-0"
                onClick={() => setIsChatOpen(false)}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
            
            <div className="h-64 overflow-y-auto bg-gray-950 rounded-md p-3 mb-3 text-sm">
              <div className="flex gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center text-xs">
                  AI
                </div>
                <div className="bg-gray-900 rounded-lg p-2 text-gray-300">
                  <p>Hello! I'm your Python loops learning assistant. How can I help you today?</p>
                </div>
              </div>
              
              {/* More chat messages would go here */}
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Ask a question..."
                className="w-full bg-gray-950 rounded-md border border-gray-800 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-6 w-6 rounded-md bg-indigo-600"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Video Modal - Enhanced with custom controls */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 500 }}
              className="relative w-full max-w-5xl bg-gray-900 overflow-hidden rounded-xl shadow-2xl"
            >
              <div className="absolute right-2 top-2 z-30">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsVideoOpen(false)}
                  className="h-8 w-8 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              
              <div className="aspect-video bg-black relative">
                {/* Video Player */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* For the demo, we'd use an iframe for Youtube or Vimeo, but here's a placeholder */}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    poster="/images/thumbnails/python.svg"
                    controls={false}
                  >
                    <source src="/path-to-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Custom Video Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end">
                    <div className="p-4">
                      {/* Progress Bar */}
                      <div className="w-full h-1 bg-gray-800 rounded-full mb-4 cursor-pointer">
                        <div 
                          className="h-full bg-indigo-500 rounded-full"
                          style={{ width: `${videoProgress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                            onClick={() => {
                              // Simulating backward 10s
                              console.log("Rewind 10 seconds");
                            }}
                          >
                            <SkipBack className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20"
                            onClick={() => {
                              setIsVideoPlaying(!isVideoPlaying);
                              // In reality, would use videoRef to play/pause
                              console.log("Toggle play/pause");
                            }}
                          >
                            {isVideoPlaying ? (
                              <Pause className="h-5 w-5" />
                            ) : (
                              <Play className="h-5 w-5" />
                            )}
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                            onClick={() => {
                              // Simulating forward 10s
                              console.log("Forward 10 seconds");
                            }}
                          >
                            <SkipForward className="h-4 w-4" />
                          </Button>
                          
                          <div className="flex items-center ml-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 rounded-full text-white hover:bg-white/10"
                              onClick={() => setIsMuted(!isMuted)}
                            >
                              <Volume2 className={`h-4 w-4 ${isMuted ? 'text-red-500' : 'text-white'}`} />
                            </Button>
                            <span className="text-xs text-gray-300 ml-2">0:00 / 3:00</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                            onClick={() => {
                              // Quality settings
                              console.log("Toggle quality settings");
                            }}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20"
                            onClick={() => {
                              // Toggle fullscreen
                              console.log("Toggle fullscreen");
                            }}
                          >
                            <Fullscreen className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-800">
                <h3 className="font-semibold text-lg text-white">Master Python Loops in 15 Minutes</h3>
                <p className="text-sm text-gray-400 mt-1">
                  This video explains the basics of Python loops and shows you how to implement them in real-world scenarios.
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`flex items-center gap-1.5 ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                      onClick={handleLike}
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500' : ''}`} />
                      <span>{likeCount}</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex items-center gap-1.5 text-gray-400 hover:text-indigo-400"
                      onClick={() => setIsShareOpen(!isShareOpen)}
                    >
                      <Share2 className="h-5 w-5" />
                      <span>Share</span>
                    </Button>
                  </div>
                  
                  <div className="flex items-center">
                    <Button 
                      onClick={() => {
                        setIsVideoOpen(false);
                        completeSection("intro");
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700"
                    >
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Chat Bubble */}
      <div className="fixed bottom-8 right-8 z-40">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className="absolute bottom-16 right-0 w-80 bg-gray-900 rounded-xl border border-gray-800 shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h4 className="font-semibold text-white">Ask a Question</h4>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsChatOpen(false)}
                  className="h-6 w-6 rounded-full bg-gray-800 text-gray-400 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="p-4 h-64 bg-gray-950/50 overflow-y-auto">
                <div className="space-y-3">
                  <div className="bg-indigo-900/30 rounded-lg p-3 ml-8 text-sm text-gray-300">
                    <p>Hi there! How can I help you with Python loops?</p>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-3 mr-8 text-sm text-gray-300">
                    <p>I'm having trouble with the range() function. Can you explain it again?</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 border-t border-gray-800 flex gap-2">
                <input 
                  type="text"
                  placeholder="Type your question..."
                  className="flex-grow bg-gray-950/70 border border-gray-800 rounded-lg p-2 text-sm text-gray-300 focus:outline-none focus:border-indigo-700"
                />
                <Button className="bg-indigo-600 hover:bg-indigo-700 px-3">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`h-14 w-14 rounded-full shadow-lg flex items-center justify-center ${
            isChatOpen 
              ? "bg-red-600 hover:bg-red-700" 
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isChatOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Full Screen Code Editor */}
      <AnimatePresence>
        {isFullScreenCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-gray-950/95 backdrop-blur-sm p-4 md:p-8 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-xl text-white">Python Code Playground</h3>
              <Button
                variant="ghost"
                onClick={() => setIsFullScreenCode(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5 mr-2" />
                Close
              </Button>
            </div>
            
            <div className="flex-grow flex flex-col bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="flex-grow w-full bg-gray-950 text-gray-300 font-mono text-sm p-6 focus:outline-none resize-none border-b border-gray-800"
              />
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Output:</span>
                  <Button 
                    onClick={runCode}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Run Code
                  </Button>
                </div>
                <pre className="font-mono text-sm text-gray-300 min-h-[200px] p-4 bg-black/50 rounded-md overflow-auto">
                  {output || "# Run the code to see output here"}
                </pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 