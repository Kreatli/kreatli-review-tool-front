import { Button, cn } from '@heroui/react';
import { EmptyState } from '../../various/EmptyState';
import { Icon } from '../../various/Icon';
import { useProjectUploadContext } from '../../../contexts/Project/ProjectUploadContext';

export const DashboardAssetsEmptyState = () => {
  const { inputRef, isDragActive, getRootProps } = useProjectUploadContext();

  return (
    <div className="relative" {...getRootProps()}>
      <EmptyState title="No files" text="You don't have any files here yet. Go ahead and upload one." size="sm">
        <Button
          size="sm"
          className="text-content1 bg-foreground mt-4"
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
          'absolute inset-0 rounded-medium bg-black/80 z-20 flex justify-center items-center transition-opacity opacity-0 pointer-events-none',
          {
            'opacity-100': isDragActive,
          },
        )}
      >
        <div className="w-full h-full items-center justify-center rounded-medium flex flex-col gap-4">
          <Icon icon="upload" size={48} className="text-white" />
          <div className="text-3xl font-sans font-bold text-white">Drop files here</div>
        </div>
      </div>
    </div>
  );
};
