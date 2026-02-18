import { Skeleton } from '@heroui/react';

export const ProjectLoader = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-3 xs:px-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-48 rounded-lg" />
      </div>
      <div className="flex flex-1 flex-col">
        <Skeleton className="h-full w-full flex-1 rounded-lg" />
      </div>
    </div>
  );
};
