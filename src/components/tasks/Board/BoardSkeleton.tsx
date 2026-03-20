import { Skeleton } from '@heroui/react';

export const BoardSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-1 gap-4 overflow-auto p-3 pt-0 sm:px-4">
      <Skeleton className="h-full w-full min-w-64 rounded-medium" />
      <Skeleton className="h-full w-full min-w-64 rounded-medium" />
      <Skeleton className="h-full w-full min-w-64 rounded-medium" />
      <Skeleton className="h-full w-full min-w-64 rounded-medium" />
      <Skeleton className="h-full w-full min-w-64 rounded-medium" />
      <Skeleton className="h-full w-full min-w-64 rounded-medium" />
      <Skeleton className="h-full w-full min-w-64 rounded-medium" />
      <Skeleton className="h-full w-full min-w-64 rounded-medium" />
      <Skeleton className="h-full w-full min-w-64 rounded-medium" />
    </div>
  );
};
