import { Button } from '@heroui/react';
import React from 'react';

import { useReviewToolCanvasShapesContext, useReviewToolContext } from '../../../contexts/ReviewTool';
import { ReviewTool } from '../../../typings/reviewTool';
import { getIsMediaHtmlElement } from '../../../utils/getIsMediaHtmlElement';
import { Icon } from '../../various/Icon';

const SHAPES = [
  {
    icon: 'eraser',
    iconSize: 20,
    value: 'eraser',
  },
  {
    icon: 'paint',
    iconSize: 20,
    value: 'line',
  },
  {
    icon: 'arrow',
    value: 'arrow',
    iconSize: undefined,
  },
] as const;

export const ReviewToolShapes = ({ isDisabled = false }) => {
  const { isReadOnly, shapes } = useReviewToolCanvasShapesContext();
  const { activeTool, setActiveTool, fileRef, compareFileRef } = useReviewToolContext();

  const handleClick = (shape: ReviewTool.ToolType) => () => {
    setActiveTool(activeTool === shape ? null : shape);

    if (getIsMediaHtmlElement(fileRef.current)) {
      fileRef.current.pause();
    }
    if (getIsMediaHtmlElement(compareFileRef.current)) {
      compareFileRef.current.pause();
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {SHAPES.map(({ value, icon, iconSize }) => (
        <Button
          key={value}
          size="sm"
          isDisabled={isReadOnly || isDisabled || (value === 'eraser' && shapes.length === 0)}
          variant={activeTool === value ? 'flat' : 'light'}
          color={activeTool === value ? 'primary' : 'default'}
          isIconOnly
          radius="full"
          onClick={handleClick(value)}
        >
          <Icon icon={icon} size={iconSize} />
        </Button>
      ))}
    </div>
  );
};
