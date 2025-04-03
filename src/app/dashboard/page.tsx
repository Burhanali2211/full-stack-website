"use client";

import { useEffect, useState } from "react";
import { 
  BookOpen, 
  Code2, 
  FileText, 
  Star, 
  Clock, 
  Trophy, 
  ArrowRight, 
  Rocket, 
  Flame, 
  Target, 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  AlertCircle,
  Bookmark,
  Layers,
  Award,
  LineChart,
  Users,
  Activity,
  Zap
} from "lucide-react";
import Link from "next/link";
import MainLayout from "@/components/main-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { toast } from "sonner";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Import our custom components and utilities
import { StatsCard } from "./components/stats-card";
import { ActivityIndicator } from "./components/activity-indicator";
import { AchievementCard } from "./components/achievement-card";
import { RecommendationCard } from "./components/recommendation-card";
import { formatDate } from "./utils/format-date";
import { 
  OverviewSkeletons, 
  ProgressSkeletons, 
  AchievementsSkeletons, 
  RecommendationsSkeletons 
} from "./components/dashboard-skeletons";

// Sample user data with extended properties for the enhanced dashboard
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "Student",
  avatar: "/images/avatars/user.jpg",
  joinDate: "2023-10-15",
  membershipLevel: "Pro",
  membershipExpiry: "2024-10-15",
  progress: {
    tutorials: {
      completed: 14,
      inProgress: 3,
      saved: 8,
      total: 25, 
      delta: 15, // percentage change from last week
    },
    projects: {
      completed: 8,
      inProgress: 2,
      saved: 5,
      total: 15,
      delta: 10,
    },
    articles: {
      completed: 32,
      saved: 12,
      total: 120,
      delta: -5,
    },
    points: {
      total: 1875,
      weeklyProgress: [
        { day: "Mon", points: 120 },
        { day: "Tue", points: 150 },
        { day: "Wed", points: 240 },
        { day: "Thu", points: 180 },
        { day: "Fri", points: 220 },
        { day: "Sat", points: 125 },
        { day: "Sun", points: 210 },
      ],
      monthlyCourseCompletion: [
        { month: "Jan", tutorials: 2, projects: 1 },
        { month: "Feb", tutorials: 3, projects: 1 },
        { month: "Mar", tutorials: 1, projects: 0 },
        { month: "Apr", tutorials: 4, projects: 2 },
        { month: "May", tutorials: 2, projects: 1 },
        { month: "Jun", tutorials: 1, projects: 1 },
      ],
      categoryCompletion: [
        { name: "Web Dev", value: 35 },
        { name: "Mobile", value: 20 },
        { name: "Data Science", value: 15 },
        { name: "DevOps", value: 10 },
        { name: "Design", value: 20 },
      ],
      badgesEarned: 12,
      ranking: 245,
      totalUsers: 5280,
    },
    learningStreak: {
      current: 15,
      longest: 23,
      lastActive: "2024-04-02",
      thisWeek: [true, true, true, true, false, true, true], // Sunday to Saturday
      weeklyMinutes: [45, 60, 30, 75, 0, 50, 40],
    }
  },
  recentActivity: [
    {
      id: "1",
      type: "tutorial",
      title: "Advanced React Patterns",
      progress: 65,
      lastAccessed: "2024-04-02T10:30:00Z",
      thumbnail: "/thumbnails/advanced-react.jpg",
      category: "Web Development",
      estimatedTimeLeft: "45 min",
    },
    {
      id: "2",
      type: "project",
      title: "Full-Stack Task Manager",
      progress: 40,
      lastAccessed: "2024-04-01T15:45:00Z",
      thumbnail: "/thumbnails/task-manager.jpg",
      category: "Web Development",
      estimatedTimeLeft: "3 hours",
    },
    {
      id: "3",
      type: "article",
      title: "Understanding TypeScript Generics",
      progress: 100,
      lastAccessed: "2024-03-31T09:20:00Z",
      thumbnail: "/thumbnails/typescript-generics.jpg",
      category: "Programming",
      estimatedTimeLeft: "0 min",
    },
    {
      id: "4",
      type: "tutorial",
      title: "Mobile App Authentication with Firebase",
      progress: 25,
      lastAccessed: "2024-03-30T14:10:00Z",
      thumbnail: "/thumbnails/firebase-auth.jpg",
      category: "Mobile Development",
      estimatedTimeLeft: "1.5 hours",
    },
  ],
  upcomingEvents: [
    {
      id: "1",
      title: "Web Performance Workshop",
      date: "2024-04-10T18:00:00Z",
      duration: "90 min",
      type: "workshop",
      isRegistered: true,
    },
    {
      id: "2",
      title: "Career in Tech: Ask Me Anything",
      date: "2024-04-15T17:00:00Z",
      duration: "60 min",
      type: "webinar",
      isRegistered: true,
    },
    {
      id: "3",
      title: "Introduction to Machine Learning",
      date: "2024-04-22T15:30:00Z",
      duration: "120 min",
      type: "course",
      isRegistered: false,
    },
  ],
  achievements: [
    {
      id: "1",
      title: "Quick Learner",
      description: "Completed 10 tutorials",
      icon: BookOpen,
      earned: true,
      earnedDate: "2024-02-15",
      progress: 100,
      rewards: ["+100 points", "Profile Badge"],
    },
    {
      id: "2",
      title: "Project Master",
      description: "Finished 5 projects",
      icon: Code2,
      earned: true,
      earnedDate: "2024-03-05",
      progress: 100,
      rewards: ["+200 points", "Certificate"],
    },
    {
      id: "3",
      title: "Knowledge Seeker",
      description: "Read 20 articles",
      icon: FileText,
      earned: true,
      earnedDate: "2024-03-28",
      progress: 100,
      rewards: ["+150 points", "Premium Content Access"],
    },
    {
      id: "4",
      title: "Coding Streak",
      description: "Complete activities for 14 consecutive days",
      icon: Flame,
      earned: false,
      progress: 75,
      progressCount: "15/20 days",
      rewards: ["+300 points", "Exclusive Course Access"],
    },
    {
      id: "5",
      title: "Helpful Mentor",
      description: "Help 10 other students by answering their questions",
      icon: Users,
      earned: false,
      progress: 40,
      progressCount: "4/10 students",
      rewards: ["+250 points", "Mentor Badge"],
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
      thumbnail: "/thumbnails/graphql.jpg",
      instructor: "Sarah Johnson",
      rating: 4.8,
      reviews: 320,
      matchScore: "92% match",
    },
    {
      id: "2",
      type: "project",
      title: "Real-time Chat Application",
      description: "Build a chat app using WebSocket and React",
      difficulty: "advanced",
      thumbnail: "/thumbnails/chat-app.jpg",
      technologies: ["React", "WebSocket", "Node.js"],
      estimatedTime: "6 hours",
      rating: 4.7,
      reviews: 245,
      matchScore: "89% match",
    },
    {
      id: "3",
      type: "article",
      title: "Modern CSS Techniques",
      description: "Explore modern CSS features and best practices",
      thumbnail: "/thumbnails/modern-css.jpg",
      readTime: "12 min",
      author: "Alex Martinez",
      rating: 4.9,
      reviews: 178,
      matchScore: "95% match",
    },
    {
      id: "4",
      type: "tutorial",
      title: "Docker for Developers",
      description: "Learn how to containerize your applications with Docker",
      duration: "3 hours",
      difficulty: "beginner",
      thumbnail: "/thumbnails/docker.jpg",
      instructor: "Michael Chen",
      rating: 4.6,
      reviews: 412,
      matchScore: "87% match",
    },
  ],
  skillsProgress: [
    { name: "JavaScript", progress: 85, level: "Advanced" },
    { name: "React", progress: 75, level: "Intermediate" },
    { name: "Node.js", progress: 60, level: "Intermediate" },
    { name: "Python", progress: 40, level: "Beginner" },
    { name: "UI/UX Design", progress: 55, level: "Intermediate" },
  ],
  certifications: [
    {
      id: "1",
      title: "Frontend Developer Certification",
      issueDate: "2024-01-15",
      validUntil: "2027-01-15",
      credentialUrl: "#",
      issuer: "Tech Academy",
    },
    {
      id: "2",
      title: "React Advanced Course",
      issueDate: "2023-11-10",
      validUntil: null,
      credentialUrl: "#",
      issuer: "EduCode Platform",
    },
  ],
};

