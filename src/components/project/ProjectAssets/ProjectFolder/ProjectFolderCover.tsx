import React, { PropsWithChildren } from 'react';

import { Icon } from '../../../various/Icon';

export const ProjectFolderCover = ({ children }: PropsWithChildren) => {
  return (
    <div className="rounded-2xl border border-foreground-300 bg-foreground-50 p-2 text-foreground-100">{children}</div>
  );
};
