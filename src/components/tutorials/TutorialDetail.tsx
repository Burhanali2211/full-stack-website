"use client";

import React, { useState } from "react";
import { Tutorial } from "./TutorialCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Play,
  Bookmark,
  Share2,
  Heart,
  CheckCircle,
  BookOpen,
  Users,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TutorialDetailProps {
  tutorial: Tutorial;
}

export function TutorialDetail({ tutorial }: TutorialDetailProps) {
  const [activeTab, setActiveTab] = useState("content");
  const {
    title,
    description,
    category,
    level,
    duration,
    author,
    progress,
    sections,
    rating,
    comments,
  } = tutorial;

  const levelStyles = {
    beginner: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    intermediate: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    advanced: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{category}</Badge>
          <Badge className={cn("capitalize", levelStyles[level])}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground">{description}</p>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span>{sections.length} sections</span>
          </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>{rating.toFixed(1)} ({comments} reviews)</span>
          </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>1.2k+ enrolled</span>
          </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="flex-1 sm:flex-none">
            <Play className="h-4 w-4 mr-2" />
            Start Learning
          </Button>
          <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
            <Heart className="h-4 w-4 mr-2" />
            Add to Wishlist
                  </Button>
                </div>

        {progress !== undefined && (
          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm font-medium">{progress}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>{Math.round((progress / 100) * sections.length)} of {sections.length} sections completed</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Tabs defaultValue="content" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Course Content</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="instructor">Instructor</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4">
            {sections.map((section, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Section {index + 1}
                      </span>
                      {progress && progress > (index / sections.length) * 100 && (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-medium">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {section.content}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 inline mr-1" />
                      {section.duration}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
          
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6">
            <div className="prose dark:prose-invert max-w-none">
              <h3>About This Course</h3>
              <p>{description}</p>
              
              <h4>What You'll Learn</h4>
              <ul>
                <li>Master the fundamentals of {category}</li>
                <li>Build real-world projects</li>
                <li>Learn industry best practices</li>
                <li>Gain practical experience</li>
              </ul>
              
              <h4>Prerequisites</h4>
              <ul>
                {level === "beginner" ? (
                  <>
                    <li>No prior experience required</li>
                    <li>Basic computer literacy</li>
                    <li>Enthusiasm to learn</li>
                  </>
                ) : level === "intermediate" ? (
                  <>
                    <li>Basic understanding of {category}</li>
                    <li>Some programming experience</li>
                    <li>Familiarity with development tools</li>
                  </>
                ) : (
                  <>
                    <li>Strong foundation in {category}</li>
                    <li>Professional development experience</li>
                    <li>Advanced problem-solving skills</li>
                  </>
                )}
              </ul>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="instructor" className="space-y-4">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{author.name}</h3>
                <p className="text-muted-foreground">{author.title}</p>
              </div>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>5,000+ students</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>4.8 instructor rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>12 courses</span>
                </div>
                </div>
              <p className="text-muted-foreground">
                Experienced {category} developer and educator with a passion for teaching complex concepts in an accessible way.
                Specializing in {level} level instruction with a focus on practical, real-world applications.
              </p>
          </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TutorialDetail; 
