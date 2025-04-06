'use client';

import Link from 'next/link';
import { 
  LayoutDashboard, 
  User, 
  Bookmark, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNav() {
  const { user, loading, signOut } = useAuth();
  
  if (loading) {
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary/20">
          <span className="animate-pulse">...</span>
        </AvatarFallback>
      </Avatar>
    );
  }
  
  if (!user) {
    return (
      <Avatar className="h-8 w-8">
        <AvatarFallback>G</AvatarFallback>
      </Avatar>
    );
  }
  
  const userInitial = user?.email?.charAt(0)?.toUpperCase() || 'U';
  const userName = user.user_metadata?.full_name || user.user_metadata?.name || 'User';
  const userEmail = user.email || '';

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut();
      // The signOut function itself handles redirection
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer border-2 border-transparent hover:border-primary transition-colors">
          <AvatarImage src="/images/avatars/user.jpg" alt={userName} />
          <AvatarFallback>{userInitial}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/bookmarks" className="cursor-pointer">
            <Bookmark className="mr-2 h-4 w-4" />
            <span>Bookmarks</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/help-support" className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-500 focus:text-red-500 cursor-pointer" 
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 