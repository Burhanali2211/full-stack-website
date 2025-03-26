import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 border border-primary/20 dark:border-primary/40 rounded-lg shadow-lg transition-all hover:border-primary/40 dark:hover:border-primary/60 ${className}`}
    >
      {children}
    </div>
  );
} 