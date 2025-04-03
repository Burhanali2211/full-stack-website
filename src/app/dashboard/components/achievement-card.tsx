import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { formatDate } from "../utils/format-date";

interface AchievementCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  progressCount?: string;
  rewards: string[];
}

/**
 * Displays an achievement with its status, progress, and rewards
 */
export function AchievementCard({
  id,
  title,
  description,
  icon: Icon,
  earned,
  earnedDate,
  progress = 0,
  progressCount,
  rewards,
}: AchievementCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "p-4 rounded-lg border flex items-start gap-4",
        earned ? "bg-primary/5 border-primary/20" : ""
      )}
    >
      <div className={cn(
        "p-2 rounded-full",
        earned 
          ? "bg-primary/10 text-primary" 
          : "bg-muted text-muted-foreground"
      )}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{title}</h3>
          {earned && (
            <Badge className="bg-primary text-primary-foreground">Earned</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        {earned ? (
          <div className="text-xs text-muted-foreground">
            Earned on {earnedDate ? formatDate(earnedDate, false, false) : ""}
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Progress</span>
              <span>{progressCount}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        <div className="pt-2">
          <div className="text-xs font-medium">Rewards:</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {rewards.map((reward, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {reward}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
 