'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function ClearSessionsPage() {
  const [cleared, setCleared] = useState(false);
  
  const clearAllCookies = () => {
    try {
      // Clear the NextAuth session cookie
      const cookies = document.cookie.split(';');
      
      for (let cookie of cookies) {
        const cookieName = cookie.split('=')[0].trim();
        // Look for NextAuth cookies and remove them
        if (cookieName.includes('next-auth') || cookieName.includes('__Secure-next-auth')) {
          // Set expiration date to past to clear the cookie
          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; secure; SameSite=Lax`;
        }
      }
      
      setCleared(true);
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      console.error('Error clearing cookies:', error);
    }
  };

  return (
    <div className="container max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Clear Authentication Sessions</CardTitle>
          <CardDescription>
            This utility helps resolve JWT decryption issues by clearing your existing session cookies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {cleared ? (
            <div className="p-4 mb-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-md">
              <p>Your session cookies have been cleared successfully!</p>
              <p className="text-sm mt-2">Redirecting to homepage...</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Click the button below to clear all authentication sessions. This can help if you're experiencing
              login issues or JWT decryption errors. You'll need to log in again afterward.
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={clearAllCookies}
            disabled={cleared}
          >
            Clear Session Cookies
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 