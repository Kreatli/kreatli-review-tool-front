import { FileDto } from '../../../../services/types';

import { AssetIcon } from '../../AssetIcon';

interface Props {
  file: FileDto;
}

export const ReviewToolUnsupportedFile = ({ file }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <AssetIcon fileType={file.fileType} size={36} />
      <div className="text-large font-semibold max-w-60 text-center">
        We don't support previewing this file type yet
      </div>
      <div className="text-foreground-500 max-w-96 text-center">
        Feel free to use comments section below to collaborate on this file
      </div>
    </div>
  );
};
