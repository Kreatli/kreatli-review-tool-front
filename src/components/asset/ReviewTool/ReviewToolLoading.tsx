import { Skeleton } from '@heroui/react';
import React from 'react';

export const ReviewToolLoading = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      </div>
      <div className="relative flex-1">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
