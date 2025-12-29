import { cn } from '@heroui/react';
import React from 'react';

import { EDITOR_COLORS } from '../../../constants/colors';
import { useReviewToolCanvasShapesContext, useReviewToolContext } from '../../../contexts/ReviewTool';
import { ReviewTool } from '../../../typings/reviewTool';

export const ReviewToolColors = () => {
  const { isReadOnly } = useReviewToolCanvasShapesContext();
  const { activeTool, activeColor, setActiveColor } = useReviewToolContext();

  const handleClick = (value: ReviewTool.Color) => () => {
    setActiveColor(value);
  };

  const isDisabled = isReadOnly || !activeTool;

  return (
    <div className="flex items-center gap-2">
      {EDITOR_COLORS.map(({ value }) => (
        <div key={value}>
          <button
            type="button"
            aria-label={value}
            disabled={isDisabled}
            className={cn(
              // eslint-disable-next-line max-len
              `h-5 w-5 rounded-full border-2 border-background bg-red-500 outline outline-2 outline-foreground-200 bg-${value}-500`,
              {
                'outline-focus': activeColor === value,
                'bg-black': value === 'black',
                'bg-white': value === 'white',
                'opacity-50': isDisabled,
              },
            )}
            onClick={handleClick(value)}
          />
        </div>
      ))}
    </div>
  );
};
