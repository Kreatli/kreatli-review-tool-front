import { Skeleton } from '@heroui/react';
import React from 'react';

export const AssetPanelLoading = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-40 rounded-lg" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-6 w-32 rounded-lg" />
        <div className="space-y-3">
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};
