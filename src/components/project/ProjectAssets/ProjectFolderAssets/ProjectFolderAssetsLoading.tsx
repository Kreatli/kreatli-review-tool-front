import { Skeleton } from '@heroui/react';

export const ProjectFolderAssetsLoading = () => {
  return (
    <div className="p-3 px-4">
      <div className="mb-2 flex items-center gap-4 text-foreground-500">
        <Skeleton className="h-4 w-full rounded md:w-24" />
        <Skeleton className="h-4 w-full rounded md:w-24" />
        <Skeleton className="h-4 w-full rounded md:w-24" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <div className="flex w-full items-center gap-2">
            <div className="flex w-full flex-col gap-1">
              <Skeleton className="h-6 w-full rounded md:w-80" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </div>
          <div>
            <Skeleton className="h-10 w-24 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 gap-y-6 xs:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="aspect-video rounded-lg" />
              <Skeleton className="h-6 w-1/2 rounded" />
              <Skeleton className="size-10 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
