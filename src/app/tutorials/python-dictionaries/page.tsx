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

// Python Dictionaries Tutorial
export default function PythonDictionariesTutorial() {
  // State for interactive elements
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [progress, setProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [userCode, setUserCode] = useState("# Your dictionary code here\n\n");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(87);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Define sections
  const sections: Section[] = [
    { id: "intro", title: "Introduction to Dictionaries" },
    { id: "basics", title: "Dictionary Basics" },
    { id: "methods", title: "Dictionary Methods" },
    { id: "advanced", title: "Advanced Dictionary Techniques" },
    { id: "practice", title: "Practice Problems" },
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
  const shareTitle = "Master Python Dictionaries - Intermediate Tutorial";
  
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
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-gray-950 text-white overflow-hidden">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full relative">
        {/* Main content area */}
        <div className="flex-grow">
          {/* Header Section */}
          <header className="pt-28 pb-12 px-4 md:px-8 relative">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-700/30">
                  Python
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-300 border border-blue-700/30">
                  Intermediate
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-900/50 text-indigo-300 border border-indigo-700/30">
                  Data Structures
                </span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                  Mastering Python Dictionaries
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
                Take your Python skills to the next level with a deep dive into dictionaries for efficient data management
              </p>

              <div className="flex flex-wrap items-center gap-3 gap-y-2 text-xs sm:text-sm text-gray-400">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1.5" />
                  <span>By Alex Johnson</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  <span>Updated April 1, 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  <span>20 min read</span>
                </div>
              </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
              <div className="absolute top-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
            </div>
          </header>

          {/* Main content placeholder - to be expanded */}
          <main className="px-4 sm:px-6 md:px-8 pb-20 pt-4 max-w-5xl mx-auto">
            <div className="p-8 rounded-xl bg-gray-900/50 backdrop-blur-md border border-gray-800">
              {/* Video Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Introduction to Python Dictionaries</h2>
                
                <TutorialVideo
                  videoId="XCcpzWs-CI4"
                  title="Python Dictionaries Tutorial"
                  autoplay={false}
                />
                
                <p className="text-gray-300 mt-4">
                  Dictionaries are one of Python's most powerful and flexible data structures. Unlike sequences which are indexed by a range of numbers, 
                  dictionaries are indexed by keys, which can be any immutable type. Think of a dictionary as an unordered set of key-value pairs, with the requirement that the keys are unique.
                </p>

                <Button 
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => completeSection("intro")}
                >
                  Mark Introduction Complete
                </Button>
              </div>
              
              {/* Dictionary Basics Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Dictionary Basics</h2>
                
                <p className="text-gray-300 mb-4">
                  Dictionaries are defined by enclosing a comma-separated list of key-value pairs within braces.
                  Each key is separated from its associated value by a colon.
                </p>
                
                {/* Dictionary Creation Example */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Creating Dictionaries</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4 relative group">
                    <div className="absolute right-3 top-3">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(
                            "# Empty dictionary\nempty_dict = {}\n\n# Dictionary with initial values\nuser = {\n    'name': 'Alex Johnson',\n    'age': 28,\n    'is_admin': True,\n    'skills': ['Python', 'SQL', 'JavaScript']\n}\n\n# Using dict() constructor\nconfig = dict(theme='dark', language='en', notifications=True)\n\n# Accessing values\nprint(user['name'])  # Output: Alex Johnson\n\n# Get with default value (avoids KeyError)\nprint(user.get('location', 'Unknown'))  # Output: Unknown"
                          );
                          setCodeCopied(true);
                          setTimeout(() => setCodeCopied(false), 2000);
                        }} 
                        className="p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400"
                      >
                        {codeCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    
                    <pre className="text-purple-300 font-mono text-sm overflow-x-auto"><code>{`# Empty dictionary
empty_dict = {}

# Dictionary with initial values
user = {
    'name': 'Alex Johnson',
    'age': 28,
    'is_admin': True,
    'skills': ['Python', 'SQL', 'JavaScript']
}

# Using dict() constructor
config = dict(theme='dark', language='en', notifications=True)

# Accessing values
print(user['name'])  # Output: Alex Johnson

# Get with default value (avoids KeyError)
print(user.get('location', 'Unknown'))  # Output: Unknown`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    In the example above, we create and access dictionaries using different methods. The <code className="bg-gray-900 px-1 py-0.5 rounded text-purple-300">get()</code> method is particularly 
                    useful as it provides a default value instead of raising a <code className="bg-gray-900 px-1 py-0.5 rounded text-purple-300">KeyError</code> when a key doesn't exist.
                  </p>
                </div>
                
                {/* Dictionary Modification Example */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Modifying Dictionaries</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <pre className="text-purple-300 font-mono text-sm overflow-x-auto"><code>{`# Starting with our user dictionary
user = {
    'name': 'Alex Johnson',
    'age': 28,
    'is_admin': True
}

# Adding a new key-value pair
user['email'] = 'alex@example.com'

# Updating an existing value
user['age'] = 29

# Adding multiple key-value pairs at once
user.update({
    'location': 'New York',
    'department': 'Engineering'
})

print(user)
# Output: {'name': 'Alex Johnson', 'age': 29, 'is_admin': True, 
#          'email': 'alex@example.com', 'location': 'New York', 
#          'department': 'Engineering'}

# Removing a key-value pair
del user['is_admin']

# Removing and returning a value (with default)
email = user.pop('email', None)
print(email)  # Output: alex@example.com

# Removing all items
user.clear()
print(user)  # Output: {}`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    Dictionaries are mutable, so you can add, update, and remove key-value pairs after creation. 
                    The <code className="bg-gray-900 px-1 py-0.5 rounded text-purple-300">update()</code> method is efficient for adding multiple pairs at once, 
                    while <code className="bg-gray-900 px-1 py-0.5 rounded text-purple-300">pop()</code> is useful for removing a key and getting its value in a single operation.
                  </p>
                </div>
              </div>
              
              {/* Dictionary Methods Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Dictionary Methods</h2>
                <p className="text-gray-300 mb-4">
                  Python dictionaries come with many built-in methods that make them powerful and flexible for data manipulation.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Common Dictionary Methods</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4 relative group">
                    <div className="absolute right-3 top-3">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(
                            "# Empty dictionary\nempty_dict = {}\n\n# Dictionary with initial values\nuser = {\n    'name': 'Alex Johnson',\n    'age': 28,\n    'is_admin': True,\n    'skills': ['Python', 'SQL', 'JavaScript']\n}\n\n# Using dict() constructor\nconfig = dict(theme='dark', language='en', notifications=True)\n\n# Accessing values\nprint(user['name'])  # Output: Alex Johnson\n\n# Get with default value (avoids KeyError)\nprint(user.get('location', 'Unknown'))  # Output: Unknown"
                          );
                          setCodeCopied(true);
                          setTimeout(() => setCodeCopied(false), 2000);
                        }} 
                        className="p-1.5 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400"
                      >
                        {codeCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    
                    <pre className="text-purple-300 font-mono text-sm overflow-x-auto">
                      <code>
                        {/* Define the product object for the example */}
                        {(() => {
                          const product = {
                            name: 'Smartphone',
                            price: 799.99,
                            in_stock: true,
                            features: ['Camera', '5G', 'Water Resistant']
                          };
                          return `product = {
    'name': 'Smartphone',
    'price': 799.99,
    'in_stock': True,
    'features': ['Camera', '5G', 'Water Resistant']
}

# Get all keys
keys = product.keys()
print(list(keys))  # Output: ['name', 'price', 'in_stock', 'features']

# Get all values
values = product.values()
print(list(values))  # Output: ['Smartphone', 799.99, True, ['Camera', '5G', 'Water Resistant']]

# Get all key-value pairs as tuples
items = product.items()
print(list(items))  # Output: [('name', 'Smartphone'), ('price', 799.99), ...]

# Check if a key exists
if 'price' in product:
    print(f"Price: ${product.price}")

# Copy a dictionary
product_copy = product.copy()

# Get number of items
print(len(product))  # Output: 4`;
                        })()}
                      </code>
                    </pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    These methods make it easy to work with all aspects of a dictionary. Note that <code className="bg-gray-900 px-1 py-0.5 rounded text-purple-300">keys()</code>,
                    <code className="bg-gray-900 px-1 py-0.5 rounded text-purple-300">values()</code>, and <code className="bg-gray-900 px-1 py-0.5 rounded text-purple-300">items()</code>
                    return view objects that dynamically reflect changes to the dictionary.
                  </p>
                </div>
                
                {/* Dictionary Comprehensions */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Dictionary Comprehensions</h3>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <pre className="text-purple-300 font-mono text-sm overflow-x-auto"><code>{`# Create a dictionary of squares (1²=1, 2²=4, ...)
squares = {x: x**2 for x in range(1, 6)}
print(squares)  # Output: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Filter out items with if condition
even_squares = {x: x**2 for x in range(1, 11) if x % 2 == 0}
print(even_squares)  # Output: {2: 4, 4: 16, 6: 36, 8: 64, 10: 100}

# Transform an existing dictionary
prices = {'apple': 1.2, 'banana': 0.5, 'orange': 0.8}
sale_prices = {item: price * 0.8 for item, price in prices.items()}
print(sale_prices)  # Output: {'apple': 0.96, 'banana': 0.4, 'orange': 0.64}`}</code></pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    Dictionary comprehensions provide a concise way to create dictionaries, similar to list comprehensions.
                    They're useful for transforming data or creating dictionaries from other sequences or mappings.
                  </p>
                </div>
              </div>
              
              {/* Practice Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Practice Exercise</h2>
                
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                  <h3 className="text-xl font-semibold mb-3">Try It Yourself</h3>
                  
                  <p className="text-gray-300 mb-4">
                    Create a function that counts the frequency of each word in a text and returns a dictionary with words as keys and their counts as values.
                    Then implement a way to find the most common word.
                  </p>
                  
                  <div className="bg-gray-950 rounded-lg p-4 mb-4">
                    <textarea
                      className="w-full h-40 bg-transparent text-purple-300 font-mono text-sm focus:outline-none resize-none"
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      placeholder="# Write your Python dictionary code here"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => completeSection("practice")}
                    >
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
                    href="https://docs.python.org/3/tutorial/datastructures.html#dictionaries" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-purple-900/50 flex items-center justify-center">
                      <ExternalLink className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-200">Python Dictionary Documentation</h4>
                      <p className="text-sm text-gray-400">Official Python documentation</p>
                    </div>
                  </a>
                  
                  <a 
                    href="#" 
                    className="flex items-center gap-3 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-indigo-900/50 flex items-center justify-center">
                      <Download className="h-5 w-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-200">Dictionary Cheat Sheet</h4>
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
                    href="/tutorials/python-advanced-patterns" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/70 hover:bg-gray-900 border border-gray-800 rounded-lg transition-colors"
                  >
                    <span>Python Advanced Patterns</span>
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
                <div className="w-10 h-10 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium relative"
                    style={{
                      background: `conic-gradient(theme(colors.purple.500) ${progress}%, transparent 0)`,
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
                        ? "bg-purple-900/30 text-purple-300"
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
                  <div className="w-6 h-6 rounded-full bg-purple-900/50 border border-purple-500/30 flex items-center justify-center text-xs">
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
                        ? "bg-purple-900/30 text-purple-300"
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
            <div className="w-5 h-5 rounded-full bg-purple-900/80 border border-purple-500/30 flex items-center justify-center text-[10px]">
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
              : "bg-purple-600 hover:bg-purple-700"
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
                <div className="w-6 h-6 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center text-xs">
                  AI
                </div>
                <div className="bg-gray-900 rounded-lg p-2 text-gray-300">
                  <p>Hello! I'm your Python dictionaries learning assistant. How can I help you with your dictionary questions?</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Ask a question..."
                className="w-full bg-gray-950 rounded-md border border-gray-800 py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <Button
                size="icon"
                className="absolute right-1 top-1 h-6 w-6 rounded-md bg-purple-600"
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