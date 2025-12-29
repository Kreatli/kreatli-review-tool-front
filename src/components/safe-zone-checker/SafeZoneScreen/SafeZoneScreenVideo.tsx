import { cn } from '@heroui/react';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '../../various/Icon';

interface Props {
  src: string;
  activeOverlay: 'instagram' | 'tiktok' | 'youtube';
}

export const SafeZoneScreenVideo = ({ src, activeOverlay }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!isDragging && e.currentTarget.duration && isFinite(e.currentTarget.duration)) {
      const newProgress = e.currentTarget.currentTime / e.currentTarget.duration;
      if (isFinite(newProgress)) {
        setProgress(newProgress);
      }
    }
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoDuration = e.currentTarget.duration;
    if (videoDuration && isFinite(videoDuration)) {
      setDuration(videoDuration);
    }
  };

  const updateSliderPosition = (clientX: number) => {
    if (!sliderRef.current || !videoRef.current) {
      return;
    }

    const videoDuration = videoRef.current.duration;
    if (!videoDuration || !isFinite(videoDuration) || videoDuration <= 0) {
      return;
    }

    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * videoDuration;

    if (isFinite(newTime) && newTime >= 0) {
      setProgress(percentage);
      videoRef.current.currentTime = newTime;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        updateSliderPosition(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && sliderRef.current && e.touches.length > 0) {
        e.preventDefault();
        updateSliderPosition(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        videoRef.current?.play();
        setIsPaused(false);
      }
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        setIsDragging(false);
        videoRef.current?.play();
        setIsPaused(false);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, duration]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const videoDuration = videoRef.current.duration;

    if (!videoDuration || !isFinite(videoDuration) || videoDuration <= 0) {
      return;
    }

    e.preventDefault();
    videoRef.current.pause();
    setIsDragging(true);
    updateSliderPosition(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const videoDuration = videoRef.current.duration;

    if (!videoDuration || !isFinite(videoDuration) || videoDuration <= 0) {
      return;
    }

    e.preventDefault();
    videoRef.current.pause();
    setIsDragging(true);
    if (e.touches.length > 0) {
      updateSliderPosition(e.touches[0].clientX);
    }
  };

  const handleVideoClick = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
      setIsPaused(false);
    } else {
      videoRef.current?.pause();
      setIsPaused(true);
    }
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-black">
      <video
        src={src}
        autoPlay
        playsInline
        loop
        className="h-auto max-h-full w-full cursor-pointer"
        ref={videoRef}
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        onClick={handleVideoClick}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div
        className={cn(
          'pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/10 p-3 shadow-large backdrop-blur-sm transition-opacity',
          {
            'opacity-0': !isPaused,
          },
        )}
      >
        <Icon icon="play" size={42} className="translate-x-0.5 text-white" />
      </div>
      <div
        ref={sliderRef}
        className={cn(
          'absolute bottom-0 z-10 w-full translate-y-1/2 cursor-pointer touch-none bg-black transition-all after:absolute after:-inset-y-2 after:inset-x-0 after:cursor-pointer',
          {
            'h-[3px]': activeOverlay === 'tiktok',
            'h-0.5': activeOverlay === 'youtube',
            'h-[1.5px]': activeOverlay === 'instagram',
          },
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={cn('h-full w-full transition-all', {
            'bg-[#2A3037]': activeOverlay === 'instagram',
            'bg-[#333333]': activeOverlay === 'tiktok',
            'bg-[#7B7B7B]': activeOverlay === 'youtube',
          })}
        >
          <div
            style={{ width: `${progress * 100}%` }}
            className={cn('pointer-events-none relative h-full bg-white transition-colors', {
              'bg-[#FF0033]': activeOverlay === 'youtube',
            })}
          >
            {activeOverlay !== 'instagram' && (
              <div
                className={cn('absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full transition-all', {
                  'size-1.5 bg-white': activeOverlay === 'tiktok',
                  'size-2.5 bg-[#FF0033]': activeOverlay === 'youtube',
                })}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
