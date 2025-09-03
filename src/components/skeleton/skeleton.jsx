'use client';
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./productSkeleton";

export default function SubcategorySkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-0">
      {/* Filter sidebar skeleton */}
      <div className="w-full md:w-80 p-4 border-r border-gray-200 dark:border-gray-800">
        <div className="space-y-6">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="flex-1 p-4">
        <div className="container mx-auto">
          {/* Breadcrumb skeleton */}
          <div className="flex items-center space-x-2 mb-6">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Header skeleton */}
          <div className="text-center mb-8">
            <Skeleton className="h-12 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>

          {/* Controls skeleton */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <Skeleton className="h-12 w-full lg:w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-20" />
            </div>
          </div>

          {/* Products grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


