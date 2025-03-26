"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

// Define the navigation items for reuse
const navigationItems = [
  { name: "Tutorials", href: "/tutorials" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Playground", href: "/playground" },
  { name: "Resources", href: "/resources" },
  { name: "Community", href: "/community" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll event to add shadow to navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center space-x-2 font-bold text-xl"
          aria-label="Educational Platform"
        >
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Educational Platform</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className={`hover:text-primary transition-colors ${
                pathname === item.href ? "text-primary font-medium" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:block">
            <Link href="/auth/login">
              <Button size="sm" variant="default">Login</Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-b"
          >
            <div className="container py-4 flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className={`px-4 py-2 hover:bg-muted rounded-md transition-colors ${
                    pathname === item.href ? "bg-muted/50 text-primary font-medium" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t">
                <Button className="w-full" asChild>
                  <Link 
                    href="/auth/login"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
