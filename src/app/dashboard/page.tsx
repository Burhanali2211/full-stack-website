"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, Award, Calendar, TrendingUp, Clock, BookMarked, Star, Settings, User as UserIcon, Bell, Activity, Loader2, AlertTriangle,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  points: number;
  streak: number;
  level: string;
  completedCourses: number;
  inProgressCourses: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  progress: number;
}

// Helper to get level based on points
function getLevel(points: number): string {
  if (points < 100) return 'Beginner';
  if (points < 500) return 'Intermediate';
  if (points < 1000) return 'Advanced';
  return 'Expert';
}

// Skeleton Loader Component
const SkeletonLoader = ({ className }: { className?: string }) => (
  <div className={`bg-muted animate-pulse rounded-md ${className}`} />
);

// Dashboard Content (Client-Side Logic)
function DashboardContent() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [inProgressCourses, setInProgressCourses] = useState<Course[]>([]);
  const [completedCourses, setCompletedCourses] = useState<Course[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("[DashboardContent] Rendering. Auth Loading:", authLoading, "User:", user?.id, "Profile Loading:", loadingProfile, "Courses Loading:", loadingCourses);

  // Authentication Check
  useEffect(() => {
    console.log("[AuthCheck Effect] Running. Auth Loading:", authLoading, "User:", !!user);
    if (!authLoading && !user) {
      console.log("[AuthCheck Effect] User not authenticated, redirecting...");
      if (typeof window !== 'undefined') {
        window.location.href = `/auth/login?callbackUrl=/dashboard`;
      }
    }
  }, [user, authLoading, router]);

  // Data Fetching
  useEffect(() => {
    // We only need to re-run this effect if the user object itself changes (e.g., login/logout)
    // AuthLoading changes shouldn't trigger a full data refetch here.
    console.log("[DataFetch Effect] Triggered. User ID:", user?.id);
    if (!user) {
      // If there's no user, set loading states to false and exit.
      // No need to check authLoading here, as the !user condition covers it after auth resolves.
      console.log("[DataFetch Effect] No user detected, setting loading states to false.");
      setLoadingProfile(false);
      setLoadingCourses(false);
      return;
    }

    let isMounted = true;
    console.log("[DataFetch Effect] User found, starting data fetch.");
    setLoadingProfile(true); 
    setLoadingCourses(true); 
    setError(null);

    const fetchDashboardData = async () => {
      try {
        console.log("[DataFetch Effect] Starting try block...");
        // Fetch profile
        console.log("[DataFetch Effect] Fetching profile...");
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (!isMounted) return console.log("[DataFetch Effect] Unmounted during profile fetch.");

        if (profileError && profileError.code !== 'PGRST116') {
          throw new Error(`Profile fetch error: ${profileError.message}`);
        }

        let currentProfile: UserProfile;
        if (!profileData) {
          console.log("[DataFetch Effect] Profile not found, creating default...");
          const defaultName = user.email?.split('@')[0] || 'New User';
          const defaultEmail = user.email || '';
          const { error: createError } = await supabase
            .from('profiles')
            .insert({ id: user.id, name: defaultName, email: defaultEmail, points: 0, streak: 0, completed_courses: 0, in_progress_courses: 0, created_at: new Date().toISOString() });
          
          if (!isMounted) return console.log("[DataFetch Effect] Unmounted during profile creation.");

          if (createError) {
            console.error("[DataFetch Effect] Profile creation failed:", createError.message);
            currentProfile = { id: user.id, name: defaultName, email: defaultEmail, points: 0, streak: 0, level: 'Beginner', completedCourses: 0, inProgressCourses: 0 };
            setError(`Failed to create profile: ${createError.message}`);
          } else {
            console.log("[DataFetch Effect] Default profile created.");
            currentProfile = { id: user.id, name: defaultName, email: defaultEmail, points: 0, streak: 0, level: 'Beginner', completedCourses: 0, inProgressCourses: 0 };
          }
        } else {
          console.log("[DataFetch Effect] Profile fetched successfully.");
          // Ensure profileData is treated correctly before accessing properties
          const pData = profileData as any; // Use 'any' carefully, ensure your Supabase types match if possible
          currentProfile = {
            id: user.id,
            name: (pData?.name || user.email?.split('@')[0] || 'User') as string,
            email: (user.email || pData?.email || '') as string,
            points: (pData?.points || 0) as number,
            streak: (pData?.streak || 0) as number,
            level: getLevel((pData?.points || 0) as number),
            completedCourses: (pData?.completed_courses || 0) as number,
            inProgressCourses: (pData?.in_progress_courses || 0) as number
          };
        }
        console.log("[DataFetch Effect] Setting profile state and profile loading false.");
        setProfile(currentProfile);

        // --- Fetch Courses (Placeholder) ---
        console.log("[DataFetch Effect] Fetching courses (placeholder)...");
        await new Promise(resolve => setTimeout(resolve, 300));
        if (!isMounted) return console.log("[DataFetch Effect] Unmounted during course fetch.");

        const fetchedInProgress: Course[] = [
          { id: 'js101', title: 'JavaScript Fundamentals', description: 'Learn the basics of JS', progress: 45 },
          { id: 'react201', title: 'React Intermediate', description: 'Deep dive into hooks', progress: 20 },
        ];
        const fetchedCompleted: Course[] = [
          { id: 'html101', title: 'HTML & CSS Basics', description: 'Build your first webpage', progress: 100 },
        ];
        console.log("[DataFetch Effect] Setting course states and course loading false.");
        setInProgressCourses(fetchedInProgress);
        setCompletedCourses(fetchedCompleted);

        console.log("[DataFetch Effect] Data fetching try block complete.");

      } catch (err: any) {
        if (!isMounted) return console.log("[DataFetch Effect] Unmounted during error handling.");
        console.error("[DataFetch Effect] Error during data fetch:", err.message);
        setError(err.message || "Failed to load dashboard data.");
        // Loading flags will be handled in finally
      } finally {
          // GUARANTEE loading flags are set to false
          if (isMounted) {
              console.log("[DataFetch Effect] Finally block: Setting loading flags to false.");
              setLoadingProfile(false);
              setLoadingCourses(false);
          }
      }
    };

    fetchDashboardData();

    return () => {
      console.log("[DataFetch Effect] Cleanup: Component unmounted or user changed.");
      isMounted = false;
    };
  // --- IMPORTANT: Changed dependency array --- 
  }, [user]); // Only re-run when the user object changes

  // --- Simplified Loading State --- 
  const showAuthLoading = authLoading;
  const showDataLoading = !authLoading && (loadingProfile || loadingCourses);

  console.log("[DashboardContent] Loading Check:", { showAuthLoading, showDataLoading, loadingProfile, loadingCourses });

  if (showAuthLoading) {
    console.log("[DashboardContent] Rendering Auth Loading Spinner");
  return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
    );
  }

  if (showDataLoading) {
     console.log("[DashboardContent] Rendering Data Loading Spinner (Profile/Courses)");
     return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary opacity-70" /> 
          </div>
    );
  }

  if (!user) {
    console.log("[DashboardContent] Rendering Not Authenticated State");
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <Card className="w-full max-w-md">
                        <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please log in to view your dashboard.</CardDescription>
                        </CardHeader>
                        <CardContent>
            <AlertTriangle className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                        </CardContent>
                        <CardFooter>
            <Button className="w-full" asChild>
              <Link href="/auth/login">Go to Login</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
    );
  }

  if (error) {
    console.log("[DashboardContent] Rendering Error State:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-destructive bg-destructive/10">
                        <CardHeader>
            <CardTitle className="text-destructive">Error Loading Dashboard</CardTitle>
            <CardDescription className="text-destructive/80">{error}</CardDescription>
                        </CardHeader>
                        <CardContent>
            <AlertTriangle className="h-10 w-10 text-destructive mx-auto mb-4" />
                        </CardContent>
                        <CardFooter>
            <Button variant="destructive" onClick={() => window.location.reload()}>Retry</Button>
                        </CardFooter>
                      </Card>
                                  </div>
    );
  }

  console.log("[DashboardContent] Proceeding to render Main UI with profile:", profile);
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */} 
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {profile?.name || 'Learner'}!</h1>
          <p className="text-muted-foreground">Let's continue your learning journey.</p>
                                  </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Link>
                          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="/profile"> 
              <UserIcon className="h-4 w-4" />
              <span className="sr-only">Profile</span>
            </Link>
                                  </Button>
                                </div>
                              </div>

      {/* Stats Overview */} 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
            <div className="text-2xl font-bold">{profile?.level || 'Beginner'}</div>
            <p className="text-xs text-muted-foreground">Based on your points</p>
                        </CardContent>
                      </Card>
                      <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
            <div className="text-2xl font-bold">{profile?.points || 0}</div>
            <p className="text-xs text-muted-foreground">Keep learning to earn more!</p>
                        </CardContent>
                      </Card>
                        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
            <div className="text-2xl font-bold">{profile?.streak || 0} days</div>
            <p className="text-xs text-muted-foreground">Keep the momentum going!</p>
                          </CardContent>
                        </Card>
                        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
                          </CardHeader>
                          <CardContent>
            <div className="text-2xl font-bold">{profile?.completedCourses || 0}</div>
            <p className="text-xs text-muted-foreground">Great job finishing courses!</p>
                          </CardContent>
                  </Card>
                      </div>

      {/* Course Progress Tabs */} 
      <Tabs defaultValue="in-progress">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="in-progress">
            <Clock className="mr-2 h-4 w-4" /> In Progress ({inProgressCourses.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            <Award className="mr-2 h-4 w-4" /> Completed ({completedCourses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="in-progress" className="mt-4">
          {loadingCourses ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader><SkeletonLoader className="h-5 w-3/4" /></CardHeader>
                  <CardContent><SkeletonLoader className="h-4 w-full mb-2" /><SkeletonLoader className="h-3 w-1/2" /></CardContent>
                  <CardFooter><SkeletonLoader className="h-10 w-full" /></CardFooter>
                </Card>
              ))}
            </div>
          ) : inProgressCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressCourses.map(course => (
                <Card key={course.id}>
                        <CardHeader>
                    <CardTitle className="text-lg truncate">{course.title}</CardTitle>
                    <CardDescription className="h-10 overflow-hidden text-ellipsis">{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                    <Progress value={course.progress} className="mb-2 h-2" />
                    <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                        </CardContent>
                        <CardFooter>
                    <Button className="w-full" asChild>
                      <Link href={`/tutorials/${course.id}`}>Continue Learning</Link>
                          </Button>
                        </CardFooter>
                      </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
                    <CardContent>
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No courses in progress yet.</p>
                <Button asChild>
                  <Link href="/tutorials">Explore Tutorials</Link>
                </Button>
                    </CardContent>
                  </Card>
              )}
            </TabsContent>

        <TabsContent value="completed" className="mt-4">
          {loadingCourses ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader><SkeletonLoader className="h-5 w-3/4" /></CardHeader>
                  <CardContent><SkeletonLoader className="h-4 w-full mb-2" /><SkeletonLoader className="h-3 w-1/2" /></CardContent>
                  <CardFooter><SkeletonLoader className="h-10 w-full" /></CardFooter>
                </Card>
                        ))}
                    </div>
          ) : completedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedCourses.map(course => (
                <Card key={course.id} className="opacity-80">
                      <CardHeader>
                    <CardTitle className="text-lg truncate">{course.title}</CardTitle>
                     <CardDescription className="h-10 overflow-hidden text-ellipsis">{course.description}</CardDescription>
                      </CardHeader>
                  <CardContent className="flex items-center gap-2 text-green-600">
                    <Award className="h-5 w-5" />
                    <span className="text-sm font-medium">Completed!</span>
                      </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/tutorials/${course.id}`}>Review Course</Link>
                    </Button>
                  </CardFooter>
                    </Card>
              ))}
            </div>
          ) : (
             <Card className="text-center py-12">
              <CardContent>
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">You haven't completed any courses yet.</p>
                <Button asChild>
                  <Link href="/tutorials">Find Your Next Course</Link>
                </Button>
                      </CardContent>
                    </Card>
              )}
            </TabsContent>
          </Tabs>

      {/* Recommendations (Placeholder) */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recommended For You</h2>
         <Card className="text-center py-12">
            <CardContent>
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Course recommendations coming soon!</p>
            </CardContent>
          </Card>
        {/* Add recommendation logic here later */}
      </div>

    </div>
  );
}

// Main dashboard page export (Hydration Guard)
export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("[DashboardPage] Component mounted.");
    setMounted(true);
    return () => console.log("[DashboardPage] Component unmounted.");
  }, []);

  if (!mounted) {
    console.log("[DashboardPage] Not mounted yet, showing hydration loader.");
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  console.log("[DashboardPage] Mounted, rendering DashboardContent.");
  return <DashboardContent />;
} 