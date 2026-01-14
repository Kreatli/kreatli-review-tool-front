import { Button, cn } from '@heroui/react';
import { useDropzone } from 'react-dropzone';

import { Icon } from '../../various/Icon';

interface Props {
  onUploadFile: (file: File) => void;
}

export const SafeZoneScreenEmptyState = ({ onUploadFile }: Props) => {
  const { isDragActive, isDragAccept, open, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'video/*': [],
    },
    onDrop: (files) => {
      onUploadFile(files[0]);
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn('flex h-full w-full cursor-pointer items-center justify-center bg-black/75 text-white', {
        'bg-black/50': isDragActive && isDragAccept,
      })}
    >
      <div className="flex w-full flex-col items-center gap-2 p-14 text-center">
        <p className="mb-2 text-sm font-medium">
          {isDragActive && isDragAccept ? 'Drop your file here' : 'Drag and drop your file here or click to upload'}
        </p>
        <Button onClick={open}>
          <Icon icon="addImage" size={16} />
          Select file
        </Button>
      </div>
      <input {...getInputProps()} />
    </div>
  );
};
