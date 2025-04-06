"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSettings } from "@/components/settings/profile-settings";
import { PasswordSettings } from "@/components/settings/password-settings";
import { NotificationSettings } from "@/components/settings/notification-settings";
import { useAuth } from "@/contexts/auth-context";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

// SettingsContent component that uses search params
function SettingsContent() {
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isClient, setIsClient] = useState(false);

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update active tab based on search params
  useEffect(() => {
    if (searchParams) {
      const tab = searchParams.get("tab");
      if (tab && ['profile', 'password', 'notifications'].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, [searchParams]);

  // Loading state for non-client or loading auth
  if (!isClient || loading) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Unauthenticated state
  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <h2 className="mb-2 text-lg font-medium text-red-600">Authentication Required</h2>
          <p className="text-red-600">
            Please sign in to access your settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="space-y-6"
      >
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="profile" className="flex-1">
            Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="flex-1">
            Password
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1">
            Notifications
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>
        
        <TabsContent value="password">
          <PasswordSettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Main Settings page with Suspense boundary
export default function SettingsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <SettingsContent />
    </Suspense>
  );
} 