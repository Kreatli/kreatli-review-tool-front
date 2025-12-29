import { Skeleton } from '@heroui/react';
import React from 'react';

export const ProjectActivitySkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-4 h-6 w-32 rounded-lg" />
      <Skeleton className="mb-4 h-10 w-full rounded-lg" />
      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="flex w-[200px] items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
            <Skeleton className="h-4 flex-1 rounded-lg" />
            <Skeleton className="h-4 w-[200px] rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};
