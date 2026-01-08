import { Button, cn } from '@heroui/react';

import { useProjectUploadContext } from '../../../contexts/Project/ProjectUploadContext';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';

export const DashboardAssetsEmptyState = () => {
  const { inputRef, isDragActive, getRootProps } = useProjectUploadContext();

  return (
    <div className="relative" {...getRootProps()}>
      <EmptyState title="No files" text="You don't have any files here yet. Go ahead and upload one." size="sm">
        <Button
          size="sm"
          className="mt-4 bg-foreground text-content1"
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <Icon icon="plus" size={14} />
          Upload your first file
        </Button>
      </EmptyState>
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-medium bg-black/80 opacity-0 transition-opacity',
          {
            'opacity-100': isDragActive,
          },
        )}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-medium">
          <Icon icon="upload" size={48} className="text-white" />
          <div className="font-sans text-3xl font-bold text-white">Drop files here</div>
        </div>
      </div>
    </div>
  );
};
