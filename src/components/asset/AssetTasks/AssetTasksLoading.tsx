import { Skeleton } from '@heroui/react';

export const AssetTasksLoading = () => {
  return (
    <div className="flex flex-col gap-2 p-3 pb-9 pt-0">
      <div className="text-medium">
        <Skeleton className="h-6 w-32 rounded-lg" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    </div>
  );
};
