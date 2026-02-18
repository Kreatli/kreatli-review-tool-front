import { Skeleton } from '@heroui/react';

import { useIsBreakpoint } from '../../tiptap/hooks/use-is-breakpoint';

export const ProjectActivitySkeleton = () => {
  const isMobile = useIsBreakpoint('max', 768);

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Skeleton className="mb-4 h-10 w-full rounded-lg" />
      <div className="space-y-4">
        {Array.from({ length: 12 }).map((_, index) => (
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
