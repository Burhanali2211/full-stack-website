"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark, 
  Heart, 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight,
  Copy,
  Twitter,
  Linkedin,
  Facebook,
  Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BlogBreadcrumb, createPostBreadcrumb } from "@/components/blog/blog-breadcrumb";
import { BlogCard } from "@/components/blog/blog-card";
import { useToast } from "@/components/ui/use-toast";
import { BlogPost } from "@/types/blog";
import { cn } from "@/lib/utils";

// Import mock data - Replace with actual API calls in production
import { blogPosts } from "@/data/mock-blog-posts";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const pathname = usePathname();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Find the post with matching slug
        const foundPost = blogPosts.find(p => p.slug === params.slug) || null;
        setPost(foundPost);
        
        // Find related posts based on category and tags
        if (foundPost) {
          const related = blogPosts
            .filter(
              p => 
                p.slug !== params.slug && 
                (p.category === foundPost.category || 
                p.tags.some(tag => foundPost.tags.includes(tag)))
            )
            .slice(0, 3);
          setRelatedPosts(related);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  // Generate table of contents and set up intersection observer for headings
  useEffect(() => {
    if (contentRef.current && post) {
      // Get all headings
      const headings = contentRef.current.querySelectorAll('h2, h3, h4');
      
      // Generate table of contents
      const toc: TableOfContentsItem[] = Array.from(headings).map((heading) => {
        const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') || '';
        
        // Set id on heading element if it doesn't have one
        if (!heading.id) {
          heading.id = id;
  }

  return {
          id,
          title: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1)),
        };
      });
      
      setTableOfContents(toc);
      
      // Set up intersection observer for headings
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveHeading(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-100px 0px -66%',
        }
      );
      
      // Observe all headings
      headings.forEach((heading) => observer.observe(heading));
      
      return () => {
        headings.forEach((heading) => observer.unobserve(heading));
      };
    }
  }, [post, isLoading]);

  // Handle share button click
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || 'Blog Post',
          text: post?.description || '',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Toggle share options dropdown
      setShowShareOptions(!showShareOptions);
    }
  };

  // Handle copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this post with others.",
      duration: 3000,
    });
    setShowShareOptions(false);
  };

  // Handle social media shares
  const handleSocialShare = (platform: string) => {
    let url = '';
    const postUrl = encodeURIComponent(window.location.href);
    const postTitle = encodeURIComponent(post?.title || 'Blog Post');
    
    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${postUrl}&text=${postTitle}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`;
        break;
      default:
        break;
    }
    
    if (url) {
      window.open(url, '_blank');
      setShowShareOptions(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="h-6 w-64 bg-muted animate-pulse rounded" />
          <div className="h-12 w-full bg-muted animate-pulse rounded" />
          <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-64 w-full bg-muted animate-pulse rounded-lg" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-full bg-muted animate-pulse rounded" />
            <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
      {/* Featured Image Banner */}
      <div className="relative w-full h-[50vh] sm:h-[40vh] md:h-[50vh] overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
      </div>
      
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 -mt-24 relative">
          {/* Main Content */}
          <div className="lg:w-2/3 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8"
            >
              {/* Breadcrumbs */}
              <BlogBreadcrumb 
                items={createPostBreadcrumb(post.title, post.slug, post.category)} 
                className="mb-6"
              />
              
              {/* Title & Meta */}
              <div className="space-y-4 mb-8">
                <Badge variant="outline" className="text-xs">
                  {post.category}
                </Badge>
                
                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-lg text-muted-foreground">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between">
                  {/* Author info */}
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      <div className="text-sm text-muted-foreground">{post.author.title}</div>
                    </div>
            </div>
                  
                  {/* Article meta */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {`${Math.ceil(post.content.length / 1000)} min read`}
                    </div>
                  </div>
          </div>

                {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
                </div>
          </div>

              <Separator className="my-8" />
              
              {/* Content */}
              <div 
                ref={contentRef}
                className="prose prose-lg dark:prose-invert max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Interactions */}
              <div className="flex items-center justify-between mt-8 pt-8 border-t dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <Button
                    variant={liked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLiked(!liked)}
                    className={cn(
                      "gap-2",
                      liked && "bg-red-500 hover:bg-red-600 text-white border-red-500"
                    )}
                  >
                    <Heart className={cn("h-4 w-4", liked && "fill-current")} />
                    {liked ? "Liked" : "Like"}
                  </Button>
                  
                  <Button
                    variant={bookmarked ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBookmarked(!bookmarked)}
                    className="gap-2"
                  >
                    <Bookmark className={cn("h-4 w-4", bookmarked && "fill-current")} />
                    {bookmarked ? "Saved" : "Save"}
                  </Button>
                  
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
                    
                    {showShareOptions && (
                      <Card className="absolute bottom-full left-0 mb-2 p-2 w-36 grid grid-cols-4 gap-2 z-50">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9"
                                onClick={handleCopyLink}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Copy Link</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-[#1DA1F2]"
                                onClick={() => handleSocialShare('twitter')}
                              >
                                <Twitter className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Twitter</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-[#0077b5]"
                                onClick={() => handleSocialShare('linkedin')}
                              >
                                <Linkedin className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>LinkedIn</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 text-[#3b5998]"
                                onClick={() => handleSocialShare('facebook')}
                              >
                                <Facebook className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Facebook</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Card>
                    )}
                  </div>
                </div>
                
                <Button variant="outline" size="sm" asChild>
                  <Link href="#comments" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Comments
                  </Link>
                </Button>
              </div>
              
              {/* Author Bio */}
              <Card className="mt-10">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback className="text-xl">{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold mb-2">About {post.author.name}</h3>
                      <p className="text-muted-foreground mb-3">
                        {post.author.title}. Expert in JavaScript, React, and building educational content.
                        Passionate about helping developers grow their skills and careers.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/author/${post.author.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            View Profile
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/author/${post.author.name.toLowerCase().replace(/\s+/g, '-')}/follow`}>
                            <Send className="h-4 w-4 mr-2" />
                            Follow
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Navigation between posts */}
              <div className="grid grid-cols-2 gap-4 mt-10">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/blog/some-prev-post">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Post
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-end" asChild>
                  <Link href="/blog/some-next-post">
                    Next Post
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {relatedPosts.map(relatedPost => (
                      <BlogCard 
                        key={relatedPost.slug} 
                        post={relatedPost} 
                        variant="compact"
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Comments Section */}
              <div id="comments" className="mt-16">
                <h2 className="text-2xl font-bold mb-6">Comments</h2>
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground text-center py-8">
                      Comments coming soon! Check back later to join the discussion.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-24">
              {/* Table of contents */}
              {tableOfContents.length > 0 && (
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                    <ScrollArea className="h-[calc(50vh-100px)]">
                      <div className="space-y-1">
                        {tableOfContents.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={cn(
                              "block py-1 transition-colors text-sm",
                              item.level === 2 && "font-medium",
                              item.level === 3 && "pl-4",
                              item.level === 4 && "pl-8",
                              activeHeading === item.id
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(item.id)?.scrollIntoView({
                                behavior: 'smooth',
                              });
                            }}
                          >
                            {item.title}
                          </a>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
              
              {/* Newsletter signup - Simplified for single article view */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get notified about new articles and updates
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full px-3 py-2 border rounded-md text-sm bg-background"
                    />
                    <Button className="w-full">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

export const dynamic = 'force-static'; 