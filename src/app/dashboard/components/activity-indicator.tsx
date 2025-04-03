import { cn } from "@/lib/utils";

interface ActivityIndicatorProps {
  active: boolean;
  minutes?: number;
  size?: "sm" | "md" | "lg";
}

/**
 * A component for visualizing daily activity in learning streaks
 */
export function ActivityIndicator({ 
  active, 
  minutes = 0, 
  size = "md" 
}: ActivityIndicatorProps) {
  // Size classes for different indicator sizes
  const sizeClasses = {
    sm: "w-4 h-4 text-[8px]",
    md: "w-6 h-6 text-[10px]",
    lg: "w-8 h-8 text-xs"
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-medium",
          sizeClasses[size],
          active 
            ? minutes > 0 
              ? "bg-primary text-primary-foreground" 
              : "bg-primary/30 text-primary-foreground/50" 
            : "bg-muted text-muted-foreground"
        )}
      >
        {minutes > 0 ? minutes : "—"}
      </div>
    </div>
  );
} 