import { Skeleton } from '@heroui/react';

const ITEMS = 12;

export const DeliverablesSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-10 w-full rounded-medium" />
      <div className="flex flex-col gap-3 px-2.5">
        {Array.from({ length: ITEMS }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <Skeleton className="size-5 rounded-medium" />
            <Skeleton className="h-5 flex-1 rounded-medium" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-5 w-32 rounded-medium" />
            </div>
            <Skeleton className="h-4 w-32 rounded-medium" />
            <Skeleton className="h-4 w-32 rounded-medium" />
            <Skeleton className="h-4 w-32 rounded-medium" />
          </div>
        ))}
      </div>
    </div>
  );
};
