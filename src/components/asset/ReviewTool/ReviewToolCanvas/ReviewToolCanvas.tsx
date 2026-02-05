import { cn } from '@heroui/react';
import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import React, { useEffect } from 'react';
import { Layer, Stage } from 'react-konva';

import { useFileStateContext } from '../../../../contexts/File';
import { useReviewToolCanvasShapesContext, useReviewToolContext } from '../../../../contexts/ReviewTool';
import { useScreenResize } from '../../../../hooks/useScreenResize';
import { trackEvent } from '../../../../lib/amplitude';
import { FileDto } from '../../../../services/types';
import { ReviewTool } from '../../../../typings/reviewTool';
import { simplifyLine } from '../../../../utils/canvas';
import { ReviewToolAudio } from './ReviewToolAudio';
import styles from './ReviewToolCanvas.module.scss';
import { ReviewToolCanvasShapes } from './ReviewToolCanvasShapes';
import { ReviewToolImage } from './ReviewToolImage';
import { ReviewToolUnsupportedFile } from './ReviewToolUnsupportedFile';
import { ReviewToolVideo } from './ReviewToolVideo';

interface Props {
  file: FileDto;
  shareableLinkId?: string;
  onClick?: () => void;
}

export const ReviewToolCanvas = ({ file, shareableLinkId, onClick }: Props) => {
  const { activeFile, compareFile } = useFileStateContext();
  const { activeTool, activeColor, canvasRef, fileRef, compareFileRef } = useReviewToolContext();
  const { shapes, isReadOnly, setShapes, pushHistory } = useReviewToolCanvasShapesContext();

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [canvasWidth, setCanvasWidth] = React.useState(0);

  const isDrawing = React.useRef(false);
  const isDragging = React.useRef(false);

  const lastPointRef = React.useRef<Vector2d | null>(null);

  const ref = compareFile?.id === file.id ? compareFileRef : fileRef;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCanvasWidth(ref.current?.clientWidth ?? 0);
  }, [compareFile]);

  useScreenResize(() => {
    setCanvasWidth(ref.current?.clientWidth ?? 0);
  });

  const handleFileLoad = (event: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>) => {
    const imageOrVideo = event.target as HTMLImageElement | HTMLVideoElement;

    if (imageOrVideo instanceof HTMLVideoElement) {
      setWidth(imageOrVideo.videoWidth);
      setHeight(imageOrVideo.videoHeight);
    } else {
      setWidth(imageOrVideo.width);
      setHeight(imageOrVideo.height);
    }

    setCanvasWidth(ref.current?.clientWidth ?? 0);
  };

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (isDragging.current || !activeTool || activeTool === 'eraser') {
      return;
    }

    isDrawing.current = true;

    const position = event.target.getStage()?.getPointerPosition();

    if (!position) {
      return;
    }

    lastPointRef.current = position;

    setShapes([...shapes, { type: activeTool, points: [], color: activeColor }]);
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current || isDragging.current || activeTool === 'eraser') {
      return;
    }

    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();

    if (!point) {
      return;
    }

    if (lastPointRef.current) {
      const dx = Math.abs(point.x - lastPointRef.current.x);
      const dy = Math.abs(point.y - lastPointRef.current.y);

      if (dx < 5 && dy < 5) {
        return;
      }
    }

    if (activeTool === 'line') {
      const newShapes = [...shapes];
      newShapes[newShapes.length - 1].points = newShapes[newShapes.length - 1].points.concat([point.x, point.y]);
      setShapes(newShapes);
    }

    if (activeTool === 'arrow') {
      const newShapes = [...shapes];
      newShapes[newShapes.length - 1].points = [
        ...newShapes[newShapes.length - 1].points.slice(0, 2),
        point.x,
        point.y,
      ];
      setShapes(newShapes);
    }

    lastPointRef.current = point;
  };

  const handleMouseUp = () => {
    if (isDragging.current || activeTool === 'eraser') {
      return;
    }

    isDrawing.current = false;

    if (shapes[shapes.length - 1].points.length <= 2) {
      setShapes(shapes.slice(0, -1));

      return;
    }

    if (activeTool === 'line') {
      const newShapes = [...shapes];
      const lastLine = newShapes[newShapes.length - 1];

      if (lastLine) {
        lastLine.points = simplifyLine(lastLine.points);
      }

      setShapes(newShapes);
      pushHistory(newShapes);

      trackEvent('use_comment_drawings');

      return;
    }

    pushHistory(shapes);
  };

  const handleDragStart = (_: ReviewTool.Shape, event: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeTool === 'eraser') {
      return;
    }

    isDragging.current = true;

    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();

    if (point) {
      lastPointRef.current = point;
    }
  };

  const handleDragEnd = (shape: ReviewTool.Shape, event: Konva.KonvaEventObject<MouseEvent>) => {
    if (activeTool === 'eraser') {
      return;
    }

    isDragging.current = false;

    const newShapes = [...shapes];
    const index = shapes.indexOf(shape);

    if (activeTool === 'arrow' && index > -1) {
      const { x, y } = event.target.position();
      const [x1, y1, x2, y2] = shapes[index].points;

      newShapes[index] = {
        ...newShapes[index],
        points: [x1 + x, y1 + y, x2 + x, y2 + y],
      };

      event.target.position({ x: 0, y: 0 });

      setShapes(newShapes);
      pushHistory(newShapes);
    }
  };

  const handleRemove = (shape: ReviewTool.Shape) => {
    const newShapes = shapes.filter((shp) => shp !== shape);
    setShapes(newShapes);
    pushHistory(newShapes);
  };

  const isSupportedFile =
    file.fileType.startsWith('image') ||
    file.fileType.includes('pdf') ||
    file.fileType.startsWith('video') ||
    file.fileType.startsWith('audio');

  return (
    <div
      className={cn('relative flex flex-1 flex-col items-center justify-center overflow-hidden', {
        '[&>*]:pointer-events-none': activeFile?.id !== file.id && activeTool,
      })}
      onClick={onClick}
    >
      {(file.fileType.startsWith('image') || file.fileType.includes('pdf')) && (
        <ReviewToolImage imageFile={file} onLoad={handleFileLoad} />
      )}
      {file.fileType.startsWith('video') && (
        <ReviewToolVideo shareableLinkId={shareableLinkId} videoFile={file} onLoad={handleFileLoad} />
      )}
      {file.fileType.startsWith('audio') && <ReviewToolAudio audioFile={file} />}
      {isSupportedFile && activeFile?.id === file.id && (
        <Stage
          ref={activeFile?.id === file.id ? canvasRef : undefined}
          className={cn(styles.canvas, { 'pointer-events-none': isReadOnly })}
          width={width}
          height={height}
          style={
            {
              '--canvas-ratio': canvasWidth / width,
              pointerEvents: activeTool ? 'auto' : 'none',
              cursor:
                activeTool === 'eraser'
                  ? 'url("/cursors/eraser.svg") 4 7, auto'
                  : `url("/cursors/dots/${activeColor}.svg") 3 3, auto`,
            } as React.CSSProperties
          }
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            <ReviewToolCanvasShapes
              shapes={shapes}
              ratio={canvasWidth / width}
              isDrawing={isDrawing}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onRemove={handleRemove}
            />
          </Layer>
        </Stage>
      )}
      {!isSupportedFile && <ReviewToolUnsupportedFile file={file} />}
    </div>
  );
};
