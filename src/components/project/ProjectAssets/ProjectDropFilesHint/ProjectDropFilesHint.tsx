import { cn } from '@heroui/react';
import { Icon } from '../../../various/Icon';

interface Props {
  isVisible: boolean;
}

export const ProjectDropFilesHint = ({ isVisible }: Props) => {
  return (
    <div
      className={cn(
        'fixed inset-0 rounded-medium bg-black/80 z-20 flex justify-center items-center transition-opacity opacity-0 pointer-events-none',
        {
          'opacity-100': isVisible,
        },
      )}
    >
      <div className="w-full h-full items-center justify-center rounded-medium flex flex-col gap-4">
        <Icon icon="upload" size={48} className="text-white" />
        <div className="text-3xl font-sans font-bold text-white">Drop files here</div>
      </div>
    </div>
  );
};
