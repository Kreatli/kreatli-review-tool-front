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

interface Props {
  shapes: ReviewTool.Shape[];
  onShapesChange: (shapes: ReviewTool.Shape[]) => void;
}

export const ReviewToolCanvas = ({ shapes, onShapesChange }: Props) => {
  const fileRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const lastPointRef = React.useRef<Vector2d | null>(null);

  const [canvasWidth, setCanvasWidth] = useState(0);

  useScreenResize(() => {
    setCanvasWidth(fileRef.current?.clientWidth ?? 0);
  });

  useEffect(() => {
    setCanvasWidth(fileRef.current?.clientWidth ?? 0);
  }, []);

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;

    const position = event.target.getStage()?.getPointerPosition();

    if (!position) {
      return;
    }

    lastPointRef.current = position;

    onShapesChange([...shapes, { type: 'line', points: [], color: 'red' }]);
  };

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
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
    newShapes[newShapes.length - 1].points = newShapes[newShapes.length - 1].points.concat([point.x, point.y]);
    onShapesChange(newShapes);

    lastPointRef.current = point;
  };

  const handleMouseUp = () => {
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
  };

  return (
    <div ref={fileRef} className="aspect-video rounded-lg overflow-hidden relative">
      <video
        src="https://videos.pexels.com/video-files/4436060/4436060-uhd_2560_1440_25fps.mp4"
        controls={false}
        loop
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
            cursor: 'url("/cursors/dots/red.svg") 3 3, auto',
          } as React.CSSProperties
        }
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          {shapes.map((shape) => (
            <Line
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
