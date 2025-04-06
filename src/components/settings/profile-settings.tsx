"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { Loader2, AlertCircle, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";

// Profile schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").optional(),
  bio: z.string().max(300, "Bio cannot exceed 300 characters").optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSettings() {
  const { user, refreshSession } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Profile state
  const [profileData, setProfileData] = useState<ProfileFormData>({
    name: "",
    email: "",
    bio: "",
  });
  const [profileErrors, setProfileErrors] = useState<Partial<ProfileFormData>>({});
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);

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
          return;
        }
        
        // Update profile form data
        setProfileData({
          name: data?.name || user.user_metadata?.name || "",
          email: user.email || "",
          bio: data?.bio || "",
        });
        
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoadingProfile(false);
      }
    }
    
    if (isClient && user) {
      fetchProfile();
    }
  }, [user, isClient]);

  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (profileErrors[name as keyof ProfileFormData]) {
      setProfileErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    
    // Clear success state
    setProfileSuccess(false);
  };
  
  // Handle profile form submission
  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess(false);
    
    try {
      // Validate form data
      profileSchema.parse(profileData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<ProfileFormData> = {};
        err.errors.forEach((error) => {
          const field = error.path[0] as keyof ProfileFormData;
          fieldErrors[field] = error.message;
        });
        setProfileErrors(fieldErrors);
        return;
      }
    }
    
    try {
      setIsUpdatingProfile(true);
      
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user!.id,
          name: profileData.name,
          bio: profileData.bio,
          updated_at: new Date().toISOString(),
        });
        
      if (error) {
        throw error;
      }
      
      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          name: profileData.name,
          full_name: profileData.name
        }
      });
      
      if (updateError) {
        console.error('Error updating user metadata:', updateError);
        // Non-blocking error
      }
      
      // Refresh session to get updated user data
      await refreshSession();
      
      setProfileSuccess(true);
      
      // Clear success message after delay
      setTimeout(() => {
        setProfileSuccess(false);
      }, 3000);
      
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setProfileError(error.message || "Failed to update profile");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your profile details and personal information
        </CardDescription>
      </CardHeader>
      
      {isLoadingProfile ? (
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      ) : (
        <form onSubmit={handleProfileSubmit}>
          <CardContent className="space-y-4">
            {profileError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{profileError}</AlertDescription>
              </Alert>
            )}
            
            {profileSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Profile updated successfully!
                </AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                disabled={isUpdatingProfile}
              />
              {profileErrors.name && (
                <p className="text-sm text-red-500">{profileErrors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profileData.email}
                onChange={handleProfileChange}
                disabled={true} // Email changes require verification, disable for simplicity
              />
              <p className="text-sm text-muted-foreground">
                Email changes require verification and password confirmation.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="Tell us about yourself"
                value={profileData.bio || ""}
                onChange={handleProfileChange}
                disabled={isUpdatingProfile}
                className="min-h-[100px]"
              />
              {profileErrors.bio && (
                <p className="text-sm text-red-500">{profileErrors.bio}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {(profileData.bio?.length || 0)}/300 characters
              </p>
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              disabled={isUpdatingProfile}
              className="flex items-center gap-2"
            >
              {isUpdatingProfile ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
} 