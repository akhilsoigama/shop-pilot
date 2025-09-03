'use client';
import { Card, CardContent, Skeleton } from "@mui/material";

export default function ProductCardSkeleton({ viewMode = 'grid' }) {
  if (viewMode === 'list') {
    return (
      <Card className="flex flex-col sm:flex-row h-auto sm:h-72 p-4">
        <Skeleton className="w-full sm:w-56 h-48 sm:h-full rounded-xl" />
        <CardContent className="flex-1 p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <Skeleton className="w-full h-52 rounded-xl mb-4" />
      <CardContent className="p-0 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
      </CardContent>
    </Card>
  );
}