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
        <div className="no-scrollbar z-10 flex max-w-full gap-2 overflow-auto p-4">
          {buttons.map(({ url, index, isActive, commentsCount }) => (
            <Badge
              key={url}
              color="default"
              content={commentsCount}
              className={cn('text-[10px] leading-4', {
                'bg-black text-white': isActive,
              })}
              isInvisible={commentsCount === 0}
            >
              <button
                type="button"
                ref={isActive ? activeButtonRef : undefined}
                className={cn(
                  'size-12 shrink-0 scroll-mx-2 rounded-medium shadow-medium outline outline-1 outline-offset-2 outline-white transition-all',
                  {
                    'outline-black': isActive,
                  },
                )}
                onClick={() => setActivePage(index)}
              >
                <span
                  className={cn('flex size-full opacity-35 transition-opacity', {
                    'opacity-100': isActive,
                  })}
                >
                  <Image removeWrapper src={url} alt="" className="size-full object-contain" />
                </span>
                {/* {commentsCount > 0 && <Chip>ff</Chip>} */}
              </button>
            </Badge>
          ))}
        </div>
      )}
    </>
  );
};
