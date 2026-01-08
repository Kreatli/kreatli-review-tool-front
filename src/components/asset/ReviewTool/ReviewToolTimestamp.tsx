/* eslint-disable react-hooks/refs */
import { Button, Tooltip } from '@heroui/react';
import React from 'react';

import { useFileStateContext } from '../../../contexts/File';
import { useReviewToolCanvasShapesContext, useReviewToolContext } from '../../../contexts/ReviewTool';
import { formatDuration } from '../../../utils/formatDuration';
import { getIsMediaHtmlElement } from '../../../utils/getIsMediaHtmlElement';
import { Icon } from '../../various/Icon';

export const ReviewToolTimestamp = () => {
  const { compareFile, activeFile } = useFileStateContext();
  const { resetCanvas } = useReviewToolCanvasShapesContext();
  const { activeTool, fileRef, compareFileRef, setActiveTool } = useReviewToolContext();

  const activeRef = activeFile?.id === compareFile?.id ? compareFileRef : fileRef;

  const handleClick = () => {
    if (getIsMediaHtmlElement(fileRef.current)) {
      fileRef.current?.play();
    }

    if (getIsMediaHtmlElement(compareFileRef.current)) {
      compareFileRef.current?.play();
    }

    resetCanvas();
    setActiveTool(null);
  };

  if (!getIsMediaHtmlElement(activeRef.current) || !activeTool) {
    return;
  }

  return (
    <div className="flex flex-1 items-center gap-2 pl-2">
      <Icon icon="paint" size={20} className="text-primary" />
      <div className="text-sm">
        {formatDuration(activeRef.current.currentTime)}{' '}
        <span className="text-foreground-500">/ {formatDuration(activeRef.current.duration)}</span>
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
