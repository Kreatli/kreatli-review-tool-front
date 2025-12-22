import React, { PropsWithChildren } from 'react';

import { Icon } from '../../../various/Icon';

export const ProjectFolderCover = ({ children }: PropsWithChildren) => {
  return (
    <div className="p-2 bg-foreground-50 border border-foreground-300 rounded-2xl text-foreground-100">{children}</div>
  );
};
