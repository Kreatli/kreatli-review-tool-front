import { cn, Image } from '@heroui/react';
import React from 'react';

import { useFileStateContext } from '../../../../contexts/File';
import { useReviewToolCanvasShapesContext, useReviewToolContext } from '../../../../contexts/ReviewTool';
import { useGetAssetFileIdComments } from '../../../../services/hooks';
import { AssetCommentDto, FileDto } from '../../../../services/types';
import { getIsMediaHtmlElement } from '../../../../utils/getIsMediaHtmlElement';
import { Icon } from '../../../various/Icon';

interface Props {
  videoFile: FileDto;
  shareableLinkId?: string;
  onLoad: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
}

export const ReviewToolVideo = ({ videoFile, shareableLinkId, onLoad }: Props) => {
  const { activeTool, fileRef, compareFileRef } = useReviewToolContext();
  const { activeFile, compareFile, activeComment, replyingComment, setActiveComment, setActiveFileId } =
    useFileStateContext();
  const { resetCanvas } = useReviewToolCanvasShapesContext();
  const { data: commentsData } = useGetAssetFileIdComments(
    videoFile.id,
    { shareableLinkId: shareableLinkId ?? '' },
    { refetchOnMount: false },
  );

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragTime, setDragTime] = React.useState(0);
  const [wasPlaying, setWasPlaying] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const hideTimeoutRef = React.useRef<NodeJS.Timeout>(undefined);

  const commentsWithTimestamps = React.useMemo(() => {
    if (!commentsData?.comments) return [];

    return commentsData.comments
      .flatMap((comment) => [comment, ...comment.replies])
      .filter((comment) => comment.timestamp?.[0] !== undefined && !comment.isResolved);
  }, [commentsData]);

  React.useEffect(() => {
    if (getIsMediaHtmlElement(fileRef.current)) {
      fileRef.current.currentTime = 0;
    }
  }, [compareFile]);

  React.useEffect(() => {
    if (getIsMediaHtmlElement(fileRef.current) && activeComment) {
      fileRef.current.pause();

      if (typeof activeComment?.timestamp?.[0] === 'number') {
        fileRef.current.currentTime = activeComment?.timestamp[0];
      }
    }
    if (getIsMediaHtmlElement(compareFileRef.current) && activeComment) {
      compareFileRef.current.pause();

      if (typeof activeComment?.timestamp?.[0] === 'number') {
        compareFileRef.current.currentTime = activeComment?.timestamp[0];
      }
    }
  }, [activeComment, fileRef]);

  React.useEffect(() => {
    if (getIsMediaHtmlElement(fileRef.current) && replyingComment) {
      fileRef.current.pause();

      if (typeof replyingComment?.timestamp?.[0] === 'number') {
        fileRef.current.currentTime = replyingComment?.timestamp[0];
      }
    }
    if (getIsMediaHtmlElement(compareFileRef.current) && replyingComment) {
      compareFileRef.current.pause();

      if (typeof replyingComment?.timestamp?.[0] === 'number') {
        compareFileRef.current.currentTime = replyingComment?.timestamp[0];
      }
    }
  }, [replyingComment]);

  const updateSliderPosition = (clientX: number) => {
    if (!sliderRef.current) {
      return;
    }

    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    if (getIsMediaHtmlElement(fileRef.current)) {
      setDragTime(newTime);
      setCurrentTime(newTime);
      fileRef.current.currentTime = newTime;
    }
    if (getIsMediaHtmlElement(compareFileRef.current)) {
      setDragTime(newTime);
      setCurrentTime(newTime);
      compareFileRef.current.currentTime = newTime;
    }
  };

  React.useEffect(() => {
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
      console.log('handleMouseUp');
      if (isDragging) {
        setIsDragging(false);
        if (getIsMediaHtmlElement(fileRef.current)) {
          if (wasPlaying) {
            fileRef.current.play();
            setIsPlaying(true);
          }
        }
        if (getIsMediaHtmlElement(compareFileRef.current)) {
          if (wasPlaying) {
            compareFileRef.current.play();
            setIsPlaying(true);
          }
        }
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, wasPlaying, fileRef]);

  const handlePlay = () => {
    setIsPlaying(true);
    setActiveComment(null);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (!isDragging) {
      setCurrentTime(e.currentTarget.currentTime);
    }
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setDuration(e.currentTarget.duration);
    onLoad(e);
  };

  const handleVideoClick = () => {
    if (getIsMediaHtmlElement(fileRef.current)) {
      if (fileRef.current.paused) {
        fileRef.current.play();
        resetCanvas();
      } else {
        fileRef.current.pause();
      }
    }

    if (getIsMediaHtmlElement(compareFileRef.current)) {
      if (compareFileRef.current.paused) {
        compareFileRef.current.play();
        resetCanvas();
      } else {
        compareFileRef.current.pause();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const displayTime = isDragging ? dragTime : currentTime;

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (getIsMediaHtmlElement(fileRef.current)) {
      setWasPlaying(!fileRef.current.paused);
      fileRef.current.pause();
      setIsPlaying(false);
    }
    if (getIsMediaHtmlElement(compareFileRef.current)) {
      setWasPlaying(!compareFileRef.current.paused);
      compareFileRef.current.pause();
      setIsPlaying(false);
    }
    setActiveComment(null);
    setIsDragging(true);
    updateSliderPosition(e.nativeEvent.clientX);
  };

  const handleSliderTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (getIsMediaHtmlElement(fileRef.current)) {
      setWasPlaying(!fileRef.current.paused);
      fileRef.current.pause();
      setIsPlaying(false);
    }
    if (getIsMediaHtmlElement(compareFileRef.current)) {
      setWasPlaying(!compareFileRef.current.paused);
      compareFileRef.current.pause();
      setIsPlaying(false);
    }
    setActiveComment(null);
    setIsDragging(true);
    updateSliderPosition(e.touches[0].clientX);
  };

  const handleCommentAnchorClick = (comment: AssetCommentDto) => {
    setActiveComment(comment);
    setActiveFileId(videoFile.id);
  };

  const toggleFullscreen = () => {
    const ref = videoFile.id === compareFile?.id ? compareFileRef : fileRef;

    if (!document.fullscreenElement) {
      ref.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    hideTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  React.useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.target instanceof HTMLElement && e.target.getAttribute('contenteditable') === 'true') {
        return;
      }

      if (e.key === ' ') {
        e.preventDefault();
        handleVideoClick();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const activeRef = compareFile?.id === videoFile.id ? compareFileRef : fileRef;
        if (getIsMediaHtmlElement(activeRef.current)) {
          const jumpSeconds = e.key === 'ArrowLeft' ? -3 : 3;
          const newTime = Math.max(
            0,
            Math.min(activeRef.current.duration, activeRef.current.currentTime + jumpSeconds),
          );
          activeRef.current.currentTime = newTime;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleVideoClick, compareFile, videoFile.id, fileRef, compareFileRef]);

  return (
    <>
      {videoFile.metadata.thumbnailUrl && (
        <div className="pointer-events-none absolute -inset-12">
          <Image
            src={videoFile.metadata.thumbnailUrl}
            removeWrapper
            radius="none"
            className="absolute inset-0 h-full w-full select-none object-cover blur-md invert-[20%]"
          />
        </div>
      )}
      <div
        className="relative h-auto max-h-full w-auto max-w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <video
          // @ts-expect-error - Video element is not typed
          ref={compareFile?.id === videoFile.id ? compareFileRef : fileRef}
          controls={false}
          playsInline
          muted={videoFile.id !== activeFile?.id}
          className="relative z-10 h-auto max-h-full max-w-full cursor-pointer"
          onPlay={handlePlay}
          onPause={handlePause}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onClick={handleVideoClick}
        >
          <source src={videoFile.url} />
        </video>
        {!activeTool && (
          <div
            className={cn(
              'absolute bottom-0 left-0 right-0 z-10 text-white transition-opacity duration-300',
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0',
            )}
          >
            <div className="flex items-center justify-between gap-2 pb-1 pl-1 pr-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="relative z-10 transition-transform hover:scale-125"
                  onClick={handleVideoClick}
                >
                  <Icon icon={isPlaying ? 'pause' : 'play'} size={28} />
                </button>
                <span className="pointer-events-none z-10 select-none text-sm">
                  {formatTime(displayTime)} <span className="text-white/80">/ {formatTime(duration)}</span>
                </span>
              </div>
              <button
                type="button"
                className="relative z-10 transition-transform hover:scale-125"
                onClick={toggleFullscreen}
              >
                <Icon icon="fullscreen" size={20} />
              </button>
            </div>
            <div
              ref={sliderRef}
              className="relative z-20 flex items-center gap-2 after:absolute after:-inset-1 after:cursor-pointer"
              onTouchStart={handleSliderTouchStart}
              onMouseDown={handleSliderMouseDown}
            >
              <div className="relative h-1 flex-1 cursor-pointer overflow-hidden bg-white/20">
                <div className="h-full bg-white" style={{ width: `${(displayTime / duration) * 100}%` }} />
              </div>
            </div>
            <div className="relative z-10 h-6 border-white/20">
              {commentsWithTimestamps.map((comment) => {
                const position = (comment.timestamp![0] / duration) * 100;
                return (
                  <button
                    key={comment.id}
                    type="button"
                    className={cn(
                      'absolute bottom-1.5 z-10 flex h-3 w-3 items-center justify-center overflow-hidden rounded-full border border-foreground-400 bg-white transition-transform hover:scale-150',
                      {
                        'z-20 scale-150 border-blue-400 bg-blue-100': comment.id === activeComment?.id,
                      },
                    )}
                    style={{ left: `max(calc(${position}% - 6px), 3px)` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCommentAnchorClick(comment);
                    }}
                    aria-label={`Jump to comment at ${formatTime(comment.timestamp![0])}`}
                  >
                    {comment.createdBy?.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={comment.createdBy.avatar.url}
                        className="h-full w-full select-none object-cover"
                        alt={comment.createdBy.name}
                      />
                    ) : (
                      <span className="select-none text-[8px] leading-[9px] text-foreground-500">
                        {comment.createdBy.name?.slice(0, 1)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="pointer-events-none absolute -top-1/2 bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-black/50" />
          </div>
        )}
      </div>
    </>
  );
};
