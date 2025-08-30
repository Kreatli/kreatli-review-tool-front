import { Button, cn, Popover, PopoverContent, PopoverTrigger, Progress } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { ProjectUploads } from './ProjectUploads';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useProjectUploads } from '../../../hooks/useProjectUploads';

export const ProjectUploadsButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const isFirstRender = useRef(true);

  const uploads = useProjectUploads((state) => state.uploads);

  const ongoingUploads = useMemo(() => uploads.filter((upload) => upload.progress < 100), [uploads]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      return;
    }

    if (ongoingUploads.length > 0) {
      setIsOpen(true);
    }
  }, [ongoingUploads.length]);

  const totalProgress = useMemo(() => {
    if (ongoingUploads.length === 0) {
      return 100;
    }

    const progress = ongoingUploads.reduce((acc, fileUpload) => {
      return acc + fileUpload.progress * fileUpload.size;
    }, 0);

    const ongoingUploadsSize = ongoingUploads.reduce((acc, fileUpload) => {
      return acc + fileUpload.size;
    }, 0);

    return (progress / (ongoingUploadsSize * 100)) * 100;
  }, [ongoingUploads]);

  const progressColor = useMemo(() => {
    if (uploads.length > 0 && uploads.every((upload) => upload.isError)) {
      return 'danger';
    }

    return totalProgress === 100 ? 'success' : 'primary';
  }, [uploads, totalProgress]);

  return (
    <div className="flex flex-col gap-px -mb-1">
      <Popover placement="bottom" offset={20} isOpen={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <Button aria-label="Project uploads" isIconOnly size="sm" variant="light" radius="full">
            <Icon icon="upload" size={20} className="text-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <ProjectUploads onClose={() => setIsOpen(false)} />
        </PopoverContent>
      </Popover>
      <Progress
        disableAnimation
        size="sm"
        className={cn('opacity-0 transition-opacity', { 'opacity-100': uploads.length > 0 })}
        value={totalProgress}
        color={progressColor}
      />
    </div>
  );
};
