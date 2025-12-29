import { FileDto } from '../../../../services/types';

import { AssetIcon } from '../../AssetIcon';

interface Props {
  file: FileDto;
}

export const ReviewToolUnsupportedFile = ({ file }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <AssetIcon fileType={file.fileType} size={36} />
      <div className="max-w-60 text-center text-large font-semibold">
        We don't support previewing this file type yet
      </div>
      <div className="max-w-96 text-center text-foreground-500">
        Feel free to use comments section below to collaborate on this file
      </div>
    </div>
  );
};
