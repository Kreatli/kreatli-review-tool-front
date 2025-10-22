import React from 'react';

import { ReviewToolColors } from './ReviewToolColors';
import { ReviewToolHistoryButtons } from './ReviewToolHistoryButtons';
import { ReviewToolShapes } from './ReviewToolShapes';
import { ReviewToolTextarea } from './ReviewToolTextarea';
import { ReviewToolTimestamp } from './ReviewToolTimestamp';

interface Props {
  isDisabled?: boolean;
  shareableLinkId?: string;
}

export const ReviewToolFooter = ({ shareableLinkId, isDisabled = false }: Props) => {
  return (
    <div className="relative p-6 md:pb-12 md:h-32 flex flex-col items-center">
      <ReviewToolTextarea shareableLinkId={shareableLinkId} isDisabled={isDisabled} />
      <div className="max-w-screen-xl w-full mx-auto relative">
        <div className="mt-2 md:mt-0 md:absolute md:right-2 md:top-2 w-full flex-wrap flex gap-4 justify-end items-center">
          <ReviewToolTimestamp />
          <ReviewToolHistoryButtons />
          <ReviewToolShapes isDisabled={isDisabled} />
          <ReviewToolColors />
        </div>
      </div>
    </div>
  );
};
