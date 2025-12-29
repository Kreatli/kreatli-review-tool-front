import { Skeleton } from '@heroui/react';

export const DashboardAssetsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-2">
        <Skeleton className="h-8 w-full rounded-medium" />
        <Skeleton className="h-8 w-full rounded-medium" />
        <Skeleton className="h-8 w-full rounded-medium" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        <Skeleton className="aspect-video rounded-medium" />
        <Skeleton className="aspect-video rounded-medium" />
        <Skeleton className="aspect-video rounded-medium" />
        <Skeleton className="aspect-video rounded-medium" />
        <Skeleton className="aspect-video rounded-medium" />
        <Skeleton className="aspect-video rounded-medium" />
      </div>
    </div>
  );
};
