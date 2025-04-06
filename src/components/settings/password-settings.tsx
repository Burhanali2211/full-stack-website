"use client";

import { useState } from "react";
import { z } from "zod";
import { Loader2, AlertCircle, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

// Password schema
const passwordSchema = z.object({
  currentPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export function PasswordSettings() {
  // Password state
  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Partial<PasswordFormData>>({});
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (passwordErrors[name as keyof PasswordFormData]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    
    // Clear success state
    setPasswordSuccess(false);
  };
  
  // Handle password form submission
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);
    
    try {
      // Validate form data
      passwordSchema.parse(passwordData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<PasswordFormData> = {};
        err.errors.forEach((error) => {
          const field = error.path[0] as keyof PasswordFormData;
          fieldErrors[field] = error.message;
        });
        setPasswordErrors(fieldErrors);
        return;
      }
    }
    
    try {
      setIsUpdatingPassword(true);
      
      // Update password in Supabase
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });
      
      if (error) {
        throw error;
      }
      
      // Reset password form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      setPasswordSuccess(true);
      
      // Clear success message after delay
      setTimeout(() => {
        setPasswordSuccess(false);
      }, 3000);
      
    } catch (error: any) {
      console.error('Error updating password:', error);
      setPasswordError(error.message || "Failed to update password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handlePasswordSubmit}>
        <CardContent className="space-y-4">
          {passwordError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{passwordError}</AlertDescription>
            </Alert>
          )}
          
          {passwordSuccess && (
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Password updated successfully!
              </AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              disabled={isUpdatingPassword}
            />
            {passwordErrors.currentPassword && (
              <p className="text-sm text-red-500">{passwordErrors.currentPassword}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              disabled={isUpdatingPassword}
            />
            {passwordErrors.newPassword && (
              <p className="text-sm text-red-500">{passwordErrors.newPassword}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              disabled={isUpdatingPassword}
            />
            {passwordErrors.confirmPassword && (
              <p className="text-sm text-red-500">{passwordErrors.confirmPassword}</p>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isUpdatingPassword}
            className="flex items-center gap-2"
          >
            {isUpdatingPassword ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating Password...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4" />
                Update Password
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 