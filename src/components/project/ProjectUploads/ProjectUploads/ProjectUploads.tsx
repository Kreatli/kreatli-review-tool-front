import { Button } from '@heroui/react';
import { ProjectUploadItem } from './ProjectUploadItem';
import { Icon } from '../../../various/Icon';
import { FileUpload } from '../../../../hooks/useProjectUploads';
import { useMemo } from 'react';

interface Props {
  uploads: FileUpload[];
  onClose: () => void;
}

export const ProjectUploads = ({ uploads, onClose }: Props) => {
  const ongoingUploadsCount = useMemo(() => {
    return uploads.filter((upload) => upload.progress < 100).length;
  }, [uploads]);

  return (
    <div className="min-w-64 max-w-96">
      <div className="py-1 pl-2 border-b flex justify-between gap-2 items-center">
        <div className="font-semibold">
          {ongoingUploadsCount === 0
            ? `Uploaded ${uploads.length} item${uploads.length === 1 ? '' : 's'}`
            : `Uploading ${ongoingUploadsCount} item${ongoingUploadsCount === 1 ? '' : 's'}...`}
        </div>
        <Button aria-label="Close project uploads" size="sm" isIconOnly radius="full" variant="light" onClick={onClose}>
          <Icon icon="cross" className="text-foreground-500" size={20} />
        </Button>
      </div>
      <div className="p-2 max-h-96 overflow-auto">
        <div className="flex flex-col gap-2">
          {uploads.map((fileUpload) => (
            <ProjectUploadItem
              key={fileUpload.id}
              previewUrl={fileUpload.previewUrl}
              fileType={fileUpload.type}
              name={fileUpload.name}
              size={fileUpload.size}
              progress={fileUpload.progress}
              isError={fileUpload.isError}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
