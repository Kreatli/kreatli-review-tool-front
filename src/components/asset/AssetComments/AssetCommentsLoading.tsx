import { Skeleton } from '@heroui/react';

export const AssetCommentsLoading = () => {
  return (
    <div className="flex flex-col gap-2 p-3 pb-9 pt-0">
      <div className="text-medium">
        <Skeleton className="h-6 w-32 rounded-lg" />
      </div>
      <div className="flex flex-col gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};
