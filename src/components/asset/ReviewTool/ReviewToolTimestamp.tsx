import { Button, Tooltip } from '@heroui/react';
import React from 'react';

import { useReviewToolCanvasShapesContext, useReviewToolContext } from '../../../contexts/ReviewTool';
import { formatDuration } from '../../../utils/formatDuration';
import { getIsMediaHtmlElement } from '../../../utils/getIsMediaHtmlElement';
import { Icon } from '../../various/Icon';

export const ReviewToolTimestamp = () => {
  const { resetCanvas } = useReviewToolCanvasShapesContext();
  const { activeTool, fileRef, setActiveTool } = useReviewToolContext();

  const isMediaFile = getIsMediaHtmlElement(fileRef.current);

  const handleClick = () => {
    if (!isMediaFile) {
      return;
    }

    resetCanvas();
    setActiveTool(null);
    fileRef.current?.play();
  };

  if (!isMediaFile || !activeTool) {
    return;
  }

  return (
    <div className="flex items-center gap-2 flex-1 pl-2">
      <Icon icon="paint" size={20} className="text-primary" />
      <div className="text-sm">
        {formatDuration(fileRef.current.currentTime)}{' '}
        <span className="text-foreground-500">/ {formatDuration(fileRef.current.duration)}</span>
      </div>
      <Tooltip content="Reset and play">
        <Button
          size="sm"
          variant="flat"
          color="danger"
          isIconOnly
          radius="full"
          startContent={<Icon icon="cross" size={18} />}
          onClick={handleClick}
        />
      </Tooltip>
    </div>
  );
};
