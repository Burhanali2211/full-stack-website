'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  User, 
  Bookmark, 
  Settings, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

export function UserNav() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="p-4 bg-black text-white rounded-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-lg">...</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Loading...</p>
            <p className="text-xs text-gray-500">Please wait</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (status === 'unauthenticated') {
    return (
      <div className="p-4 bg-black text-white rounded-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-lg">G</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Guest User</p>
            <p className="text-xs text-gray-500">Not signed in</p>
          </div>
        </div>
        <nav className="space-y-2">
          <Link 
            href="/auth/login" 
            className="flex items-center text-sm text-blue-400 hover:text-blue-300 py-2 px-3"
          >
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Link>
          <Link 
            href="/auth/signup" 
            className="flex items-center text-sm text-blue-400 hover:text-blue-300 py-2 px-3"
          >
            <User className="h-4 w-4 mr-2" />
            Sign Up
          </Link>
        </nav>
      </div>
    );
  }
  
  const userInitial = session?.user?.name?.charAt(0) || 
                     session?.user?.email?.charAt(0) || 'U';

  return (
    <div className="p-4 bg-black text-white rounded-lg">
      <div className="flex items-center space-x-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
          <span className="text-lg">{userInitial}</span>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">{session?.user?.name || 'User Name'}</p>
          <p className="text-xs text-gray-500">{session?.user?.email || 'user@example.com'}</p>
        </div>
      </div>
      
      <nav className="space-y-2">
        <Link 
          href="/dashboard" 
          className="flex items-center text-sm text-blue-400 hover:text-blue-300 py-2 px-3"
        >
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Dashboard
        </Link>
        <Link 
          href="/profile" 
          className="flex items-center text-sm text-blue-400 hover:text-blue-300 py-2 px-3"
        >
          <User className="h-4 w-4 mr-2" />
          Profile
        </Link>
        <Link 
          href="/bookmarks" 
          className="flex items-center text-sm text-blue-400 hover:text-blue-300 py-2 px-3"
        >
          <Bookmark className="h-4 w-4 mr-2" />
          Bookmarks
        </Link>
        <Link 
          href="/settings" 
          className="flex items-center text-sm text-blue-400 hover:text-blue-300 py-2 px-3"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Link>
        <Link 
          href="/help" 
          className="flex items-center text-sm text-blue-400 hover:text-blue-300 py-2 px-3"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Help & Support
        </Link>
        
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center text-sm text-red-500 hover:text-red-400 w-full text-left py-2 px-3"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </button>
      </nav>
    </div>
  );
} 