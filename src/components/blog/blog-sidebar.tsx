"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Tag, Mail, Clock, Calendar, ArrowRight, ChevronDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogSidebarProps {
  popularPosts: BlogPost[];
  tags: string[];
  className?: string;
}

export function BlogSidebar({ popularPosts, tags, className }: BlogSidebarProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  
  // Calculate visible tags - show first 10 initially, then allow expanding
  const visibleTags = showAllTags ? tags : tags.slice(0, 10);
  const hasMoreTags = tags.length > 10;
  
  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      // Simulate subscription success
      setSubscribed(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  // Animation variants - more subtle
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className={cn("space-y-5 lg:sticky lg:top-20", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Popular Posts - cleaner design */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/60 shadow-sm overflow-hidden">
          <CardHeader className="pb-2 border-b border-border/20 bg-accent/5">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
              <CardTitle className="text-base">Popular Posts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/10">
              {popularPosts.map((post, idx) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block p-3 hover:bg-accent/5 transition-colors"
                >
                  <div className="flex gap-3">
                    {/* Smaller image thumbnail for better space usage */}
                    <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-2.5 w-2.5 opacity-70" />
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5 opacity-70" />
                          {`${Math.max(Math.ceil(post.content.length / 1500), 1)} min`}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tags Cloud - with show more toggle */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/60 shadow-sm overflow-hidden">
          <CardHeader className="pb-2 border-b border-border/20 bg-accent/5">
            <div className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-primary" />
              <CardTitle className="text-base">Popular Tags</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="flex flex-wrap gap-1.5">
              {visibleTags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Badge
                    variant="secondary"
                    className="bg-primary/5 hover:bg-primary/10 text-primary-foreground text-[10px] px-2 py-0.5 cursor-pointer"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
              
              {/* Show more/less toggle */}
              {hasMoreTags && (
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => setShowAllTags(prev => !prev)}
                  className="text-[10px] h-5 px-2 text-muted-foreground hover:text-foreground"
                >
                  {showAllTags ? 'Show less' : `+${tags.length - 10} more`}
                  <ChevronDown className={cn(
                    "ml-1 h-3 w-3 transition-transform",
                    showAllTags && "rotate-180"
                  )} />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Newsletter Subscription - simplified */}
      <motion.div variants={itemVariants}>
        <Card className="border-border/60 shadow-sm overflow-hidden">
          <CardHeader className="pb-2 border-b border-border/20 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <CardTitle className="text-base">Newsletter</CardTitle>
            </div>
            <CardDescription className="text-xs mt-1">
              Get the latest articles delivered to your inbox
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            {subscribed ? (
              <div className="bg-green-50 dark:bg-green-900/20 text-center py-2 px-3 rounded">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-green-600 dark:text-green-400 text-xs font-medium"
                >
                  Successfully subscribed!
                </motion.div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-sm h-8"
                />
                <Button type="submit" className="w-full h-8 text-xs">
                  Subscribe
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
} 