import React from 'react';
import { Line } from 'react-konva';

import { EDITOR_COLOR_HEX } from '../../../../constants/colors';
import { useReviewToolContext } from '../../../../contexts/ReviewTool';
import { ReviewTool } from '../../../../typings/reviewTool';

interface Props {
  line: ReviewTool.Line;
  ratio: number;
  onRemove: (line: ReviewTool.Line) => void;
  // isDrawing: React.RefObject<boolean>;
  // onDragStart: (line: ReviewTool.Line, event: Konva.KonvaEventObject<MouseEvent>) => void;
  // onDragEnd: (line: ReviewTool.Line, event: Konva.KonvaEventObject<DragEvent>) => void;
}

export const ReviewToolCanvasLine = ({ line, ratio, onRemove }: Props) => {
  const { activeTool } = useReviewToolContext();
  // const isDragging = React.useRef(false);
  // const isOver = React.useRef(false);

  // const handleMouseEnter = () => {
  //   if (isDrawing.current) {
  //     return;
  //   }

  //   document.body.style.cursor = 'move';
  //   isOver.current = true;
  // };

  // const handleMouseLeave = () => {
  //   if (isDragging.current) {
  //     isOver.current = false;

  //     return;
  //   }

  //   document.body.style.cursor = '';
  // };

  // const handleMouseDown = (line: ReviewTool.Line) => (event: Konva.KonvaEventObject<MouseEvent>) => {
  //   isDragging.current = true;
  //   onDragStart(line, event);
  // };

  // const handleDragEnd = (line: ReviewTool.Line) => (event: Konva.KonvaEventObject<DragEvent>) => {
  //   isDragging.current = false;
  //   onDragEnd(line, event);

  //   if (!isOver.current) {
  //     document.body.style.cursor = '';
  //   }
  // };

  const handleClick = () => {
    if (activeTool !== 'eraser') {
      return;
    }

    onRemove(line);
  };

  return (
    <>
      <Line
        points={line.points}
        stroke={EDITOR_COLOR_HEX[line.color]}
        strokeWidth={5 / ratio}
        tension={0.4}
        lineCap="round"
        lineJoin="round"
        // draggable
        // onMouseDown={handleMouseDown(line)}
        // onDragEnd={handleDragEnd(line)}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      />
      <Line
        points={line.points}
        stroke={EDITOR_COLOR_HEX[line.color]}
        strokeWidth={15 / ratio}
        opacity={0}
        lineCap="round"
        lineJoin="round"
        listening={activeTool === 'eraser'}
        onClick={handleClick}
      />
    </>
  );
};
