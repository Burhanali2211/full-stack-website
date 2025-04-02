import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getAvatarUrl(username: string): string {
  // For development, return a local placeholder avatar
  return `/avatars/placeholder.svg`;
  
  // When you have proper avatar handling, you can implement it here
  // Example with proper avatar storage:
  // return `/avatars/${username}.jpg`;
} 