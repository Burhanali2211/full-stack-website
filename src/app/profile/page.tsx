"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import { BookOpen, Award, Calendar, TrendingUp, Settings, FileEdit, Loader2 } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  points: number;
  streak: number;
  level: string;
  completedCourses: number;
  inProgressCourses: number;
  joinedAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle authentication and redirect
  useEffect(() => {
    if (isClient && !loading && !user) {
      console.log("User not authenticated in profile page, redirecting to login");
      router.push('/auth/login?callbackUrl=/profile');
    }
  }, [user, loading, router, isClient]);

  // Load user profile data
  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      
      try {
        setIsLoadingProfile(true);
        
        // Get profile data from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }
        
        // Map Supabase data to our profile interface
        setProfile({
          id: data.id,
          name: data.name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          bio: data.bio || null,
          points: data.points || 0,
          streak: data.streak || 0,
          level: getLevel(data.points || 0),
          completedCourses: data.completed_courses || 0,
          inProgressCourses: data.in_progress_courses || 0,
          joinedAt: data.created_at || new Date().toISOString(),
        });
        
      } catch (error) {
        console.error('Error loading profile:', error);
        setError('Failed to load profile data. Please try again later.');
        
        // Set default profile data as a fallback
        setProfile({
          id: user.id,
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || '',
          bio: null,
          points: 0,
          streak: 0,
          level: 'Beginner',
          completedCourses: 0,
          inProgressCourses: 0,
          joinedAt: new Date().toISOString(),
        });
      } finally {
        setIsLoadingProfile(false);
      }
    }
    
    if (isClient && user) {
      fetchProfile();
    }
  }, [user, isClient]);

  // Determine level based on points
  function getLevel(points: number): string {
    if (points < 100) return 'Beginner';
    if (points < 500) return 'Intermediate';
    if (points < 1000) return 'Advanced';
    return 'Expert';
  }

  // Loading state for non-client or loading
  if (!isClient || loading || isLoadingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Unauthenticated state (will be redirected by useEffect)
  if (!user || !profile) {
    return null;
  }

  const joinDate = new Date(profile.joinedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="container max-w-5xl py-10">
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/images/avatars/user.jpg" alt={profile.name} />
                  <AvatarFallback className="text-2xl">
                    {profile.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                <p className="text-muted-foreground mb-3">{profile.email}</p>
                
                <Badge className="mb-4 px-3 py-1 text-sm">
                  {profile.level}
                </Badge>
                
                <div className="w-full mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Progress to next level</span>
                    <span className="text-sm font-medium">{profile.points}/1000</span>
                  </div>
                  <Progress value={(profile.points / 1000) * 100} />
                </div>
                
                <div className="flex justify-between w-full text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined {joinDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {profile.streak} day streak
                  </div>
                </div>
                
                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/settings?tab=profile">
                      <FileEdit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-2/3">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.bio ? (
                    <p>{profile.bio}</p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      No bio provided. Add some information about yourself in profile settings.
                    </p>
                  )}
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Learning Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-primary" />
                          <span>Points Earned</span>
                        </div>
                        <span className="text-xl font-bold">{profile.points}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-primary" />
                          <span>Completed Courses</span>
                        </div>
                        <span className="text-xl font-bold">{profile.completedCourses}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span>Current Streak</span>
                        </div>
                        <span className="text-xl font-bold">{profile.streak} days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Complete your profile</p>
                          <p className="text-sm text-muted-foreground">
                            Add a bio to help others get to know you better
                          </p>
                        </div>
                      </li>
                      
                      <li className="flex items-start gap-2">
                        <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Try a new tutorial</p>
                          <p className="text-sm text-muted-foreground">
                            Explore our latest tutorials to expand your skills
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                  
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/tutorials">Explore Tutorials</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Your learning progress and recent activities
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                    <Calendar className="h-12 w-12 mb-3 opacity-50" />
                    <p>No recent activity to display</p>
                    <p className="text-sm">
                      Start learning to track your progress here
                    </p>
                    
                    <Button variant="outline" className="mt-4" asChild>
                      <Link href="/tutorials">
                        Browse Tutorials
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>
                    Badges and rewards you've earned through learning
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                    <Award className="h-12 w-12 mb-3 opacity-50" />
                    <p>No achievements yet</p>
                    <p className="text-sm">
                      Complete courses and challenges to earn achievements
                    </p>
                    
                    <Button variant="outline" className="mt-4" asChild>
                      <Link href="/tutorials">
                        Start Learning
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 