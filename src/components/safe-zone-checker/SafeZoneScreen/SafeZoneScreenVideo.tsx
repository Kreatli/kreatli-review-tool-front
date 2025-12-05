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
  const [isPaused, setIsPaused] = useState(false);

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

  const updateSliderPosition = (e: MouseEvent) => {
    if (!sliderRef.current || !videoRef.current) {
      return;
    }

    const videoDuration = videoRef.current.duration;
    if (!videoDuration || !isFinite(videoDuration) || videoDuration <= 0) {
      return;
    }

    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
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
        updateSliderPosition(e);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        videoRef.current?.play();
        setIsPaused(false);
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
    updateSliderPosition(e.nativeEvent);
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
    <div className="w-full h-full bg-black relative flex items-center justify-center">
      <video
        src={src}
        autoPlay
        playsInline
        className="cursor-pointer w-full h-auto max-h-full"
        ref={videoRef}
        onClick={handleVideoClick}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div
        className={cn(
          'absolute top-1/2 pointer-events-none left-1/2 backdrop-blur-sm transition-opacity -translate-x-1/2 shadow-large rounded-full p-3 bg-black/10 flex items-center justify-center -translate-y-1/2',
          {
            'opacity-0': !isPaused,
          },
        )}
      >
        <Icon icon="play" size={42} className="text-white translate-x-0.5" />
      </div>
      <div
        ref={sliderRef}
        className={cn(
          'absolute bottom-0 translate-y-1/2 bg-black w-full z-10 cursor-pointer after:absolute after:-inset-y-2 after:inset-x-0 after:cursor-pointer transition-all',
          {
            'h-[3px]': activeOverlay === 'tiktok',
            'h-0.5': activeOverlay === 'youtube',
            'h-[1.5px]': activeOverlay === 'instagram',
          },
        )}
        onMouseDown={handleMouseDown}
      >
        <div
          className={cn('w-full h-full transition-all', {
            'bg-[#2A3037]': activeOverlay === 'instagram',
            'bg-[#333333]': activeOverlay === 'tiktok',
            'bg-[#7B7B7B]': activeOverlay === 'youtube',
          })}
        >
          <div
            style={{ width: `${progress * 100}%` }}
            className={cn('bg-white h-full relative pointer-events-none transition-colors', {
              'bg-[#FF0033]': activeOverlay === 'youtube',
            })}
          >
            {activeOverlay !== 'instagram' && (
              <div
                className={cn('absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 rounded-full transition-all', {
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
