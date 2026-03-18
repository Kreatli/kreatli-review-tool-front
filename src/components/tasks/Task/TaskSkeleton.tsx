import { Skeleton } from '@heroui/react';

export const TaskSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-8 w-32 rounded-medium" />
      <div className="grid grid-cols-[1fr_300px] gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="ml-3 h-5 w-32 rounded-medium" />
            <Skeleton className="h-52 w-full rounded-medium" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="ml-3 h-5 w-32 rounded-medium" />
            <div className="grid grid-cols-4 gap-2">
              <Skeleton className="h-32 rounded-medium" />
              <Skeleton className="h-32 rounded-medium" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <Skeleton className="ml-3 h-5 w-32 rounded-medium" />
            <Skeleton className="h-10 w-full rounded-medium" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="ml-3 h-5 w-32 rounded-medium" />
            <Skeleton className="h-12 w-full rounded-medium" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="ml-3 h-5 w-32 rounded-medium" />
            <Skeleton className="h-12 w-full rounded-medium" />
            <Skeleton className="h-12 w-full rounded-medium" />
          </div>
        </div>
      </div>
    </div>
  );
};
