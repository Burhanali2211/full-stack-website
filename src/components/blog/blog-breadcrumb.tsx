"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { BlogCategory } from "@/types/blog";

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

interface BlogBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  animated?: boolean;
}

export function BlogBreadcrumb({
  items,
  className,
  animated = true,
}: BlogBreadcrumbProps) {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: -5 },
    show: { opacity: 1, y: 0 },
  };

  // The component to render
  const breadcrumbContent = (
    <Breadcrumb
      className={cn(
        "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-2 px-4 rounded-lg shadow-sm",
        className
      )}
    >
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <Home className="h-3 w-3" />
              <span className="sr-only sm:not-sr-only sm:text-xs">Home</span>
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator>
          <ChevronRight className="h-3 w-3 text-muted-foreground" />
        </BreadcrumbSeparator>
        
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link 
              href="/blog" 
              className={cn(
                "text-xs text-muted-foreground hover:text-foreground",
                items.length === 0 && "font-medium text-foreground"
              )}
            >
              Blog
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center">
            <BreadcrumbSeparator>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </BreadcrumbSeparator>
            
            <BreadcrumbItem>
              {item.isCurrentPage ? (
                <span className="text-xs font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    href={item.href}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );

  // Return animated or static version
  return animated ? (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="overflow-hidden"
    >
      <motion.div variants={item}>{breadcrumbContent}</motion.div>
    </motion.div>
  ) : (
    breadcrumbContent
  );
}

// Helper function to create breadcrumb items for category pages
export function createCategoryBreadcrumb(category: BlogCategory): BreadcrumbItem[] {
  return [
    {
      label: category,
      href: `/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
      isCurrentPage: true,
    },
  ];
}

// Helper function to create breadcrumb items for post pages
export function createPostBreadcrumb(
  postTitle: string,
  postSlug: string,
  category?: BlogCategory
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [];
  
  // Add category if available
  if (category) {
    items.push({
      label: category,
      href: `/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
      isCurrentPage: false,
    });
  }
  
  // Add post
  items.push({
    label: postTitle,
    href: `/blog/${postSlug}`,
    isCurrentPage: true,
  });
  
  return items;
} 