"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, BookmarkPlus, ThumbsUp, Clock, Coffee, ArrowUp } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useInView } from 'react-intersection-observer';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { cn } from '@/lib/utils';
import { components } from './mdx-components';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface BlogPostProps {
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  content: string;
  tags: string[];
  estimatedReadTime?: number;
  className?: string;
}

export function BlogPost({
  title,
  author,
  date,
  content,
  tags,
  estimatedReadTime,
  className,
}: BlogPostProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [progress, setProgress] = useState(0);

  // Intersection observer for section highlighting
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    // Generate table of contents from content headings
    const headings = document.querySelectorAll('h2, h3');
    const toc: TableOfContentsItem[] = Array.from(headings).map((heading) => ({
      id: heading.id,
      title: heading.textContent || '',
      level: parseInt(heading.tagName.charAt(1)),
    }));
    setTableOfContents(toc);

    // Scroll progress
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      setProgress((scrollPosition / totalHeight) * 100);
      setShowScrollTop(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this article: ${title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ scaleX: progress / 100, transformOrigin: '0%' }}
      />

      {/* Article header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-10 h-10 rounded-full"
            />
            <span>{author.name}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{estimatedReadTime} min read</span>
          </div>
          <span>•</span>
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.header>

      {/* Table of contents - Fixed sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed left-4 top-1/4 w-64 hidden xl:block"
      >
        <nav className="space-y-2">
          <h4 className="font-semibold mb-4">Table of Contents</h4>
          {tableOfContents.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block text-sm py-1 pl-${(item.level - 2) * 4} ${
                activeSection === item.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </motion.aside>

      {/* Main content */}
      <motion.article
        ref={sectionRef}
        className={cn('prose prose-zinc dark:prose-invert max-w-none', className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <MDXRemote source={content} components={components} />
      </motion.article>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-background/80 backdrop-blur-sm p-4 rounded-full shadow-lg"
      >
        <button
          onClick={() => setLikes(prev => prev + 1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ThumbsUp className="w-5 h-5" />
          <span>{likes}</span>
        </button>
        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`p-2 rounded-full ${
            isBookmarked ? 'text-primary' : 'text-muted-foreground'
          } hover:text-primary transition-colors`}
        >
          <BookmarkPlus className="w-5 h-5" />
        </button>
        <button
          onClick={handleShare}
          className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Reading time indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-4 right-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-full shadow-sm"
      >
        <Coffee className="w-4 h-4 text-primary" />
        <span className="text-sm">{Math.ceil(progress)}% read</span>
      </motion.div>
    </div>
  );
} 