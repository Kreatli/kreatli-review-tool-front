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

  return (
    <div
      className={cn('flex flex-col gap-px opacity-0 -mb-1 transition-opacity pointer-events-none', {
        'opacity-100 pointer-events-auto': uploads.length > 0,
      })}
    >
      <Popover placement="bottom" offset={20} isOpen={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger>
          <Button
            disabled={uploads.length === 0}
            aria-label="Project uploads"
            isIconOnly
            size="sm"
            variant="light"
            radius="full"
          >
            <Icon icon="upload" size={20} className="text-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <ProjectUploads uploads={uploads} onClose={() => setIsOpen(false)} />
        </PopoverContent>
      </Popover>
      <Progress
        disableAnimation
        size="sm"
        value={totalProgress}
        color={totalProgress === 100 ? 'success' : 'primary'}
      />
    </div>
  );
};
