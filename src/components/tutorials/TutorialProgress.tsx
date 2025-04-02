"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import { Award, Star, Trophy, Zap, BookOpen, Clock, Target, ArrowUpRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Badge types for gamification
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  color: string;
  earned: boolean;
  progress?: number;
  date?: string;
}

// User stats
interface UserStats {
  totalPoints: number;
  level: number;
  completedTutorials: number;
  totalTutorials: number;
  streak: number;
  hoursSpent: number;
  rank?: number;
  nextLevel: number;
}

interface TutorialProgressProps {
  stats: UserStats;
  badges: Badge[];
  recentActivity?: {
    date: string;
    action: string;
    points: number;
    tutorialId?: string;
    tutorialTitle?: string;
  }[];
}

/**
 * Component to display user progress and gamification elements
 */
const TutorialProgress: FC<TutorialProgressProps> = ({ stats, badges, recentActivity = [] }) => {
  const levelProgress = (stats.totalPoints / stats.nextLevel) * 100;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Stats Dashboard */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-4"
      >
        <motion.div variants={itemVariants} className="col-span-4 md:col-span-2">
          <Card className="overflow-hidden h-full">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-10" />
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Learning Journey</span>
                  {stats.rank && (
                    <span className="text-sm font-normal px-2 py-1 rounded-full bg-primary/10 text-primary">
                      Rank #{stats.rank}
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-primary/10 text-primary border-4 border-primary">
                    <span className="text-xl font-bold">{stats.level}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="font-medium">Level {stats.level}</span>
                      <span>{stats.totalPoints} / {stats.nextLevel} XP</span>
                    </div>
                    <Progress value={levelProgress} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round(stats.nextLevel - stats.totalPoints)} XP needed for next level
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20">
                      <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">{stats.completedTutorials}</div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">{stats.hoursSpent}</div>
                      <div className="text-xs text-muted-foreground">Hours</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                      <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">{stats.streak}</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                      <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">{badges.filter(b => b.earned).length}</div>
                      <div className="text-xs text-muted-foreground">Badges</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity Card */}
        <motion.div variants={itemVariants} className="col-span-4 md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="h-[220px] overflow-auto">
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm">
                          {activity.action}
                          {activity.tutorialTitle && (
                            <Link 
                              href={`/tutorials/${activity.tutorialId}`}
                              className="text-primary hover:underline ml-1"
                            >
                              {activity.tutorialTitle}
                            </Link>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">{activity.date}</div>
                      </div>
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        +{activity.points} XP
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No recent activity</p>
                    <p className="text-sm mt-1">Start learning to track your progress!</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t">
              <Button variant="outline" size="sm" className="w-full gap-1">
                View All Activity
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>

      {/* Badges and Achievements */}
      <div>
        <Tabs defaultValue="badges">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Achievements</h2>
            <TabsList>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="badges">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {badges.map(badge => (
                <motion.div key={badge.id} variants={itemVariants}>
                  <Card className={`group h-full ${!badge.earned && 'opacity-60'}`}>
                    <CardContent className="p-4 text-center flex flex-col items-center justify-center">
                      <div className={`p-3 rounded-full ${badge.earned ? badge.color : 'bg-muted'} mb-3 mt-3 transition-transform group-hover:scale-110`}>
                        {badge.icon}
                      </div>
                      <h3 className="font-medium mb-1">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{badge.description}</p>
                      
                      {badge.earned ? (
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                          Earned {badge.date}
                        </span>
                      ) : badge.progress !== undefined ? (
                        <div className="w-full">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span>{badge.progress}%</span>
                          </div>
                          <Progress value={badge.progress} className="h-1" />
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">Not yet earned</span>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Example leaderboard entries */}
                  <div className="bg-accent/40 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-yellow-50 font-bold">1</div>
                      <div>
                        <div className="font-medium">Sarah Chen</div>
                        <div className="text-xs text-muted-foreground">Level 15</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold">2,400 XP</div>
                  </div>
                  <div className="rounded-lg p-3 flex items-center justify-between bg-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-gray-50 font-bold">2</div>
                      <div>
                        <div className="font-medium">Alex Johnson</div>
                        <div className="text-xs text-muted-foreground">Level 12</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold">1,850 XP</div>
                  </div>
                  <div className="rounded-lg p-3 flex items-center justify-between bg-primary/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-amber-50 font-bold">3</div>
                      <div>
                        <div className="font-medium">Miguel Ramos</div>
                        <div className="text-xs text-muted-foreground">Level 10</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold">1,720 XP</div>
                  </div>
                  
                  {/* Current user position (highlighted) */}
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">7</div>
                      <div>
                        <div className="font-medium">You</div>
                        <div className="text-xs text-muted-foreground">Level {stats.level}</div>
                      </div>
                    </div>
                    <div className="text-lg font-bold">{stats.totalPoints} XP</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Full Leaderboard
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Default export with example data
export default function TutorialProgressWithData() {
  // Example stats
  const stats: UserStats = {
    totalPoints: 1450,
    level: 8,
    completedTutorials: 24,
    totalTutorials: 150,
    streak: 7,
    hoursSpent: 42,
    rank: 7,
    nextLevel: 2000
  };
  
  // Example badges
  const badges: Badge[] = [
    {
      id: "quick-learner",
      name: "Quick Learner",
      description: "Complete 5 tutorials in a week",
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      color: "bg-yellow-100 dark:bg-yellow-900/20",
      earned: true,
      date: "2 weeks ago"
    },
    {
      id: "coding-streak",
      name: "Coding Streak",
      description: "Learn for 7 days in a row",
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      color: "bg-blue-100 dark:bg-blue-900/20",
      earned: true,
      date: "Yesterday"
    },
    {
      id: "react-master",
      name: "React Master",
      description: "Complete all React tutorials",
      icon: <Star className="h-5 w-5 text-purple-500" />,
      color: "bg-purple-100 dark:bg-purple-900/20",
      earned: false,
      progress: 65
    },
    {
      id: "code-ninja",
      name: "Code Ninja",
      description: "Complete 50 coding challenges",
      icon: <Trophy className="h-5 w-5 text-green-500" />,
      color: "bg-green-100 dark:bg-green-900/20",
      earned: false,
      progress: 32
    },
    {
      id: "night-owl",
      name: "Night Owl",
      description: "Study after midnight for 5 days",
      icon: <Award className="h-5 w-5 text-indigo-500" />,
      color: "bg-indigo-100 dark:bg-indigo-900/20",
      earned: true,
      date: "3 days ago"
    },
    {
      id: "typescript-guru",
      name: "TypeScript Guru",
      description: "Master advanced TypeScript concepts",
      icon: <Target className="h-5 w-5 text-cyan-500" />,
      color: "bg-cyan-100 dark:bg-cyan-900/20",
      earned: false,
      progress: 20
    },
    {
      id: "helpful-mentor",
      name: "Helpful Mentor",
      description: "Answer 20 questions in the community",
      icon: <Award className="h-5 w-5 text-amber-500" />,
      color: "bg-amber-100 dark:bg-amber-900/20",
      earned: false,
      progress: 40
    },
    {
      id: "perfect-score",
      name: "Perfect Score",
      description: "Get 100% on a quiz",
      icon: <Trophy className="h-5 w-5 text-red-500" />,
      color: "bg-red-100 dark:bg-red-900/20",
      earned: true,
      date: "1 month ago"
    },
  ];
  
  // Example activity
  const recentActivity = [
    {
      date: "Today, 10:23 AM",
      action: "Completed tutorial:",
      points: 50,
      tutorialId: "nextjs-fundamentals",
      tutorialTitle: "Next.js Fundamentals"
    },
    {
      date: "Yesterday, 4:45 PM",
      action: "Earned badge: Coding Streak",
      points: 100,
    },
    {
      date: "Yesterday, 2:30 PM",
      action: "Completed quiz with score 85%:",
      points: 30,
      tutorialId: "typescript-advanced",
      tutorialTitle: "Advanced TypeScript"
    },
    {
      date: "3 days ago",
      action: "Started tutorial:",
      points: 10,
      tutorialId: "node-api-design",
      tutorialTitle: "Node.js API Design"
    },
    {
      date: "4 days ago",
      action: "Submitted challenge solution:",
      points: 75,
      tutorialId: "algorithm-challenges",
      tutorialTitle: "Algorithm Challenges"
    }
  ];
  
  return <TutorialProgress stats={stats} badges={badges} recentActivity={recentActivity} />;
} 