"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "./theme-toggle";
import { 
  Menu, X, ChevronDown, Search as SearchIcon, Bell, 
  Home, BookOpen, FileText, Layers, 
  Users, LifeBuoy, MessageCircle, Code,
  ArrowRight, Command, Github, ExternalLink,
  User, LogOut, Settings, HelpCircle, 
  BookmarkIcon, LayoutDashboard, ShieldCheck,
  AlertCircle, Star, UserPlus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "./ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";
import Search from "./search";

// Define the navigation items for reuse
const navigationItems = [
  { 
    name: "Home", 
    href: "/",
    icon: <Home className="h-4 w-4" />,
  },
  { 
    name: "Tutorials", 
    href: "/tutorials",
    icon: <BookOpen className="h-4 w-4" />,
    description: "Learn programming with step-by-step guides",
    submenu: [
      { name: "Python", href: "/tutorials?category=python", icon: <Code className="h-4 w-4" /> },
      { name: "JavaScript", href: "/tutorials?category=javascript", icon: <Code className="h-4 w-4" /> },
      { name: "Web Development", href: "/tutorials?category=web-dev", icon: <Layers className="h-4 w-4" /> },
      { name: "All Tutorials", href: "/tutorials", icon: <ArrowRight className="h-4 w-4" /> },
    ]
  },
  { 
    name: "Projects", 
    href: "/projects",
    icon: <Code className="h-4 w-4" />,
    description: "Explore featured projects and tutorials",
    submenu: [
      { name: "Web Projects", href: "/projects?category=web", icon: <Layers className="h-4 w-4" /> },
      { name: "Mobile Apps", href: "/projects?category=mobile", icon: <Layers className="h-4 w-4" /> },
      { name: "Data Science", href: "/projects?category=data", icon: <Layers className="h-4 w-4" /> },
      { name: "All Projects", href: "/projects", icon: <ArrowRight className="h-4 w-4" /> },
    ]
  },
  { 
    name: "Blog", 
    href: "/blog",
    icon: <FileText className="h-4 w-4" />,
    description: "Articles, tips and industry insights"
  },
  { 
    name: "Community", 
    href: "/community",
    icon: <Users className="h-4 w-4" />,
    description: "Join discussions and connect with others",
  },
  { 
    name: "About", 
    href: "/about",
    icon: <LifeBuoy className="h-4 w-4" />,
    description: "Learn more about our platform"
  },
];

// Sample search data (would come from backend in production)
const searchData = [
  { id: 1, title: "Python Loops Tutorial", category: "tutorial", href: "/tutorials/python-loops" },
  { id: 2, title: "Building a Chat App", category: "project", href: "/projects/chat-app" },
  { id: 3, title: "CSS Animation Tricks", category: "blog", href: "/blog/css-animation-tricks" },
  { id: 4, title: "Next.js Fundamentals", category: "tutorial", href: "/tutorials/nextjs-fundamentals" },
  { id: 5, title: "React Hooks Guide", category: "tutorial", href: "/tutorials/react-hooks" },
  { id: 6, title: "Data Visualization", category: "project", href: "/projects/data-viz" },
  { id: 7, title: "TypeScript Best Practices", category: "blog", href: "/blog/typescript-best-practices" },
  { id: 8, title: "API Development", category: "tutorial", href: "/tutorials/api-development" },
];

// Sample notifications data
const notificationsData = [
  { 
    id: 1, 
    title: "New tutorial available", 
    message: "Check out our latest tutorial on React Hooks", 
    time: "10 minutes ago",
    href: "/tutorials/react-hooks",
    read: false,
    icon: <BookOpen className="h-4 w-4" />
  },
  { 
    id: 2, 
    title: "Your project was featured", 
    message: "Congratulations! Your project was selected as a featured item", 
    time: "2 hours ago",
    href: "/projects/featured",
    read: false,
    icon: <Star className="h-4 w-4" />
  },
  { 
    id: 3, 
    title: "Community event reminder", 
    message: "Don't forget about the upcoming webinar tomorrow", 
    time: "1 day ago",
    href: "/community/events",
    read: true,
    icon: <Users className="h-4 w-4" />
  },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof searchData>([]);
  const [filteredResults, setFilteredResults] = useState<typeof searchData>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  
  const [isClient, setIsClient] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect with throttling for performance
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    const handleScroll = () => {
      if (scrollTimer) return;
      scrollTimer = setTimeout(() => {
        setScrolled(window.scrollY > 10);
        scrollTimer = undefined as unknown as NodeJS.Timeout;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  // Initialize search data
  useEffect(() => {
    setSearchResults(searchData);
  }, []);

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
    setMounted(true);
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.length >= 2) {
      // Filter search results based on query and category
      const filtered = searchResults.filter(item => {
        const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = currentCategory ? item.category === currentCategory : true;
        return matchesQuery && matchesCategory;
      });
      
      setFilteredResults(filtered);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery, currentCategory, searchResults]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchResultsRef.current && 
        !searchResultsRef.current.contains(e.target as Node) &&
        searchInputRef.current && 
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setShowSearchResults(false);
        setSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchFocused(true);
      }
      
      // Escape to close dropdowns/menus
      if (e.key === 'Escape') {
        setShowSearchResults(false);
        setSearchFocused(false);
        if (isMenuOpen) setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}${currentCategory ? `&category=${currentCategory}` : ''}`);
      setSearchQuery("");
      setShowSearchResults(false);
      setSearchFocused(false);
    }
  };

  // Check if mobile menu should close (route change)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Mark notification as read
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(item => 
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(item => ({ ...item, read: true }))
    );
  };

  // Replace auth-related handlers with basic navigation
  const goToHomePage = () => {
    router.push('/');
  };

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Define animation variants
  const mobileMenuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { opacity: 1, y: 0, height: "auto" }
  };

  return (
      <header 
        className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        scrolled && "border-b shadow-sm"
        )}
      >
      <div className="container px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex">
          {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Code className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl hidden sm:inline-block">EduCode</span>
          </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:flex">
            {navigationItems.map((item) => (
              <div 
                key={item.name} 
                className="relative" 
                onMouseEnter={() => item.submenu && setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon && (
                    <span className="mr-1">{item.icon}</span>
                  )}
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className="ml-1 h-3 w-3" />
                  )}
                </Link>

                {/* Submenu for desktop navigation */}
                {item.submenu && hoveredItem === item.name && (
                  <div className="absolute left-0 mt-1 w-60 origin-top-left rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="py-1 grid gap-1 p-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          >
                            {subItem.icon}
                          {subItem.name}
                          </Link>
                        ))}
                      </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side items */}
          <div className="flex items-center gap-4">
            {/* Search Button */}
            <div className="relative hidden md:flex">
              <div className="relative md:w-64 lg:w-80">
                <SearchInput 
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  placeholder="Search tutorials, projects..."
                  className={cn(
                    "transition-all duration-300",
                    searchFocused ? "w-full" : "w-full"
                  )}
                />
                {/* Render search results */}
                {showSearchResults && (
                  <div 
                    ref={searchResultsRef}
                    className="absolute top-full mt-1 w-full rounded-md bg-card shadow-lg border z-50 max-h-[70vh] overflow-auto"
                  >
                    {/* Search categories */}
                    <div className="flex items-center gap-1 p-2 border-b">
                      <Button 
                        size="sm" 
                      variant={currentCategory === null ? "default" : "outline"}
                        className="h-7 text-xs"
                      onClick={() => setCurrentCategory(null)}
                    >
                      All
                      </Button>
                      <Button 
                        size="sm" 
                      variant={currentCategory === "tutorial" ? "default" : "outline"}
                        className="h-7 text-xs"
                      onClick={() => setCurrentCategory("tutorial")}
                    >
                      Tutorials
                      </Button>
                      <Button 
                        size="sm" 
                      variant={currentCategory === "project" ? "default" : "outline"}
                        className="h-7 text-xs"
                      onClick={() => setCurrentCategory("project")}
                    >
                      Projects
                      </Button>
                      <Button 
                        size="sm" 
                      variant={currentCategory === "blog" ? "default" : "outline"}
                        className="h-7 text-xs"
                      onClick={() => setCurrentCategory("blog")}
                    >
                      Blog
                      </Button>
                  </div>
                  
                    {/* Search results */}
                    {filteredResults.length > 0 ? (
                      <div className="py-1">
                    {filteredResults.map((result) => (
                      <Link
                        key={result.id}
                        href={result.href}
                            onClick={() => setShowSearchResults(false)}
                            className="flex items-center px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="mr-2">
                              {result.category === "tutorial" && <BookOpen className="h-4 w-4" />}
                              {result.category === "project" && <Code className="h-4 w-4" />}
                              {result.category === "blog" && <FileText className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                        <div className="font-medium">{result.title}</div>
                              <div className="text-xs text-muted-foreground capitalize">{result.category}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                    ) : (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                </div>
              )}
                </div>
            </div>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Notifications dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground">
                      Mark all as read
                    </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  <>
                    {notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
                        <Link 
                          href={notification.href} 
                          className={cn(
                            "flex items-start gap-3 w-full p-3 hover:bg-accent rounded-sm",
                            !notification.read && "bg-slate-50 dark:bg-slate-900"
                          )}
                        >
                          <div className={cn(
                            "rounded-full p-1.5 mt-0.5",
                            !notification.read ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                          )}>
                            {notification.icon}
                          </div>
                          <div className="grid gap-0.5">
                            <p className={cn(
                              "text-sm",
                              !notification.read && "font-medium"
                            )}>{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="justify-center" asChild>
                      <Link href="/notifications" className="w-full text-center text-sm">
                        View all notifications
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <div className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">No notifications yet</p>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                  <Link href="/">
                    Guest
                    </Link>
                  </Button>
                </div>
            </div>

            {/* Mobile Menu Toggle */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-50 h-[calc(100vh-4rem)] bg-background border-t overflow-auto md:hidden"
          >
            <div className="container h-full flex flex-col divide-y">
              {/* Mobile search */}
              <div className="p-4">
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Mobile user info */}
              <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                    <AvatarImage alt="Guest" />
                    <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                    <div>
                    <p className="font-medium">Guest</p>
                    <p className="text-sm text-muted-foreground">Not logged in</p>
                    </div>
                  </div>
              </div>

              {/* Mobile navigation links */}
              <nav className="flex-1 overflow-auto py-4">
                {navigationItems.map((item) => (
                  <div key={item.name} className="mb-1">
                    <Link 
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-2 text-sm font-medium",
                        pathname === item.href 
                          ? "bg-accent text-accent-foreground" 
                          : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                      )}
                      onClick={() => !item.submenu && setIsMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                      {item.name}
                      </div>
                      {item.submenu && <ChevronDown className="h-4 w-4" />}
                    </Link>
                    
                    {/* Submenu items for mobile */}
                    {item.submenu && (
                      <div className="pl-4 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-accent/30 hover:text-accent-foreground rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.icon}
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              
              {/* Footer links in mobile menu */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" asChild className="justify-start">
                    <Link href="/help-support">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Help & Support
                      </Link>
                    </Button>
                  <Button variant="outline" size="sm" asChild className="justify-start">
                    <Link href="/privacy">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Privacy Policy
                      </Link>
                    </Button>
                  </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Custom search input component
const SearchInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative group">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          className={cn(
            "bg-background pl-8 focus-visible:ring-0 focus-visible:ring-transparent",
            className
          )}
          ref={ref}
          {...props}
        />
        <kbd className="pointer-events-none absolute right-2.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 group-focus-within:opacity-0 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
  );
}
);

SearchInput.displayName = "SearchInput";