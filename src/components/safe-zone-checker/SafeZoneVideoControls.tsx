import { Button } from '@heroui/react';
import React, { useRef, useEffect, useState } from 'react';

import { Icon } from '../various/Icon';

interface Props {
  video: HTMLVideoElement | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTimeChange: (time: number) => void;
  onPlayPause: () => void;
}

export const SafeZoneVideoControls = ({
  video,
  currentTime,
  duration,
  isPlaying,
  onTimeChange,
  onPlayPause,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragTime, setDragTime] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const displayTime = isDragging ? dragTime : currentTime;

  const updateSliderPosition = (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) {
      return;
    }

    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    setDragTime(newTime);
    onTimeChange(newTime);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        updateSliderPosition(e);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (video && !video.paused) {
          video.play();
        }
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, duration, video]);

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (video) {
      video.pause();
    }
    setIsDragging(true);
    updateSliderPosition(e);
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-black/50 rounded-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="text-white"
            onClick={onPlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            <Icon icon={isPlaying ? 'pause' : 'play'} size={20} />
          </Button>
          <span className="text-sm text-white">
            {formatTime(displayTime)} <span className="text-white/80">/ {formatTime(duration)}</span>
          </span>
        </div>
      </div>
      <div
        ref={sliderRef}
        className="flex items-center gap-2 relative cursor-pointer"
        onMouseDown={handleSliderMouseDown}
      >
        <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${(displayTime / duration) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

