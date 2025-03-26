"use client";

import { BookOpen, Code2, FileText, Star, Clock, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/main-layout";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Sample user data
const userData = {
  name: "John Doe",
  progress: {
    tutorials: 12,
    projects: 8,
    articles: 25,
    totalPoints: 1250,
  },
  recentActivity: [
    {
      id: "1",
      type: "tutorial",
      title: "Advanced React Patterns",
      progress: 65,
      lastAccessed: "2024-03-15T10:30:00Z",
    },
    {
      id: "2",
      type: "project",
      title: "Full-Stack Task Manager",
      progress: 40,
      lastAccessed: "2024-03-14T15:45:00Z",
    },
    {
      id: "3",
      type: "article",
      title: "Understanding TypeScript Generics",
      progress: 100,
      lastAccessed: "2024-03-13T09:20:00Z",
    },
  ],
  achievements: [
    {
      id: "1",
      title: "Quick Learner",
      description: "Completed 10 tutorials",
      icon: BookOpen,
      earned: true,
    },
    {
      id: "2",
      title: "Project Master",
      description: "Finished 5 projects",
      icon: Code2,
      earned: true,
    },
    {
      id: "3",
      title: "Knowledge Seeker",
      description: "Read 20 articles",
      icon: FileText,
      earned: true,
    },
  ],
  recommendations: [
    {
      id: "1",
      type: "tutorial",
      title: "GraphQL Fundamentals",
      description: "Learn the basics of GraphQL and how to implement it in your applications",
      duration: "2.5 hours",
      difficulty: "intermediate",
    },
    {
      id: "2",
      type: "project",
      title: "Real-time Chat Application",
      description: "Build a chat app using WebSocket and React",
      difficulty: "advanced",
      technologies: ["React", "WebSocket", "Node.js"],
    },
  ],
};

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}! 👋</h1>
            <p className="text-muted-foreground">Track your progress and continue learning</p>
          </div>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Tutorials</h3>
              </div>
              <p className="text-2xl font-bold">{userData.progress.tutorials}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Projects</h3>
              </div>
              <p className="text-2xl font-bold">{userData.progress.projects}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Articles</h3>
              </div>
              <p className="text-2xl font-bold">{userData.progress.articles}</p>
              <p className="text-sm text-muted-foreground">Read</p>
            </Card>
            <Card className="p-4 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Points</h3>
              </div>
              <p className="text-2xl font-bold">{userData.progress.totalPoints}</p>
              <p className="text-sm text-muted-foreground">Total earned</p>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {userData.recentActivity.map((activity) => (
                  <Card key={activity.id} className="p-4 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {activity.type === "tutorial" && <BookOpen className="h-4 w-4 text-primary" />}
                          {activity.type === "project" && <Code2 className="h-4 w-4 text-primary" />}
                          {activity.type === "article" && <FileText className="h-4 w-4 text-primary" />}
                          <h3 className="font-medium">{activity.title}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {new Date(activity.lastAccessed).toLocaleDateString()} at{" "}
                              {new Date(activity.lastAccessed).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                        <Progress value={activity.progress} className="h-2" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Achievements</h2>
              <div className="space-y-4">
                {userData.achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={cn(
                      "p-4 bg-card/50 backdrop-blur-sm",
                      achievement.earned && "border-primary/20"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <achievement.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      {achievement.earned && (
                        <Star className="h-5 w-5 text-yellow-500 ml-auto" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Content */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userData.recommendations.map((item) => (
                <Link key={item.id} href={`/${item.type}s/${item.id}`}>
                  <Card className="p-4 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all group">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {item.type === "tutorial" && <BookOpen className="h-4 w-4 text-primary" />}
                          {item.type === "project" && <Code2 className="h-4 w-4 text-primary" />}
                          <h3 className="font-medium group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        <div className="flex items-center gap-2">
                          {item.duration && (
                            <Badge variant="secondary" className="bg-primary/5 text-primary/80">
                              {item.duration}
                            </Badge>
                          )}
                          {item.technologies?.map((tech) => (
                            <Badge key={tech} variant="secondary" className="bg-primary/5 text-primary/80">
                              {tech}
                            </Badge>
                          ))}
                          <Badge
                            className={cn(
                              item.difficulty === "beginner" ? "bg-green-500/10 text-green-400" :
                              item.difficulty === "intermediate" ? "bg-yellow-500/10 text-yellow-400" :
                              "bg-red-500/10 text-red-400"
                            )}
                          >
                            {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 