import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
  trend?: "up" | "down" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}

/**
 * A reusable card component for displaying statistics with optional trend indicators
 */
export function StatsCard({
  title,
  value,
  description,
  trend = "neutral",
  icon: Icon,
  onClick,
}: StatsCardProps) {
  return (
    <Card 
      className={cn(
        "hover:shadow-md transition-shadow", 
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center">
          {trend === "up" && <TrendingUp className="text-green-500 mr-1 h-3 w-3" />}
          {trend === "down" && <TrendingUp className="text-red-500 mr-1 h-3 w-3 rotate-180" />}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
