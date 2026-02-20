import { Skeleton } from '@heroui/react';

export const DashboardChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-16 w-full rounded-lg" />
      <Skeleton className="h-16 w-full rounded-lg" />
      <Skeleton className="h-16 w-full rounded-lg" />
    </div>
  );
};