// COLORS for charts
const COLORS = ["#2563eb", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#06b6d4"];

// Custom types for chart data
interface ChartDataPoint {
  name: string;
  value: number;
  percent?: number;
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleActionClick = (message: string) => {
    toast.success(message);
  };

  return (
    <MainLayout>
      <div className="h-full flex flex-col">
        <div className="container py-8 space-y-8">
          {/* Dashboard header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {userData.name}. Here's your learning overview.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {userData.membershipLevel === "Pro" && (
                <Badge className="bg-gradient-to-r from-amber-500 to-yellow-300 text-primary-foreground">
                  PRO Member
                </Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Actions</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleActionClick("Profile has been updated")}>
                    Update Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleActionClick("Settings page opened")}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleActionClick("Help center opened")}>
                    Help Center
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button>Resume Learning</Button>
            </div>
          </div>

          {/* Dashboard content tabs */}
          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-4 gap-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">My Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            {/* Overview tab content */}
            <TabsContent value="overview" className="space-y-6">
              {isLoading ? (
                <OverviewSkeletons />
              ) : (
                <>
                  {/* Stats cards row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                      title="Completed Tutorials"
                      value={userData.progress.tutorials.completed}
                      description={`${userData.progress.tutorials.delta > 0 ? "+" : ""}${userData.progress.tutorials.delta}% from last week`}
                      trend={userData.progress.tutorials.delta > 0 ? "up" : "down"}
                      icon={BookOpen}
                      onClick={() => handleActionClick("Viewing completed tutorials")}
                    />
                    <StatsCard
                      title="Completed Projects"
                      value={userData.progress.projects.completed}
                      description={`${userData.progress.projects.delta > 0 ? "+" : ""}${userData.progress.projects.delta}% from last week`}
                      trend={userData.progress.projects.delta > 0 ? "up" : "down"}
                      icon={Code2}
                      onClick={() => handleActionClick("Viewing completed projects")}
                    />
                    <StatsCard
                      title="Learning Streak"
                      value={userData.progress.learningStreak.current}
                      description={`Longest: ${userData.progress.learningStreak.longest} days`}
                      trend="neutral"
                      icon={Flame}
                      onClick={() => handleActionClick("Viewing learning streak details")}
                    />
                    <StatsCard
                      title="XP Points"
                      value={userData.progress.points.total}
                      description={`Rank ${userData.progress.points.ranking} of ${userData.progress.points.totalUsers}`}
                      trend="neutral"
                      icon={Zap}
                      onClick={() => handleActionClick("Viewing XP details")}
                    />
          </div>

                  {/* Two column layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main content - 2/3 width */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Recent activity */}
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-xl">Continue Learning</CardTitle>
                          <Button variant="ghost" size="sm" className="gap-1" asChild>
                            <Link href="/courses">
                              View All <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </CardHeader>
                        <CardContent>
              <div className="space-y-4">
                {userData.recentActivity.map((activity) => (
                              <div key={activity.id} className="flex items-start space-x-4">
                                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md">
                                  <div 
                                    className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40" 
                                    style={{ backgroundImage: activity.thumbnail ? `url(${activity.thumbnail})` : undefined, backgroundSize: 'cover' }}
                                  />
                                  {activity.type === "tutorial" && <BookOpen className="absolute top-1 left-1 h-4 w-4 text-primary-foreground/90" />}
                                  {activity.type === "project" && <Code2 className="absolute top-1 left-1 h-4 w-4 text-primary-foreground/90" />}
                                  {activity.type === "article" && <FileText className="absolute top-1 left-1 h-4 w-4 text-primary-foreground/90" />}
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="flex items-center justify-between">
                                    <Link href={`/learning/${activity.type}/${activity.id}`}>
                                      <h4 className="font-medium hover:text-primary hover:underline transition-colors">
                                        {activity.title}
                                      </h4>
                                    </Link>
                                    <Badge variant="outline" className="text-xs">
                                      {activity.category}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                      <Progress value={activity.progress} className="h-2" />
                                    </div>
                                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                                      {activity.progress}% complete
                                    </span>
                        </div>
                                  <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">
                                      {activity.progress === 100 
                                        ? "Completed" 
                                        : `${activity.estimatedTimeLeft} remaining`}
                                    </span>
                                    <span className="text-muted-foreground">
                                      Last accessed {formatDate(activity.lastAccessed)}
                            </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Weekly progress chart */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Weekly Progress</CardTitle>
                          <CardDescription>Your XP points earned in the last 7 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={userData.progress.points.weeklyProgress}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                              >
                                <defs>
                                  <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.2} />
                                  </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                  type="monotone"
                                  dataKey="points"
                                  stroke="#2563eb"
                                  fillOpacity={1}
                                  fill="url(#colorPoints)"
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Skills progress */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Skills Progress</CardTitle>
                          <CardDescription>
                            Your proficiency level in different technologies
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {userData.skillsProgress.map((skill) => (
                              <div key={skill.name} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="font-medium">{skill.name}</div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline">{skill.level}</Badge>
                                    <span className="text-sm">{skill.progress}%</span>
                                  </div>
                                </div>
                                <Progress value={skill.progress} className="h-2" />
                        </div>
                            ))}
                      </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" onClick={() => handleActionClick("Viewing all skills")}>
                            View All Skills
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>

                    {/* Sidebar content - 1/3 width */}
                    <div className="space-y-6">
                      {/* Learning streak card */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Flame className="h-5 w-5 text-orange-500" />
                            Learning Streak
                          </CardTitle>
                          <CardDescription>
                            {userData.progress.learningStreak.current} day streak - Keep it up!
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {/* Days of week indicators */}
                            <div className="grid grid-cols-7 gap-1 text-center">
                              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                                <div key={i} className="text-xs text-muted-foreground">{day}</div>
                              ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {userData.progress.learningStreak.thisWeek.map((day, i) => (
                                <ActivityIndicator 
                                  key={i} 
                                  active={day} 
                                  minutes={userData.progress.learningStreak.weeklyMinutes[i]} 
                                />
                ))}
              </div>
            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between text-xs text-muted-foreground">
                          <div>Current: {userData.progress.learningStreak.current} days</div>
                          <div>Longest: {userData.progress.learningStreak.longest} days</div>
                        </CardFooter>
                      </Card>

                      {/* Upcoming events */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Upcoming Events
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
              <div className="space-y-4">
                            {userData.upcomingEvents.map((event) => (
                              <div key={event.id} className="flex items-start space-x-3">
                                <div 
                    className={cn(
                                    "mt-0.5 h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0",
                                    event.type === "workshop" && "bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400",
                                    event.type === "webinar" && "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
                                    event.type === "course" && "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400",
                                  )}
                                >
                                  {event.type === "workshop" && <Code2 className="h-5 w-5" />}
                                  {event.type === "webinar" && <Users className="h-5 w-5" />}
                                  {event.type === "course" && <BookOpen className="h-5 w-5" />}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium leading-none mb-1">{event.title}</h4>
                                  <div className="flex items-center text-sm">
                                    <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-muted-foreground">
                                      {formatDate(event.date, true)} • {event.duration}
                                    </span>
                                  </div>
                                  <div className="mt-2">
                                    {event.isRegistered ? (
                                      <Badge variant="secondary" className="text-xs">
                                        <CheckCircle className="mr-1 h-3 w-3" /> Registered
                                      </Badge>
                                    ) : (
                                      <Button 
                                        size="sm" 
                                        variant="outline" 
                                        className="text-xs h-7"
                                        onClick={() => handleActionClick(`Registered for ${event.title}`)}
                                      >
                                        Register Now
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" size="sm" className="w-full" asChild>
                            <Link href="/events">View All Events</Link>
                          </Button>
                        </CardFooter>
                      </Card>

                      {/* Achievement progress highlights */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            Achievement Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {userData.achievements
                              .filter(a => !a.earned)
                              .slice(0, 2)
                              .map((achievement) => (
                                <div key={achievement.id} className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <achievement.icon className="h-5 w-5 text-muted-foreground" />
                                    <h4 className="font-medium">{achievement.title}</h4>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {achievement.description}
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <Progress value={achievement.progress} className="h-2 flex-1" />
                                    <span className="text-xs font-medium">{achievement.progressCount}</span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab("achievements")}>
                            View All Achievements
                          </Button>
                        </CardFooter>
                      </Card>

                      {/* Certifications */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-blue-500" />
                            My Certifications
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {userData.certifications.map((cert) => (
                              <div key={cert.id} className="p-3 rounded-lg border">
                                <h4 className="font-medium">{cert.title}</h4>
                                <div className="flex items-center justify-between mt-1 text-sm">
                                  <span className="text-muted-foreground">
                                    Issued: {formatDate(cert.issueDate, false, false)}
                                  </span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-7 gap-1"
                                    onClick={() => handleActionClick(`Viewing certificate for ${cert.title}`)}
                                  >
                                    <FileText className="h-3.5 w-3.5" /> View
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" size="sm" className="w-full" onClick={() => handleActionClick("Browsing available certifications")}>
                            Browse Available Certifications
                          </Button>
                        </CardFooter>
                      </Card>
                      </div>
                      </div>
                </>
              )}
            </TabsContent>

            {/* Progress tab content */}
            <TabsContent value="progress" className="space-y-6">
              {isLoading ? (
                <ProgressSkeletons />
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left column - category statistics */}
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Learning Categories</CardTitle>
                          <CardDescription>
                            Distribution of your completed courses by category
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={userData.progress.points.categoryCompletion}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={90}
                                  paddingAngle={2}
                                  dataKey="value"
                                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                  labelLine={false}
                                >
                                  {userData.progress.points.categoryCompletion.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                  ))}
                                </Pie>
                                <Tooltip 
                                  formatter={(value: number) => [`${value} courses`, 'Completed']}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Points summary */}
                      <Card>
                        <CardHeader>
                          <CardTitle>XP Points Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Total Points:</span>
                              <span className="font-semibold">{userData.progress.points.total} XP</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Global Ranking:</span>
                              <span>{userData.progress.points.ranking} / {userData.progress.points.totalUsers}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Top Percentile:</span>
                              <span>{Math.round((userData.progress.points.ranking / userData.progress.points.totalUsers) * 100)}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Badges Earned:</span>
                              <span>{userData.progress.points.badgesEarned}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" onClick={() => handleActionClick("Opening leaderboard")}>
                            View Leaderboard
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>

                    {/* Right column - monthly progress */}
                    <div className="lg:col-span-2 space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Courses Completed</CardTitle>
                          <CardDescription>
                            Monthly breakdown of completed learning resources
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={userData.progress.points.monthlyCourseCompletion}
                                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="tutorials" name="Tutorials" fill="#2563eb" />
                                <Bar dataKey="projects" name="Projects" fill="#8b5cf6" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Progress statistics */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Tutorials progress */}
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Tutorials</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {userData.progress.tutorials.completed}/{userData.progress.tutorials.total}
                            </div>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Completed:</span>
                                <span>{userData.progress.tutorials.completed}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">In Progress:</span>
                                <span>{userData.progress.tutorials.inProgress}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Saved:</span>
                                <span>{userData.progress.tutorials.saved}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Projects progress */}
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Projects</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {userData.progress.projects.completed}/{userData.progress.projects.total}
                            </div>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Completed:</span>
                                <span>{userData.progress.projects.completed}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">In Progress:</span>
                                <span>{userData.progress.projects.inProgress}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Saved:</span>
                                <span>{userData.progress.projects.saved}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Articles progress */}
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">Articles</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">
                              {userData.progress.articles.completed}/{userData.progress.articles.total}
                            </div>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Completed:</span>
                                <span>{userData.progress.articles.completed}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Saved:</span>
                                <span>{userData.progress.articles.saved}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Delta:</span>
                                <span className={userData.progress.articles.delta > 0 ? "text-green-500" : "text-red-500"}>
                                  {userData.progress.articles.delta > 0 ? "+" : ""}{userData.progress.articles.delta}%
                                </span>
                              </div>
                            </div>
                          </CardContent>
                  </Card>
                      </div>

                      {/* Individual course progress */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Course Progress Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {userData.recentActivity.map((activity) => (
                              <div key={activity.id} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {activity.type === "tutorial" && <BookOpen className="h-4 w-4 text-blue-500" />}
                                    {activity.type === "project" && <Code2 className="h-4 w-4 text-purple-500" />}
                                    {activity.type === "article" && <FileText className="h-4 w-4 text-pink-500" />}
                                    <span className="font-medium">{activity.title}</span>
                                  </div>
                                  <Badge variant="outline">{activity.progress}%</Badge>
                                </div>
                                <Progress value={activity.progress} className="h-2" />
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                  <span>Started {formatDate(activity.lastAccessed, false, true)}</span>
                                  <span>{activity.category}</span>
                                </div>
                              </div>
                ))}
              </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full" onClick={() => handleActionClick("Viewing all courses")}>
                            View All Courses
                          </Button>
                        </CardFooter>
                      </Card>
            </div>
          </div>
                </>
              )}
            </TabsContent>

            {/* Achievements tab content */}
            <TabsContent value="achievements" className="space-y-6">
              {isLoading ? (
                <AchievementsSkeletons />
              ) : (
                <>
                  {/* Achievement stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2 text-center">
                        <CardTitle className="text-lg">Total Achievements</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-4xl font-bold">
                          {userData.achievements.filter(a => a.earned).length}/{userData.achievements.length}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2 text-center">
                        <CardTitle className="text-lg">Points Earned</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-4xl font-bold">
                          {userData.progress.points.total}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2 text-center">
                        <CardTitle className="text-lg">Current Streak</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-4xl font-bold">
                          {userData.progress.learningStreak.current} days
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Achievements list */}
                  <Card>
                    <CardHeader>
                      <CardTitle>My Achievements</CardTitle>
                      <CardDescription>
                        Track your progress and earn rewards for completing educational milestones
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userData.achievements.map((achievement) => (
                          <AchievementCard
                            key={achievement.id}
                            id={achievement.id}
                            title={achievement.title}
                            description={achievement.description}
                            icon={achievement.icon}
                            earned={achievement.earned}
                            earnedDate={achievement.earnedDate}
                            progress={achievement.progress}
                            progressCount={achievement.progressCount}
                            rewards={achievement.rewards}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </TabsContent>

            {/* Recommendations tab content */}
            <TabsContent value="recommendations" className="space-y-6">
              {isLoading ? (
                <RecommendationsSkeletons />
              ) : (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Personalized Recommendations</CardTitle>
                      <CardDescription>
                        Based on your learning history and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userData.recommendations.map((item) => (
                          <RecommendationCard
                            key={item.id}
                            {...item as any}
                            onSave={(id) => handleActionClick(`Saved ${item.title} for later`)}
                            onStart={(id) => handleActionClick(`Starting ${item.title}`)}
                          />
                        ))}
                    </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Trending This Week</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Placeholder for trending content - would be dynamic in real implementation */}
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                                <TrendingUp className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">React Server Components</div>
                                <div className="text-sm text-muted-foreground">2.5k students this week</div>
                              </div>
                              <Button variant="ghost" size="sm">View</Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Learning Path Suggestions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Placeholder for learning paths - would be dynamic in real implementation */}
                          {[
                            { title: "Full-Stack Developer", icon: Layers, color: "text-blue-500" },
                            { title: "Data Science Specialist", icon: LineChart, color: "text-green-500" },
                            { title: "Mobile App Developer", icon: Rocket, color: "text-purple-500" },
                          ].map((path, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div className={cn("w-10 h-10 rounded bg-muted flex items-center justify-center", `${path.color}/20`)}>
                                <path.icon className={cn("h-5 w-5", path.color)} />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{path.title}</div>
                                <div className="text-sm text-muted-foreground">15 courses • 8 projects</div>
                              </div>
                              <Button variant="outline" size="sm">Explore</Button>
                            </div>
              ))}
            </div>
                      </CardContent>
                    </Card>
          </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
} 