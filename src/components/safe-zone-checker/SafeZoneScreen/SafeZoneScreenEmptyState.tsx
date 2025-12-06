import { useDropzone } from 'react-dropzone';
import { Icon } from '../../various/Icon';
import { cn } from '@heroui/react';

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
    noClick: true,
  });

  return (
    <label
      {...getRootProps()}
      onClick={open}
      className={cn('bg-black/75 text-white h-full flex items-center w-full justify-center cursor-pointer', {
        'bg-black/50': isDragActive && isDragAccept,
      })}
    >
      <div className="flex flex-col items-center p-14 text-center gap-2 w-full">
        <Icon icon="upload" size={24} />
        <p className="text-sm font-medium">
          {isDragActive && isDragAccept ? 'Drop your file here' : 'Drag and drop your file here or click to upload'}
        </p>
      </div>
      <input className="sr-only" {...getInputProps()} />
    </label>
  );
};
