"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "./theme-toggle";
import { useSession } from "next-auth/react";
import { UserNav } from "./user-nav";
import { 
  Menu, X, ChevronDown, Search, Bell, 
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
  
  // Use NextAuth session instead of simulated login
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

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

  // Handle mounting
  useEffect(() => {
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

  // Handle user logout
  const handleLogout = () => {
    // This would call your auth logout in a real app
    localStorage.removeItem('isLoggedIn');
  };

  // Handle user login (redirect to login page)
  const handleLogin = () => {
    router.push('/auth/login');
  };

  // Handle phone login
  const handlePhoneLogin = () => {
    router.push('/auth/phone');
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
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-2 bg-background/90 backdrop-blur-lg shadow-sm border-b" : "py-4"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
            <span className="inline-block w-8 h-8 rounded-lg overflow-hidden bg-primary">
              <Image 
                src="/images/logo.svg" 
                alt="Logo" 
                width={32} 
                height={32} 
                className="object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLElement;
                  target.innerHTML = "ED";
                  target.className = "w-full h-full flex items-center justify-center text-primary-foreground";
                }}
              />
            </span>
            <span className="tracking-tight">EduCode</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <div 
                key={item.name} 
                className="relative" 
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link 
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="h-3.5 w-3.5" />}
                </Link>

                {/* Dropdown for desktop navigation */}
                {item.submenu && hoveredItem === item.name && (
                  <AnimatePresence>
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute top-full left-0 w-56 mt-0.5 p-2 shadow-lg rounded-lg bg-popover/95 backdrop-blur-md border z-50"
                    >
                      <div className="p-2 text-xs font-medium text-muted-foreground">
                        {item.description}
                      </div>
                      <div className="py-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-foreground hover:bg-accent transition-colors"
                          >
                            {subItem.icon}
                            <span>{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Search */}
            <div className="relative">
              <form onSubmit={handleSearchSubmit} className="relative group">
                <div className="relative">
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder={searchFocused ? "Search..." : "Search (⌘K)"}
                    className={cn(
                      "w-[120px] sm:w-[150px] md:w-[200px] rounded-full bg-accent focus-visible:ring-primary pr-8",
                      searchFocused && "w-[180px] sm:w-[220px] md:w-[280px]"
                    )}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                  />
                  <button 
                    type="submit" 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>

                {/* Category filters - shown when search is focused */}
                {searchFocused && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-[calc(100%+4px)] left-0 w-full flex flex-wrap gap-1 bg-background/80 backdrop-blur-sm p-1.5 rounded-lg border shadow-sm"
                  >
                    <Badge 
                      variant={currentCategory === null ? "default" : "outline"}
                      className="text-[10px] h-5 cursor-pointer hover:bg-accent/50"
                      onClick={() => setCurrentCategory(null)}
                    >
                      All
                    </Badge>
                    <Badge 
                      variant={currentCategory === "tutorial" ? "default" : "outline"}
                      className="text-[10px] h-5 cursor-pointer hover:bg-accent/50"
                      onClick={() => setCurrentCategory("tutorial")}
                    >
                      Tutorials
                    </Badge>
                    <Badge 
                      variant={currentCategory === "project" ? "default" : "outline"}
                      className="text-[10px] h-5 cursor-pointer hover:bg-accent/50"
                      onClick={() => setCurrentCategory("project")}
                    >
                      Projects
                    </Badge>
                    <Badge 
                      variant={currentCategory === "blog" ? "default" : "outline"}
                      className="text-[10px] h-5 cursor-pointer hover:bg-accent/50"
                      onClick={() => setCurrentCategory("blog")}
                    >
                      Blog
                    </Badge>
                  </motion.div>
                )}
              </form>

              {/* Search Results */}
              {showSearchResults && filteredResults.length > 0 && (
                <div 
                  ref={searchResultsRef}
                  className="absolute right-0 mt-10 w-full sm:min-w-[300px] bg-popover/95 backdrop-blur-md shadow-lg rounded-lg border p-2 z-50"
                >
                  <div className="py-1 px-3 text-xs text-muted-foreground">
                    Found {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto my-1">
                    {filteredResults.map((result) => (
                      <Link
                        key={result.id}
                        href={result.href}
                        className="block px-3 py-2 hover:bg-accent rounded-md text-sm"
                        onClick={() => {
                          setSearchQuery("");
                          setShowSearchResults(false);
                          setSearchFocused(false);
                        }}
                      >
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-muted-foreground capitalize flex items-center">
                          {result.category === "tutorial" && <BookOpen className="h-3 w-3 mr-1" />}
                          {result.category === "project" && <Code className="h-3 w-3 mr-1" />}
                          {result.category === "blog" && <FileText className="h-3 w-3 mr-1" />}
                          {result.category}
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="border-t mt-1 pt-1 px-3">
                    <button
                      onClick={() => {
                        if (searchQuery.trim()) {
                          router.push(`/search?q=${encodeURIComponent(searchQuery)}${currentCategory ? `&category=${currentCategory}` : ''}`);
                          setSearchQuery("");
                          setShowSearchResults(false);
                          setSearchFocused(false);
                        }
                      }}
                      className="text-xs flex items-center gap-1 text-primary hover:underline py-1"
                    >
                      See all results <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* No results message */}
              {showSearchResults && searchQuery.length >= 2 && filteredResults.length === 0 && (
                <div 
                  ref={searchResultsRef}
                  className="absolute right-0 mt-10 w-full sm:min-w-[300px] bg-popover/95 backdrop-blur-md shadow-lg rounded-lg border p-4 z-50 text-center"
                >
                  <AlertCircle className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm font-medium">No results found</p>
                  <p className="text-xs text-muted-foreground mt-1">Try a different search term or category</p>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between px-3 py-2">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead} 
                      className="h-8 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="px-4 py-2.5 hover:bg-accent">
                        <Link 
                          href={notification.href} 
                          onClick={() => markAsRead(notification.id)}
                          className="flex gap-3"
                        >
                          <div className={cn(
                            "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center",
                            notification.read ? "bg-muted" : "bg-primary/10"
                          )}>
                            {notification.icon}
                          </div>
                          <div>
                            <p className={cn(
                              "text-sm font-medium",
                              notification.read ? "text-foreground" : "text-primary"
                            )}>
                              {notification.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center">
                    <Bell className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">No notifications yet</p>
                  </div>
                )}
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Button asChild variant="outline" size="sm" className="w-full justify-center text-xs">
                    <Link href="/notifications">View all notifications</Link>
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* GitHub Link - Hidden on smaller screens */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex text-muted-foreground hover:text-foreground transition-colors" 
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>

            {/* User menu */}
            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative rounded-full">
                      <UserNav />
                    </Button>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/login">
                      Log in
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/auth/signup">
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
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
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-0 top-[57px] bg-background/95 backdrop-blur-lg md:hidden z-40"
          >
            <div className="h-full overflow-y-auto pb-20">
              {/* Mobile user info and login */}
              <div className="p-4 border-b">
                {isLoggedIn ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/images/avatars/user.jpg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">User Name</p>
                      <p className="text-sm text-muted-foreground">user@example.com</p>
                      <div className="flex mt-2 gap-2">
                        <Button variant="outline" size="sm" asChild className="h-8 text-xs">
                          <Link href="/profile">Profile</Link>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 text-xs text-destructive border-destructive"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground mb-1">Get the most out of EduCode</p>
                    <div className="grid grid-cols-1 gap-2">
                      <Button className="w-full" onClick={handleLogin}>
                        <span>Log In with Email</span>
                      </Button>
                      <Button variant="outline" onClick={handlePhoneLogin}>
                        <span>Log In with Phone</span>
                      </Button>
                      <Button variant="secondary" asChild>
                        <Link href="/auth/signup">Sign Up</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile navigation links */}
              <nav className="flex flex-col py-6 px-4 space-y-6">
                {navigationItems.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <Link 
                      href={item.href}
                      className={cn(
                        "flex items-center text-lg font-medium",
                        pathname === item.href || pathname.startsWith(item.href + '/') 
                          ? "text-primary" 
                          : "text-foreground"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon && <span className="mr-2">{item.icon}</span>}
                      {item.name}
                    </Link>
                    
                    {item.submenu && (
                      <div className="pl-6 border-l border-muted space-y-3 pt-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-center text-muted-foreground hover:text-foreground"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {item.description && (
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                ))}
              </nav>
              
              {/* User Account section in mobile menu */}
              <div className="mt-auto pt-4 border-t">
                {isLoggedIn ? (
                  <div className="px-3 mb-4">
                    <UserNav />
                  </div>
                ) : (
                  <div className="space-y-3 p-3">
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                        <User className="mr-2 h-4 w-4" />
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full justify-start" asChild>
                      <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Sign Up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard shortcut helper tooltip */}
      <div className="fixed bottom-4 right-4 hidden md:block opacity-0 transition-opacity group-hover:opacity-100">
        <div className="text-xs text-muted-foreground bg-background p-2 rounded-lg shadow-md border">
          Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">⌘K</kbd> to search
        </div>
      </div>
    </>
  );
}