import Konva from 'konva';
import React from 'react';

import { ReviewTool } from '../../../../typings/reviewTool';
import { ReviewToolCanvasArrow } from './ReviewToolCanvasArrow';
import { ReviewToolCanvasLine } from './ReviewToolCanvasLine';

interface Props {
  shape: ReviewTool.Shape;
  isDrawing: React.RefObject<boolean | null>;
  ratio: number;
  onDragStart: (shape: ReviewTool.Shape, event: Konva.KonvaEventObject<MouseEvent>) => void;
  onDragEnd: (shape: ReviewTool.Shape, event: Konva.KonvaEventObject<DragEvent>) => void;
  onRemove: (shape: ReviewTool.Shape) => void;
}

export const ReviewToolCanvasShape = ({ shape, isDrawing, ratio, onDragStart, onDragEnd, onRemove }: Props) => {
  if (shape.type === 'arrow') {
    return (
      <ReviewToolCanvasArrow
        arrow={shape}
        ratio={ratio}
        isDrawing={isDrawing}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onRemove={onRemove}
      />
    );
  }

  return <ReviewToolCanvasLine line={shape} ratio={ratio} onRemove={onRemove} />;
};
