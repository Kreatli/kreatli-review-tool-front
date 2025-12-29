import { cn } from '@heroui/react';
import { Icon } from '../../../various/Icon';

interface Props {
  isVisible: boolean;
}

export const ProjectDropFilesHint = ({ isVisible }: Props) => {
  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 z-20 flex items-center justify-center rounded-medium bg-black/80 opacity-0 transition-opacity',
        {
          'opacity-100': isVisible,
        },
      )}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-medium">
        <Icon icon="upload" size={48} className="text-white" />
        <div className="font-sans text-3xl font-bold text-white">Drop files here</div>
      </div>
    </div>
  );
};
