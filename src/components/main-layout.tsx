"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./footer";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export default function MainLayout({ 
  children, 
  className,
  fullWidth = false 
}: MainLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background flex flex-col", className)}>
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="flex-1 pt-16"
      >
        {fullWidth ? (
          children
        ) : (
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        )}
      </motion.main>
      <Footer />
      <Toaster />
    </div>
  );
} 