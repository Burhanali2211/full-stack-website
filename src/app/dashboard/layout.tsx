"use client";

import MainLayout from "@/components/main-layout";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Set client-side rendering flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle authentication redirects
  useEffect(() => {
    if (isClient && !loading && !user) {
      console.log("User not authenticated in dashboard layout, redirecting to login");
      router.push('/auth/login');
    }
  }, [loading, user, router, isClient]);

  // If not authenticated yet, show minimal loading UI
  if (!isClient || loading) {
    return (
      <MainLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  // If not logged in but still loading, render nothing (will be redirected)
  if (!user) {
    return null;
  }

  // Normal authenticated view
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
} 