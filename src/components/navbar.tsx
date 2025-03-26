"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X, ChevronDown, Search, Github, Bell } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// Define the navigation items for reuse
const navigationItems = [
  { 
    name: "Tutorials", 
    href: "/tutorials",
    submenu: [
      { name: "Web Development", href: "/tutorials/web-development" },
      { name: "Mobile Development", href: "/tutorials/mobile-development" },
      { name: "Data Science", href: "/tutorials/data-science" },
      { name: "DevOps", href: "/tutorials/devops" },
    ]
  },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { 
    name: "Resources", 
    href: "/resources",
    submenu: [
      { name: "Documentation", href: "/resources/documentation" },
      { name: "Cheatsheets", href: "/resources/cheatsheets" },
      { name: "Videos", href: "/resources/videos" },
    ]
  },
  { name: "Community", href: "/community" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// Mock search results - replace with actual API call in production
const searchItems = [
  { title: "React Hooks Tutorial", category: "tutorial", href: "/tutorials/react-hooks" },
  { title: "NextJS Routing Guide", category: "tutorial", href: "/tutorials/nextjs-routing" },
  { title: "Building a Chat App", category: "project", href: "/projects/chat-app" },
  { title: "CSS Animation Tricks", category: "blog", href: "/blog/css-animation-tricks" },
  { title: "Responsive Design Best Practices", category: "tutorial", href: "/tutorials/responsive-design" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof searchItems>([]);
  const [showResults, setShowResults] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  // Framer Motion scroll animation
  const { scrollY } = useScroll();
  const navbarBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.97)"]
  );
  const navbarBackgroundDark = useTransform(
    scrollY,
    [0, 50],
    ["rgba(17, 24, 39, 0.8)", "rgba(17, 24, 39, 0.97)"]
  );
  const navbarHeight = useTransform(scrollY, [0, 50], ["4.5rem", "3.5rem"]);
  
  // Handle search input
  useEffect(() => {
    if (searchTerm.length > 1) {
      // Filter search results (replace with API call in production)
      const filteredResults = searchItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchTerm]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setShowResults(false);
      setSearchFocused(false);
    }
  };

  // Handle toggle submenu
  const handleToggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      if (isMenuOpen) setIsMenuOpen(false);
      if (activeSubmenu) setActiveSubmenu(null);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen, activeSubmenu]);

  // Handle click outside of search and notifications
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
        setShowResults(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef, notificationRef]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  // Notification items
  const notifications = [
    { id: 1, text: "New tutorial: React Patterns 2023", time: "10 min ago", href: "/tutorials/react-patterns" },
    { id: 2, text: "Your project submission was approved", time: "1 hour ago", href: "/account/projects" },
    { id: 3, text: "New comment on your question", time: "3 hours ago", href: "/community/questions/123" },
  ];

  // Mark notifications as read
  const handleMarkAllAsRead = () => {
    setNotificationCount(0);
  };

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        isScrolled 
          ? "border-gray-200 dark:border-gray-800 shadow-sm backdrop-blur-md" 
          : "border-transparent backdrop-blur-sm"
      )}
      style={{ 
        backgroundColor: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches 
          ? navbarBackgroundDark 
          : navbarBackground,
        height: navbarHeight,
      }}
    >
      <div className="container flex items-center justify-between h-full">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0"
        >
          <Link 
            href="/" 
            className="flex items-center space-x-2 font-bold text-base sm:text-lg md:text-xl"
            aria-label="Dev Mindset"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              Dev Mindset
            </span>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <div key={item.name} className="relative">
              {item.submenu ? (
                <>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className={cn(
                      "px-3 py-2 flex items-center space-x-1 rounded-md text-gray-700 dark:text-gray-300 transition-colors",
                      isScrolled 
                        ? "hover:bg-gray-100 dark:hover:bg-gray-800" 
                        : "hover:bg-white/20 dark:hover:bg-black/20",
                      pathname.startsWith(item.href) 
                        ? "text-indigo-700 dark:text-indigo-400 font-medium" 
                        : ""
                    )}
                    onClick={() => handleToggleSubmenu(item.name)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${activeSubmenu === item.name ? 'rotate-180' : ''}`} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {activeSubmenu === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: 10, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-60 p-2 rounded-lg bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 z-50"
                      >
                        {item.submenu.map((subitem) => (
                          <Link 
                            key={subitem.name}
                            href={subitem.href}
                            className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            onClick={() => setActiveSubmenu(null)}
                          >
                            {subitem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Link 
                    href={item.href} 
                    className={cn(
                      "px-3 py-2 block rounded-md text-gray-700 dark:text-gray-300 transition-colors",
                      isScrolled 
                        ? "hover:bg-gray-100 dark:hover:bg-gray-800" 
                        : "hover:bg-white/20 dark:hover:bg-black/20",
                      pathname === item.href 
                        ? "text-indigo-700 dark:text-indigo-400 font-medium" 
                        : ""
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )}
            </div>
          ))}
        </nav>
        
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          {/* Search Bar */}
          <motion.div 
            ref={searchRef}
            className={`hidden md:flex items-center relative ${searchFocused ? 'w-56 md:w-72' : 'w-40 md:w-48'}`}
            animate={{ width: searchFocused ? 'auto' : 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2 text-sm rounded-full border text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all",
                  isScrolled
                    ? "border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90"
                    : "border-gray-200/70 dark:border-gray-700/70 bg-white/70 dark:bg-gray-800/70"
                )}
                onFocus={() => setSearchFocused(true)}
              />
            </form>
            
            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-1 p-2 rounded-lg bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 z-50"
                >
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1">
                    Search Results
                  </div>
                  {searchResults.map((result, index) => (
                    <Link
                      key={index}
                      href={result.href}
                      className="block px-2 py-1.5 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => {
                        setSearchTerm("");
                        setShowResults(false);
                        setSearchFocused(false);
                      }}
                    >
                      <div className="font-medium">{result.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{result.category}</div>
                    </Link>
                  ))}
                  <Link
                    href={`/search?q=${encodeURIComponent(searchTerm)}`}
                    className="block mt-1 px-2 py-1.5 text-xs text-center text-indigo-600 dark:text-indigo-400 hover:underline"
                    onClick={() => {
                      setSearchTerm("");
                      setShowResults(false);
                      setSearchFocused(false);
                    }}
                  >
                    View all results
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Notification Bell - Desktop Only */}
          <motion.div
            ref={notificationRef}
            className="hidden md:block relative"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={20} className="text-gray-700 dark:text-gray-300" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full">
                  {notificationCount > 9 ? '9+' : notificationCount}
                </span>
              )}
            </motion.button>
            
            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-1 w-72 p-2 rounded-lg bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 z-50"
                >
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Notifications</div>
                    <button 
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                      onClick={handleMarkAllAsRead}
                    >
                      Mark all as read
                    </button>
                  </div>
                  
                  <div className="mt-1 space-y-1">
                    {notifications.map((notification) => (
                      <Link
                        key={notification.id}
                        href={notification.href}
                        className="block px-3 py-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setShowNotifications(false)}
                      >
                        <div className="font-medium">{notification.text}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</div>
                      </Link>
                    ))}
                  </div>
                  
                  <Link
                    href="/notifications"
                    className="block mt-1 px-2 py-1.5 text-xs text-center text-indigo-600 dark:text-indigo-400 hover:underline border-t border-gray-200 dark:border-gray-800 pt-1"
                    onClick={() => setShowNotifications(false)}
                  >
                    View all notifications
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* GitHub Link - Desktop Only */}
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="hidden md:flex p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Github size={20} className="text-gray-700 dark:text-gray-300" />
          </motion.a>
          
          {/* Login/Sign up Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300">
              <Link href="/auth/login">Log in</Link>
            </Button>
            <Button asChild size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 text-white border-0">
              <Link href="/auth/signup">Sign up</Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-gray-300" />
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[calc(4.5rem-1px)] lg:hidden bg-white dark:bg-gray-900 z-40 overflow-y-auto"
          >
            <div className="container py-4 sm:py-6 flex flex-col">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="mb-4 sm:mb-6 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tutorials, projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </form>
              
              {/* Mobile Nav Links */}
              <div className="space-y-1 sm:space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.name} className="rounded-lg overflow-hidden">
                    {item.submenu ? (
                      <div className="mb-2">
                        <button
                          className={`w-full px-4 py-2 sm:py-3 flex items-center justify-between rounded-lg ${
                            activeSubmenu === item.name 
                              ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400" 
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => handleToggleSubmenu(item.name)}
                        >
                          <span className="font-medium">{item.name}</span>
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-300 ${
                              activeSubmenu === item.name ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeSubmenu === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="pl-4 mt-1 border-l-2 border-indigo-200 dark:border-indigo-800 ml-4 space-y-1"
                            >
                              {item.submenu.map((subitem) => (
                                <Link 
                                  key={subitem.name}
                                  href={subitem.href}
                                  className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subitem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link 
                        href={item.href} 
                        className={`block px-4 py-2 sm:py-3 rounded-lg transition-colors ${
                          pathname === item.href 
                            ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400" 
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Mobile Auth Buttons */}
              <div className="mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800 grid grid-cols-2 gap-3 sm:gap-4">
                <Button variant="outline" asChild className="w-full text-gray-700 dark:text-gray-300">
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button asChild className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 text-white border-0">
                  <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </div>
              
              {/* Mobile Secondary Links */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 gap-y-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
                <Link href="/privacy" onClick={() => setIsMenuOpen(false)}>Privacy</Link>
                <Link href="/terms" onClick={() => setIsMenuOpen(false)}>Terms</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
