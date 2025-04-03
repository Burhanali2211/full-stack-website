import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="container py-8 space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-36 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>
      
      {/* Tabs skeleton */}
      <Skeleton className="h-10 w-full md:w-96 rounded-md" />
      
      {/* Content skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-10 w-16 mb-2" />
            <Skeleton className="h-4 w-full" />
          </Card>
        ))}
      </div>
      
      <div className="h-64 w-full rounded-lg border">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
} 