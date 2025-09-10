import { Avatar, Tooltip } from '@heroui/react';
import React from 'react';

import { FileDto } from '../../../services/types';
import { formatFullDate } from '../../../utils/dates';

interface Props {
  file: FileDto;
}

export const AssetDescription = ({ file }: Props) => {
  return (
    <div className="hidden md:block sticky top-0 bg-background p-3 z-10">
      <div className="text-sm flex items-center gap-2">
        <Tooltip content={file.createdBy?.name}>
          <Avatar
            src={file.createdBy?.avatar?.url ?? ''}
            size="sm"
            className="cursor-pointer !size-6 inline-block"
            fallback={
              <div className="text-xs text-foreground-500 select-none">
                {file.createdBy?.name.slice(0, 1).toUpperCase()}
              </div>
            }
          />
        </Tooltip>
        <span className="text-sm text-foreground-500">uploaded on {formatFullDate(file.createdAt)}</span>
      </div>
      <div>{file.description}</div>
    </div>
  );
};
