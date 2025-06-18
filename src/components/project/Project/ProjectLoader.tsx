import { Skeleton } from '@heroui/react';
import React from 'react';

export const ProjectLoader = () => {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-48 rounded-lg" />
        <Skeleton className="h-8 w-48 rounded-lg" />
        <Skeleton className="h-4 w-64 rounded-lg" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
      <div className="flex flex-col flex-1">
        <Skeleton className="h-full w-full flex-1 rounded-lg" />
      </div>
    </div>
  );
};
