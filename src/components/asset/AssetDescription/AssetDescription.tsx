import { Avatar, Tooltip } from '@heroui/react';

import { FileDto } from '../../../services/types';
import { formatFullDate } from '../../../utils/dates';

interface Props {
  file: FileDto;
}

export const AssetDescription = ({ file }: Props) => {
  return (
    <div className="sticky top-0 z-20 hidden bg-background p-3 md:block">
      <div className="flex items-center gap-2 text-sm">
        <Tooltip content={file.createdBy?.name}>
          <Avatar
            src={file.createdBy?.avatar?.url ?? ''}
            size="sm"
            className="inline-block !size-6 cursor-pointer"
            name={file.createdBy?.name}
            getInitials={(name) => name.charAt(0).toUpperCase()}
          />
        </Tooltip>
        <span className="text-sm text-foreground-500">uploaded on {formatFullDate(file.createdAt)}</span>
      </div>
      <div>{file.description}</div>
    </div>
  );
};
