"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  MessageCircle,
  X,
  Code as CodeIcon,
  AlertTriangle,
  Send,
  Share2,
  Heart,
  Bookmark,
  ExternalLink,
  Download,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TutorialShare } from "@/components/tutorial-share";
import { TutorialVideo } from "@/components/tutorial-video";

// Define section type
interface Section {
  id: string;
  title: string;
}

// Python Advanced Patterns Tutorial
export default function PythonAdvancedPatternsTutorial() {
  // State for interactive elements
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [userCode, setUserCode] = useState("# Your advanced Python code here\n\n");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Define sections
  const sections: Section[] = [
    { id: "intro", title: "Introduction" },
    { id: "decorators", title: "Python Decorators" },
    { id: "context", title: "Context Managers" },
    { id: "combined", title: "Combined Patterns" },
    { id: "practice", title: "Advanced Exercises" },
    { id: "conclusion", title: "Conclusion" }
  ];

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
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  // Handle share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = "Python Advanced Patterns: Decorators & Context Managers";
  
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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950 to-gray-950 text-white overflow-hidden">
      {/* Main Container */}
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
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-900/50 text-cyan-300 border border-cyan-700/30">
                  Advanced
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-900/50 text-teal-300 border border-teal-700/30">
                  Design Patterns
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-500 bg-clip-text text-transparent">
                  Python Advanced Patterns
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
                  </div>
                </div>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mb-6">
                Master advanced Python techniques: decorators, context managers, and elegant code patterns
              </p>

              <div className="flex flex-wrap items-center gap-3 gap-y-2 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1.5" />
                  <span>By Michael Chen</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>Updated April 1, 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>25 min read</span>
                </div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
              <div className="absolute top-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            </div>
          </header>

          {/* Main content placeholder */}
          <main className="px-4 sm:px-6 md:px-8 pb-20 pt-4 max-w-5xl mx-auto">
            <div className="p-8 rounded-xl bg-gray-900/50 backdrop-blur-md border border-gray-800">
              {/* Video Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Introduction to Advanced Python Patterns</h2>
                
                <TutorialVideo
                  videoId="BY4sVSCaslE"
                  title="Python Advanced Patterns"
                  autoplay={false}
                />
                
                <p className="text-gray-300 mt-4">
                  This tutorial covers advanced Python design patterns that will elevate your coding skills and help you write more elegant, maintainable code.
                  We'll explore decorators and context managers in depth, with real-world applications.
                </p>

                <Button 
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => completeSection("intro")}
                >
                  Mark Introduction Complete
                </Button>
              </div>
              
              {/* Decorators Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Python Decorators</h2>
                
                <p className="text-gray-300 mb-4">
                  Decorators are a powerful way to modify or enhance functions and methods without changing their core implementation. 
                  They follow the principle of aspect-oriented programming by separating cross-cutting concerns.
                </p>
                
                {/* Basic Decorator Example */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Basic Function Decorators</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4 relative group">
                    <div className="absolute right-3 top-3">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(
                            "def timing_decorator(func):\n    def wrapper(*args, **kwargs):\n        import time\n        start_time = time.time()\n        result = func(*args, **kwargs)\n        end_time = time.time()\n        print(f\"Function {func.__name__} took {end_time - start_time:.4f} seconds to run\")\n        return result\n    return wrapper\n\n@timing_decorator\ndef slow_function():\n    import time\n    time.sleep(1)\n    print(\"Function executed\")\n\nslow_function()"
                          );
                          setCodeCopied(true);
                          setTimeout(() => setCodeCopied(false), 2000);
                        }} 
                        className="p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400"
                      >
                        {codeCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    
                    <pre className="text-blue-300 font-mono text-sm overflow-x-auto"><code>{`def timing_decorator(func):
    def wrapper(*args, **kwargs):
        import time
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Function {func.__name__} took {end_time - start_time:.4f} seconds to run")
        return result
    return wrapper

@timing_decorator
def slow_function():
    import time
    time.sleep(1)
    print("Function executed")

slow_function()`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    This decorator measures and reports the execution time of any function it decorates. When applied to <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">slow_function</code>, 
                    it will print how long the function took to execute.
                  </p>
                </div>
                
                {/* Decorator with Arguments */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Decorators with Arguments</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <pre className="text-blue-300 font-mono text-sm overflow-x-auto"><code>{`def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            result = None
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(times=3)
def greet(name):
    print(f"Hello, {name}!")
    
greet("Python Expert")`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    This more advanced decorator takes an argument (<code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">times</code>) 
                    that controls how many times the decorated function will be called.
                  </p>
                </div>
              </div>
              
              {/* Context Managers Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Context Managers</h2>
                
                <p className="text-gray-300 mb-4">
                  Context managers provide a elegant way to handle resource acquisition and release. 
                  The <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">with</code> statement in Python uses context managers to ensure proper setup and cleanup actions.
                </p>
                
                {/* Basic Context Manager */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Class-based Context Managers</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <pre className="text-blue-300 font-mono text-sm overflow-x-auto"><code>{`class Timer:
    def __enter__(self):
        import time
        self.start_time = time.time()
        return self
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        self.end_time = time.time()
        print(f"Execution took {self.end_time - self.start_time:.4f} seconds")
        # Return False to propagate exceptions
        return False
        
# Using the context manager
with Timer():
    # Code to be timed
    import time
    time.sleep(1.5)
    print("Operation complete")`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    This context manager times the execution of a block of code. The <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">__enter__</code> method runs 
                    when entering the <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">with</code> block, and <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">__exit__</code> runs when leaving it.
                  </p>
                </div>
                
                {/* Contextlib Example */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Using contextlib</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <pre className="text-blue-300 font-mono text-sm overflow-x-auto"><code>{`from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start_time = time.time()
    try:
        yield  # This is where the with-block's content executes
    finally:
        end_time = time.time()
        print(f"Execution took {end_time - start_time:.4f} seconds")

# Using the context manager
with timer():
    # Code to be timed
    import time
    time.sleep(1.5)
    print("Operation complete")`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    The <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">contextlib</code> module simplifies creating context managers using the 
                    <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">@contextmanager</code> decorator. The code before <code className="bg-gray-900 px-1 py-0.5 rounded text-cyan-300">yield</code> is the setup, 
                    and the code after is the cleanup.
                  </p>
                </div>
              </div>
              
              {/* Practice Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Practice Exercise</h2>
                
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                  <h3 className="text-xl font-semibold mb-3">Try It Yourself</h3>
                  
                  <p className="text-gray-300 mb-4">
                    Write a decorator that logs the arguments and return value of a function. 
                    Then create a context manager that suppresses specific exceptions.
                  </p>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <textarea
                      className="w-full h-40 bg-transparent text-blue-300 font-mono text-sm focus:outline-none resize-none"
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="# Write your Python code here"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Run Code
                    </Button>
                    <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Resources and Next Steps */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <a 
                    href="https://docs.python.org/3/library/contextlib.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                      <ExternalLink className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-200">Python contextlib Documentation</h4>
                      <p className="text-sm text-gray-400">Official Python documentation</p>
                    </div>
                  </a>
                  
                  <a 
                    href="#" 
                    className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-teal-900/50 flex items-center justify-center">
                      <Download className="h-5 w-5 text-teal-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-200">Decorators Cheat Sheet</h4>
                      <p className="text-sm text-gray-400">PDF reference guide</p>
                    </div>
                  </a>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/tutorials/python-loops" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/70 hover:bg-gray-900 border border-gray-800 rounded-lg transition-colors"
                  >
                    <span>Python Loops Tutorial</span>
                  </Link>
                  
                  <Link 
                    href="/tutorials/python-dictionaries" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/70 hover:bg-gray-900 border border-gray-800 rounded-lg transition-colors"
                  >
                    <span>Python Dictionaries Tutorial</span>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
        
        {/* Sidebar - desktop */}
        <div className="hidden lg:block lg:w-64 xl:w-72 shrink-0 p-4">
          <div className="sticky top-24 w-full">
            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800/50 rounded-xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Table of Contents</h3>
                <div className="w-10 h-10 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium relative"
                    style={{
                      background: `conic-gradient(theme(colors.blue.500) ${progress}%, transparent 0)`,
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
                        ? "bg-blue-900/30 text-blue-300"
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
              
              <div className="mt-6 p-3 rounded-lg bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-800/30">
                <h4 className="font-medium text-sm mb-2">Prerequisites</h4>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li className="flex items-start">
                    <Check className="h-3.5 w-3.5 text-cyan-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span>Intermediate Python knowledge</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-3.5 w-3.5 text-cyan-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span>Understanding of functions and classes</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-3.5 w-3.5 text-cyan-500 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span>Basic knowledge of exceptions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Table of Contents - bottom sheet */}
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
                  <div className="w-6 h-6 rounded-full bg-blue-900/50 border border-blue-500/30 flex items-center justify-center text-xs">
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
                        ? "bg-blue-900/30 text-blue-300"
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
            <div className="w-5 h-5 rounded-full bg-blue-900/80 border border-blue-500/30 flex items-center justify-center text-[10px]">
              {Math.round(progress)}%
            </div>
          </Button>
        </div>
      </div>
      
      {/* Chat bubble for mobile */}
      <div className="fixed bottom-16 right-4 z-40">
        <Button
          size="icon"
          className={`h-12 w-12 rounded-full shadow-lg ${
            isChatOpen
              ? "bg-red-600 hover:bg-red-700"
              : "bg-blue-600 hover:bg-blue-700"
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
                <div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-xs">
                  AI
                </div>
                <div className="bg-gray-900 rounded-lg p-2 text-gray-300">
                  <p>Hello! I'm your advanced Python patterns assistant. How can I help you with decorators or context managers?</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Ask a question..."
                className="w-full bg-gray-950 rounded-md border border-gray-800 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-6 w-6 rounded-md bg-blue-600"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 