import Konva from 'konva';
import React from 'react';

import { ReviewTool } from '../../../../typings/reviewTool';
import { ReviewToolCanvasShape } from './ReviewToolCanvasShape';

interface Props {
  shapes: ReviewTool.Shape[];
  ratio: number;
  isDrawing: React.RefObject<boolean>;
  onDragStart: (shape: ReviewTool.Shape, event: Konva.KonvaEventObject<MouseEvent>) => void;
  onDragEnd: (shape: ReviewTool.Shape, event: Konva.KonvaEventObject<DragEvent>) => void;
  onRemove: (shape: ReviewTool.Shape) => void;
}

export const ReviewToolCanvasShapes = ({ shapes, isDrawing, ratio, onDragStart, onDragEnd, onRemove }: Props) => {
  return (
    <>
      {shapes.map((shape, idx) => (
        <ReviewToolCanvasShape
          key={idx}
          shape={shape}
          ratio={ratio}
          isDrawing={isDrawing}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onRemove={onRemove}
        />
      ))}
    </>
  );
};
