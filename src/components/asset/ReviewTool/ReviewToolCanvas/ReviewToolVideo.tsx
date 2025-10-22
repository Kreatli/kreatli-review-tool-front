import { cn, Image } from '@heroui/react';
import React from 'react';

import { useReviewToolCanvasShapesContext, useReviewToolContext } from '../../../../contexts/ReviewTool';
import { useGetAssetFileIdComments } from '../../../../services/hooks';
import { AssetCommentDto, FileDto } from '../../../../services/types';
import { getIsMediaHtmlElement } from '../../../../utils/getIsMediaHtmlElement';
import { Icon } from '../../../various/Icon';
import { useFileStateContext } from '../../../../contexts/File';

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
  const hideTimeoutRef = React.useRef<NodeJS.Timeout>();

  const commentsWithTimestamps = React.useMemo(() => {
    if (!commentsData?.comments) return [];

    return commentsData.comments
      .flatMap((comment) => [comment, ...comment.replies])
      .filter((comment) => comment.timestamp?.[0] !== undefined);
  }, [commentsData?.comments]);

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

  const updateSliderPosition = (e: MouseEvent) => {
    if (!sliderRef.current) {
      return;
    }

    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
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
        updateSliderPosition(e);
      }
    };

    const handleMouseUp = () => {
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
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, fileRef, wasPlaying]);

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
    updateSliderPosition(e.nativeEvent);
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

  return (
    <>
      {videoFile.metadata.thumbnailUrl && (
        <div className="absolute -inset-12 pointer-events-none">
          <Image
            src={videoFile.metadata.thumbnailUrl}
            removeWrapper
            radius="none"
            className="absolute inset-0 h-full w-full blur-md invert-[20%] object-cover select-none"
          />
        </div>
      )}
      <div
        className="relative w-auto h-auto max-w-full max-h-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          // @ts-ignore
          ref={compareFile?.id === videoFile.id ? compareFileRef : fileRef}
          controls={false}
          muted={videoFile.id !== activeFile?.id}
          className="relative max-h-full max-w-full h-auto z-10 cursor-pointer"
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
            <div className="flex items-center justify-between gap-2 pl-1 pr-2 pb-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="relative z-10 hover:scale-125 transition-transform"
                  onClick={handleVideoClick}
                >
                  <Icon icon={isPlaying ? 'pause' : 'play'} size={28} />
                </button>
                <span className="text-sm z-10 pointer-events-none select-none">
                  {formatTime(displayTime)} <span className="text-white/80">/ {formatTime(duration)}</span>
                </span>
              </div>
              <button
                type="button"
                className="relative z-10 hover:scale-125 transition-transform"
                onClick={toggleFullscreen}
              >
                <Icon icon="fullscreen" size={20} />
              </button>
            </div>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              ref={sliderRef}
              className="flex items-center gap-2 relative z-20 after:absolute after:-inset-1 after:cursor-pointer"
              onMouseDown={handleSliderMouseDown}
            >
              <div className="flex-1 h-1 bg-white/20 overflow-hidden cursor-pointer relative">
                <div className="h-full bg-white" style={{ width: `${(displayTime / duration) * 100}%` }} />
              </div>
            </div>
            <div className="relative border-white/20 h-6 z-10">
              {commentsWithTimestamps.map((comment) => {
                const position = (comment.timestamp![0] / duration) * 100;
                return (
                  <button
                    key={comment.id}
                    type="button"
                    className={cn(
                      'absolute z-10 overflow-hidden bottom-1.5 flex items-center justify-center bg-white w-3 h-3 rounded-full border border-foreground-400 hover:scale-150 transition-transform',
                      {
                        'z-20 border-blue-400 bg-blue-100 scale-150': comment.id === activeComment?.id,
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
                        className="w-full h-full object-cover select-none"
                        alt={comment.createdBy.name}
                      />
                    ) : (
                      <span className="text-[8px] leading-[9px] select-none text-foreground-500">
                        {comment.createdBy.name?.slice(0, 1)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 -top-1/2 bg-gradient-to-b from-transparent to-black/50" />
          </div>
        )}
      </div>
    </>
  );
};
