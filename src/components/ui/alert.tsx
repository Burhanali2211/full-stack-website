import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AlertProps {
  children: ReactNode;
  variant?: "default" | "destructive" | "outline";
  className?: string;
}

export function Alert({ children, variant = "default", className }: AlertProps) {
  return (
    <div
      className={cn(
        "flex gap-2 p-4 rounded-lg",
        {
          "bg-primary/10 text-primary": variant === "default",
          "bg-destructive/10 text-destructive": variant === "destructive",
          "border border-primary/20": variant === "outline",
        },
        className
      )}
      role="alert"
    >
      {children}
    </div>
  );
}

export function AlertDescription({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-sm", className)}>
      {children}
    </div>
  );
} 