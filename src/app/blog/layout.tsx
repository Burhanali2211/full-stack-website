"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Tag, TrendingUp, Mail, Rss, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface BlogLayoutProps {
  children: React.ReactNode;
}

// Mock data - replace with actual data fetching
const featuredPosts = [
  {
    slug: "getting-started-with-python-programming",
    title: "Getting Started with Python Programming",
    date: "2024-03-15",
    readTime: 5,
  },
  {
    slug: "advanced-nextjs-patterns",
    title: "Advanced Next.js Patterns",
    date: "2024-03-14",
    readTime: 8,
  },
  {
    slug: "debugging-python-applications",
    title: "Debugging Python Applications",
    date: "2024-03-13",
    readTime: 10,
  },
];

const popularTags = [
  "Python", "Next.js", "React", "TypeScript", "Web Dev", "Programming", "Tutorial", "AI", "Data Science", "Cloud"
];

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-background w-full">
      {/* Streamlined Sticky Header */}
      <header className="border-b border-border/40 sticky top-0 bg-background/95 backdrop-blur z-30 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href="/blog" className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
              Tech Insights Blog
            </Link>
            <div className="relative w-full max-w-xs">
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-9 h-8 text-sm rounded-full border-border/60 bg-background/70 focus:ring-1 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Blog Content */} 
        <main className="lg:col-span-8 xl:col-span-9">{children}</main>

        {/* Sticky Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-5 lg:sticky lg:top-[65px] h-fit">
          {/* Featured Posts Widget */}
          <SidebarWidget title="Featured Posts" icon={TrendingUp}>
            <div className="space-y-3">
              {featuredPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <h3 className="font-medium text-sm leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          </SidebarWidget>

          {/* Popular Tags Widget */}
          <SidebarWidget title="Popular Tags" icon={Tag}>
            <TagCloud tags={popularTags} />
          </SidebarWidget>

          {/* Newsletter Widget */}
          <SidebarWidget title="Newsletter" icon={Mail}>
            <NewsletterSubscription />
          </SidebarWidget>
          
           {/* Footer links within sidebar for smaller screens or consistency */} 
           <div className="pt-3 space-y-1 border-t border-border/20">
             <SidebarLink href="/rss.xml" icon={Rss}>RSS Feed</SidebarLink>
             {/* Add more links if needed, e.g., Share */}
           </div>
           
        </aside>
      </div>
    </div>
  );
}

// --- Reusable Sidebar Components ---

interface SidebarWidgetProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function SidebarWidget({ title, icon: Icon, children }: SidebarWidgetProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border border-border/40 shadow-sm bg-card overflow-hidden"
    >
      <div className="flex items-center gap-2 p-3 border-b border-border/20 bg-muted/30">
        <Icon className="w-4 h-4 text-primary" />
        <h2 className="font-semibold text-sm text-foreground">{title}</h2>
      </div>
      <div className="p-3">
        {children}
      </div>
    </motion.section>
  );
}

function TagCloud({ tags }: { tags: string[] }) {
  const [showAll, setShowAll] = useState(false);
  const visibleTags = showAll ? tags : tags.slice(0, 8);
  const hasMore = tags.length > 8;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visibleTags.map((tag) => (
        <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
          <Badge
            variant="secondary"
            className="bg-accent/50 hover:bg-accent/80 text-accent-foreground text-[10px] px-1.5 py-0.5 cursor-pointer font-normal"
          >
            {tag}
          </Badge>
        </Link>
      ))}
      {hasMore && (
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => setShowAll(prev => !prev)}
          className="text-[10px] h-5 px-1.5 text-muted-foreground hover:text-foreground"
        >
          {showAll ? 'Show less' : `+${tags.length - 8} more`}
        </Button>
      )}
    </div>
  );
}

function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) { // Basic validation
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <p className="text-xs text-muted-foreground mb-2">
        Latest insights, direct to your inbox.
      </p>
      <Input
        type="email"
        placeholder="your.email@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full h-8 text-xs rounded-md border-border/60"
        disabled={subscribed}
      />
      <Button 
        type="submit" 
        className="w-full h-8 text-xs rounded-md" 
        disabled={subscribed}
      >
        {subscribed ? "Subscribed!" : "Subscribe"}
      </Button>
      {subscribed && (
        <p className="text-[10px] text-green-600 dark:text-green-400 text-center">Check your inbox!</p>
      )}
    </form>
  );
}

function SidebarLink({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      target={href.startsWith('/') ? '_self' : '_blank'} 
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded hover:bg-accent/50"
    >
      <Icon className="w-3.5 h-3.5" />
      {children}
    </Link>
  );
} 