import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function EditorSkeleton() {
  return (
    <Card className="p-4 w-full h-[400px] space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-6 w-[100px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
    </Card>
  );
}

export function QuizSkeleton() {
  return (
    <Card className="p-4 w-full space-y-4">
      <Skeleton className="h-8 w-[200px]" />
      <div className="space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
      <Skeleton className="h-10 w-[120px]" />
    </Card>
  );
} 