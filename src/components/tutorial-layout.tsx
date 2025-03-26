"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Github, ChevronLeft, BookOpen, Clock } from "lucide-react";
import MainLayout from "./main-layout";

interface TutorialLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  githubUrl?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
}

export default function TutorialLayout({
  children,
  title,
  description,
  githubUrl,
  difficulty = "Beginner",
  duration = "30 mins",
}: TutorialLayoutProps) {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-6 md:py-8"
      >
        <div className="mb-8">
          <Link
            href="/tutorials"
            className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Tutorials
          </Link>
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="mb-4 text-lg text-muted-foreground">{description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{difficulty}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          {children}
        </div>
      </motion.div>
    </MainLayout>
  );
} 