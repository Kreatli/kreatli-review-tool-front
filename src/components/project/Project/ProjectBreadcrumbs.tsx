import { Image } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

import { formatBytes } from '../../../utils/formatBytes';
import { Icon } from '../../various/Icon';

interface Props {
  coverUrl?: string;
  fileCount: number;
  totalFileSize: number;
  path: {
    name: string;
    url: string;
  }[];
}

export const ProjectBreadcrumbs = ({
  children,
  coverUrl,
  path,
  fileCount,
  totalFileSize,
}: React.PropsWithChildren<Props>) => {
  return (
    <div className="flex items-center gap-3 overflow-hidden">
      <div className="shrink-0">
        {coverUrl ? (
          <Image src={coverUrl} width={48} height={48} radius="full" className="object-cover" />
        ) : (
          <div className="flex size-12 items-center justify-center rounded-full bg-foreground-100 text-foreground-500">
            <Icon icon="slides" size={20} />
          </div>
        )}
      </div>
      <div className="overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 overflow-hidden">
            {path.map((item, index) => (
              <React.Fragment key={item.url}>
                {index !== 0 && <Icon icon="chevronDown" className="shrink-0 -rotate-90 text-foreground-400" />}
                {index === path.length - 1 ? (
                  <h2 className="truncate text-2xl font-semibold">{item.name}</h2>
                ) : (
                  <Link
                    href={item.url}
                    className="flex-1 truncate text-2xl font-semibold text-foreground-400 hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
          {children}
        </div>
        <div className="text-foreground-500">
          {fileCount} file{fileCount === 1 ? '' : 's'}, {formatBytes(totalFileSize)}
        </div>
      </div>
    </div>
  );
};
