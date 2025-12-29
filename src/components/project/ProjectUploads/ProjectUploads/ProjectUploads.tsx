import { Button } from '@heroui/react';
import { ProjectUploadItem } from './ProjectUploadItem';
import { Icon } from '../../../various/Icon';
import { FileUpload, useProjectUploads } from '../../../../hooks/useProjectUploads';
import { useMemo } from 'react';

interface Props {
  onClose: () => void;
}

export const ProjectUploads = ({ onClose }: Props) => {
  const uploads = useProjectUploads((state) => state.uploads);
  const removeFileUpload = useProjectUploads((state) => state.removeFileUpload);
  const removeUploadedFiles = useProjectUploads((state) => state.removeUploadedFiles);

  const ongoingUploadsCount = useMemo(() => {
    return uploads.filter((upload) => upload.progress < 100).length;
  }, [uploads]);

  const hasCompletedUploads = useMemo(() => {
    return uploads.filter((upload) => upload.progress === 100 || upload.isError).length > 0;
  }, [uploads]);

  const handleFileUploadCancel = (fileUpload: FileUpload) => {
    fileUpload.cancelUpload();
  };

  const handleFileUploadRemove = (fileUpload: FileUpload) => {
    removeFileUpload(fileUpload.id);
  };

  const handleClearAll = () => {
    removeUploadedFiles();
  };

  return (
    <div className="w-96 max-w-full">
      <div className="flex items-center justify-between gap-2 border-b border-foreground-200 py-1 pl-2">
        <div className="font-semibold">
          {uploads.length === 0
            ? 'File uploads'
            : ongoingUploadsCount === 0
              ? `Uploaded ${uploads.length} item${uploads.length === 1 ? '' : 's'}`
              : `Uploading ${ongoingUploadsCount} item${ongoingUploadsCount === 1 ? '' : 's'}...`}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="flat" isDisabled={!hasCompletedUploads} size="sm" onClick={handleClearAll}>
            <Icon icon="check" size={16} />
            Clear all
          </Button>
          <Button
            aria-label="Close project uploads"
            size="sm"
            isIconOnly
            radius="full"
            variant="light"
            onClick={onClose}
          >
            <Icon icon="cross" className="text-foreground-500" size={20} />
          </Button>
        </div>
      </div>
      <div className="-mx-1 max-h-96 overflow-auto py-2">
        <div className="flex flex-col">
          {uploads.map((fileUpload) => (
            <ProjectUploadItem
              key={fileUpload.id}
              previewUrl={fileUpload.previewUrl}
              fileType={fileUpload.type}
              name={fileUpload.name}
              size={fileUpload.size}
              progress={fileUpload.progress}
              isError={fileUpload.isError}
              isLoading={fileUpload.isUploadedToS3 && fileUpload.progress !== 100}
              projectId={fileUpload.projectId}
              folderId={fileUpload.folderId}
              onRemove={() => handleFileUploadRemove(fileUpload)}
              onCancel={() => handleFileUploadCancel(fileUpload)}
            />
          ))}
          {uploads.length === 0 && <div className="p-2 text-foreground-500">No file upload in progress</div>}
        </div>
      </div>
    </div>
  );
};
