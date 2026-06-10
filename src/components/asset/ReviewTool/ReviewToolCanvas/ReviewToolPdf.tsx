import { Badge, cn, Image } from '@heroui/react';
import React, { useEffect, useMemo, useRef } from 'react';

import { useFileStateContext } from '../../../../contexts/File';
import { useReviewToolContext } from '../../../../contexts/ReviewTool';
import { useGetAssetFileIdComments } from '../../../../services/hooks';
import { FileDto } from '../../../../services/types';

interface Props {
  file: FileDto;
  shareableLinkId?: string;
  onLoad: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

export const ReviewToolPdf = ({ file, shareableLinkId, onLoad }: Props) => {
  const { fileRef, compareFileRef } = useReviewToolContext();
  const { compareFile, activePage, setActivePage } = useFileStateContext();

  const { data: commentsData } = useGetAssetFileIdComments(
    file.id,
    { shareableLinkId: shareableLinkId ?? '' },
    { refetchOnMount: false },
  );

  const activeButtonRef = useRef<HTMLButtonElement>(null);

  const pages = useMemo(() => (file.metadata.pages ?? []) as string[], [file.metadata.pages]);
  const activePageIndex = Math.min(activePage, pages.length - 1);
  const activePageUrl = pages[activePageIndex];
  const imageUrl = activePageUrl ?? file.metadata.thumbnailUrl ?? file.url;

  useEffect(() => {
    activeButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activePageIndex]);

  const buttons = useMemo(() => {
    return pages.map((page, index) => ({
      url: page,
      index,
      isActive: activePageIndex === index,
      commentsCount: commentsData?.comments?.filter((comment) => comment.page === index).length ?? 0,
    }));
  }, [pages, activePageIndex, commentsData]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      setActivePage(activePageIndex - 1);
    } else if (event.key === 'ArrowRight') {
      setActivePage(activePageIndex + 1);
    }
  };

  return (
    <>
      <div className="absolute -inset-12">
        <Image
          src={imageUrl}
          removeWrapper
          radius="none"
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full select-none blur-xl grayscale"
        />
      </div>
      <Image
        src={imageUrl}
        // @ts-expect-error - Image element is not typed
        ref={compareFile?.id === file.id ? compareFileRef : fileRef}
        radius="none"
        shadow="lg"
        classNames={{ wrapper: 'max-h-full max-w-full h-auto overflow-hidden' }}
        className="pointer-events-none h-full select-none"
        alt={file.name}
        onLoad={onLoad}
      />
      {buttons.length && (
        <div
          className="no-scrollbar relative z-10 flex max-w-full shrink-0 gap-2 overflow-auto p-4"
          onKeyDown={handleKeyDown}
        >
          {buttons.map(({ url, index, isActive, commentsCount }) => (
            <Badge
              key={url}
              color="default"
              content={commentsCount}
              isInvisible={commentsCount === 0}
              className={cn('py-0.5 text-[10px] leading-4', {
                'bg-black text-white': isActive,
              })}
            >
              <button
                type="button"
                ref={isActive ? activeButtonRef : undefined}
                className={cn(
                  'relative flex w-12 shrink-0 scroll-mx-2 flex-col gap-0.5 overflow-hidden rounded-medium bg-foreground-100 shadow-medium outline outline-1 outline-offset-2 outline-white transition-all dark:shadow-none dark:outline-foreground-600',
                  {
                    'outline-black dark:outline-black': isActive,
                  },
                )}
                onClick={() => setActivePage(index)}
              >
                <span
                  className={cn('flex h-12 w-full opacity-50 transition-opacity', {
                    'opacity-100': isActive,
                  })}
                >
                  <Image removeWrapper src={url} alt="" className="size-full object-contain" />
                </span>
                <span className={cn('text-[10px] font-bold', { 'font-medium text-foreground-500': !isActive })}>
                  {index + 1}
                </span>
              </button>
            </Badge>
          ))}
        </div>
      )}
    </>
  );
};
