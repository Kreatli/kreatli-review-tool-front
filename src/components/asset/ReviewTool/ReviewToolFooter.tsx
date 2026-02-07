import React from 'react';

import { ProjectDto } from '../../../services/types';
import { ReviewToolColors } from './ReviewToolColors';
import { ReviewToolEditor } from './ReviewToolEditor';
import { ReviewToolHistoryButtons } from './ReviewToolHistoryButtons';
import { ReviewToolShapes } from './ReviewToolShapes';
import { ReviewToolTimestamp } from './ReviewToolTimestamp';

interface Props {
  isDisabled?: boolean;
  shareableLinkId?: string;
  project?: ProjectDto;
}

export const ReviewToolFooter = ({ shareableLinkId, isDisabled = false, project }: Props) => {
  return (
    <div className="relative flex flex-col items-center p-3 pt-6 md:h-32 md:p-6 md:pb-12">
      <ReviewToolEditor shareableLinkId={shareableLinkId} isDisabled={isDisabled} project={project} />
      <div className="relative mx-auto w-full max-w-screen-xl">
        <div className="mt-2 flex w-full flex-wrap items-center justify-start gap-4 gap-y-2 md:absolute md:right-2 md:top-2 md:mt-0">
          <ReviewToolTimestamp />
          <ReviewToolHistoryButtons />
          <ReviewToolShapes isDisabled={isDisabled} />
          <ReviewToolColors />
        </div>
      </div>
    </div>
  );
};
