import { Button } from '@heroui/react';
import { ProjectUploadItem } from './ProjectUploadItem';
import { Icon } from '../../../various/Icon';
import { FileUpload, useProjectUploads } from '../../../../hooks/useProjectUploads';
import { useEffect, useMemo } from 'react';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';

interface Props {
  onClose: () => void;
}

export const ProjectUploads = ({ onClose }: Props) => {
  const uploads = useProjectUploads((state) => state.uploads);
  const removeFileUpload = useProjectUploads((state) => state.removeFileUpload);
  const removeUploadedFiles = useProjectUploads((state) => state.removeUploadedFiles);

  const [failedFileUploads] = useLocalStorage<FileUpload[]>({
    defaultValue: [],
    key: 'failedFileUploads',
    asJson: true,
  });

  const allUploads = useMemo(() => {
    return [
      ...uploads,
      ...failedFileUploads.filter((failedUpload) => !uploads.find((upload) => upload.id === failedUpload.id)),
    ];
  }, [uploads, failedFileUploads]);

  const ongoingUploadsCount = useMemo(() => {
    return allUploads.filter((upload) => upload.progress < 100).length;
  }, [allUploads]);

  const hasCompletedUploads = useMemo(() => {
    return allUploads.filter((upload) => upload.progress === 100 || upload.isError).length > 0;
  }, [allUploads]);

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
      <div className="py-1 pl-2 border-b border-foreground-200 flex justify-between gap-2 items-center">
        <div className="font-semibold">
          {allUploads.length === 0
            ? 'File uploads'
            : ongoingUploadsCount === 0
              ? `Uploaded ${allUploads.length} item${allUploads.length === 1 ? '' : 's'}`
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
      <div className="py-2 max-h-96 -mx-1 overflow-auto">
        <div className="flex flex-col">
          {allUploads.map((fileUpload) => (
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
          {allUploads.length === 0 && <div className="p-2 text-foreground-500">No file upload in progress</div>}
        </div>
      </div>
    </div>
  );
};
