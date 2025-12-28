import { useEffect, useRef, useState } from 'react';
import { useScreenResize } from '../../../hooks/useScreenResize';
import { Layer, Line, Stage } from 'react-konva';

import styles from './ReviewToolPreview.module.scss';
import Konva from 'konva';
import React from 'react';
import { Vector2d } from 'konva/lib/types';
import { ReviewTool } from '../../../typings/reviewTool';
import { simplifyLine } from '../../../utils/canvas';
import { EDITOR_COLOR_HEX } from '../../../constants/colors';
import { Icon } from '../../various/Icon';
import { cn } from '@heroui/react';
import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';

interface Props {
  shapes: ReviewTool.Shape[];
  onShapesChange: (shapes: ReviewTool.Shape[]) => void;
}

export const ReviewToolCanvas = ({ shapes, onShapesChange }: Props) => {
  const fileRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const lastPointRef = React.useRef<Vector2d | null>(null);
  const isHovering = useRef(false);

  const isTouchScreen = useIsTouchScreen();

  const [canvasWidth, setCanvasWidth] = useState(0);
  const [shouldShowStartDrawing, setShouldShowStartDrawing] = useState(true);
  const [hasStartedDrawing, setHasStartedDrawing] = useState(false);

  useScreenResize(() => {
    setCanvasWidth(fileRef.current?.clientWidth ?? 0);
  });

  useEffect(() => {
    setCanvasWidth(fileRef.current?.clientWidth ?? 0);
  }, []);

  const finishDrawing = () => {
    if (isDrawing.current) {
      isDrawing.current = false;

      if (shapes[shapes.length - 1]?.points.length <= 2) {
        onShapesChange(shapes.slice(0, -1));
        return;
      }

      const newShapes = [...shapes];
      const lastLine = newShapes[newShapes.length - 1];

      if (lastLine) {
        lastLine.points = simplifyLine(lastLine.points);
      }

      onShapesChange(newShapes);
    }

    lastPointRef.current = null;
  };

  const handleMouseEnter = () => {
    setShouldShowStartDrawing(false);
    isHovering.current = true;
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    finishDrawing();
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isHovering.current) {
      return;
    }

    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();

    if (!point) {
      return;
    }

    // Start drawing on first mouse move when hovering
    if (!isDrawing.current) {
      isDrawing.current = true;
      lastPointRef.current = point;
      // Create new shape with initial point
      onShapesChange([...shapes, { type: 'line', points: [point.x, point.y], color: 'red' }]);
      return;
    }

    if (lastPointRef.current) {
      const dx = Math.abs(point.x - lastPointRef.current.x);
      const dy = Math.abs(point.y - lastPointRef.current.y);

      if (dx < 5 && dy < 5) {
        return;
      }
    }

    const newShapes = [...shapes];
    if (newShapes.length > 0) {
      newShapes[newShapes.length - 1].points = newShapes[newShapes.length - 1].points.concat([point.x, point.y]);
      onShapesChange(newShapes);
    }

    lastPointRef.current = point;
  };

  // Touch event handlers for mobile
  const handleTouchStart = (event: Konva.KonvaEventObject<TouchEvent>) => {
    event.evt.preventDefault();
    
    if (!hasStartedDrawing) {
      setShouldShowStartDrawing(false);
      setHasStartedDrawing(true);
    }
    
    const stage = event.target.getStage();
    const point = stage?.getPointerPosition();

    if (!point) {
      return;
    }

    isDrawing.current = true;
    lastPointRef.current = point;
    onShapesChange([...shapes, { type: 'line', points: [point.x, point.y], color: 'red' }]);
  };

  const handleTouchMove = (event: Konva.KonvaEventObject<TouchEvent>) => {
    event.evt.preventDefault();
    
    if (!isDrawing.current) {
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

    const newShapes = [...shapes];
    if (newShapes.length > 0) {
      newShapes[newShapes.length - 1].points = newShapes[newShapes.length - 1].points.concat([point.x, point.y]);
      onShapesChange(newShapes);
    }

    lastPointRef.current = point;
  };

  const handleTouchEnd = (event: Konva.KonvaEventObject<TouchEvent>) => {
    event.evt.preventDefault();
    finishDrawing();
  };

  return (
    <div ref={fileRef} className="aspect-video rounded-lg overflow-hidden relative">
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-300 bg-black/70 dark:bg-black/80 flex flex-col items-center justify-center gap-3 z-10 pointer-events-none',
          isTouchScreen && !hasStartedDrawing ? 'opacity-100' : shouldShowStartDrawing && !isTouchScreen ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Icon icon="paint" className="text-white dark:text-foreground-100" size={40} />
        <span className="text-xl sm:text-2xl font-semibold text-white dark:text-foreground-100">
          {isTouchScreen ? 'Tap to Draw' : 'Start drawing'}
        </span>
        {isTouchScreen && (
          <span className="text-sm text-foreground-200 dark:text-foreground-300 text-center px-4">
            Touch and drag on the screen to draw
          </span>
        )}
      </div>
      <video
        src="https://videos.pexels.com/video-files/4436060/4436060-uhd_2560_1440_25fps.mp4"
        controls={false}
        loop
        playsInline
        autoPlay
        muted
      />
      <Stage
        width={960}
        height={540}
        className={styles.canvas}
        style={
          {
            '--canvas-ratio': canvasWidth / 960,
            cursor: isTouchScreen ? 'default' : 'url("/cursors/pencil.svg") 8 28, auto',
          } as React.CSSProperties
        }
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Layer>
          {shapes.map((shape, index) => (
            <Line
              key={index}
              points={shape.points}
              stroke={EDITOR_COLOR_HEX[shape.color]}
              strokeWidth={5}
              tension={0.4}
              lineCap="round"
              lineJoin="round"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
