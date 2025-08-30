import { useMemo } from 'react';
import { Icon, IconType } from '../../various/Icon';

interface Props {
  fileType: string;
  size?: number;
}

export const AssetIcon = ({ fileType, size = 32 }: Props) => {
  const icon = useMemo((): IconType => {
    if (fileType.startsWith('video')) {
      return 'addVideo';
    }

    if (fileType.includes('pdf')) {
      return 'filePdf';
    }

    if (fileType.startsWith('audio')) {
      return 'music';
    }

    if (fileType.includes('word') || fileType.includes('cfb')) {
      return 'fileDoc';
    }

    if (fileType.includes('json')) {
      return 'fileJson';
    }

    if (fileType.includes('txt') || fileType.includes('text')) {
      return 'fileTxt';
    }

    return 'file';
  }, [fileType]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Icon icon={icon} className="text-foreground-400" size={size} />
    </div>
  );
};
