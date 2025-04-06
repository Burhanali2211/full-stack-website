"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";

export function NotificationSettings() {
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [webNotifications, setWebNotifications] = useState(true);
  const [isUpdatingNotifications, setIsUpdatingNotifications] = useState(false);
  const [notificationsSuccess, setNotificationsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Load notification preferences
  useEffect(() => {
    async function fetchPreferences() {
      if (!user) return;
      
      try {
        setIsLoading(true);
        
        // Get profile data from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('email_notifications, web_notifications')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Error fetching notification preferences:', error);
          return;
        }
        
        // Update notification states
        setEmailNotifications(data?.email_notifications !== false); // default to true
        setWebNotifications(data?.web_notifications !== false); // default to true
        
      } catch (error) {
        console.error('Error loading notification preferences:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (isClient && user) {
      fetchPreferences();
    }
  }, [user, isClient]);
  
  // Handle notification preferences updates
  const handleNotificationsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotificationsSuccess(false);
    
    try {
      setIsUpdatingNotifications(true);
      
      // Update notification preferences in Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user!.id,
          email_notifications: emailNotifications,
          web_notifications: webNotifications,
          updated_at: new Date().toISOString(),
        });
        
      if (error) {
        throw error;
      }
      
      setNotificationsSuccess(true);
      
      // Clear success message after delay
      setTimeout(() => {
        setNotificationsSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error updating notification preferences:', error);
    } finally {
      setIsUpdatingNotifications(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Manage how and when you receive notifications
        </CardDescription>
      </CardHeader>
      
      {isLoading ? (
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </CardContent>
      ) : (
        <form onSubmit={handleNotificationsSubmit}>
          <CardContent className="space-y-6">
            {notificationsSuccess && (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription className="text-green-800">
                  Notification preferences updated successfully!
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
                disabled={isUpdatingNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="web-notifications">Web Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications in the browser
                </p>
              </div>
              <Switch
                id="web-notifications"
                checked={webNotifications}
                onCheckedChange={setWebNotifications}
                disabled={isUpdatingNotifications}
              />
            </div>
          </CardContent>
          
          <CardFooter>
            <Button 
              type="submit" 
              disabled={isUpdatingNotifications}
              className="flex items-center gap-2"
            >
              {isUpdatingNotifications ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Preferences...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Preferences
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  );
} 