import { Button, Card, CardBody, Chip, CircularProgress, Image, Progress } from '@heroui/react';
import { useEffect, useRef,useState } from 'react';

import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';
import { useSession } from '../../../hooks/useSession';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { formatBytes } from '../../../utils/formatBytes';
import { AssetIcon } from '../../asset/AssetIcon';
import { Icon } from '../../various/Icon';

interface UploadItem {
  id: string;
  name: string;
  size: number;
  fileType: string;
  progress: number;
  status: 'uploading' | 'completed' | 'queued';
  thumbnailUrl?: string;
}

const initialUploads: UploadItem[] = [
  {
    id: '1',
    name: 'product_launch_v2.mp4',
    size: 2400000000,
    fileType: 'video/mp4',
    progress: 68,
    status: 'uploading',
  },
  {
    id: '2',
    name: 'hero_image_final.jpg',
    size: 5200000,
    fileType: 'image/jpeg',
    progress: 100,
    status: 'completed',
    thumbnailUrl: 'https://picsum.photos/80/80?random=1',
  },
  {
    id: '3',
    name: 'presentation_deck.pdf',
    size: 12000000,
    fileType: 'application/pdf',
    progress: 35,
    status: 'uploading',
  },
];

export const StorageFeaturePreview = () => {
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();
  const isTouchScreen = useIsTouchScreen();

  // Animation state
  const [isAnimating, setIsAnimating] = useState(true);
  const [uploads, setUploads] = useState<UploadItem[]>(initialUploads);
  const isAnimatingRef = useRef(true);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Keep ref in sync with state
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const handleClick = () => {
    // Stop animation on any click
    setIsAnimating(false);
    if (!isSignedIn) {
      openSignUpModal();
    }
  };

  // Animation sequence
  useEffect(() => {
    if (!isAnimating || isTouchScreen) return;

    const clearAllTimeouts = () => {
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current = [];
    };

    const scheduleAction = (callback: () => void, delay: number) => {
      const timeout = setTimeout(() => {
        if (isAnimatingRef.current) {
          callback();
        }
      }, delay);
      timeoutRefs.current.push(timeout);
    };

    const resetToInitialState = () => {
      setUploads([...initialUploads]);
    };

    const runAnimationSequence = () => {
      // Start with initial state
      resetToInitialState();

      // Step 1: Increase progress of first video file (after 1s)
      scheduleAction(() => {
        setUploads((prev) => {
          const updated = [...prev];
          updated[0] = { ...updated[0], progress: 85 };
          return updated;
        });
      }, 1000);

      // Step 2: Increase progress of PDF file (after 2s)
      scheduleAction(() => {
        setUploads((prev) => {
          const updated = [...prev];
          updated[2] = { ...updated[2], progress: 60 };
          return updated;
        });
      }, 2000);

      // Step 3: Complete the video file (after 3.5s)
      scheduleAction(() => {
        setUploads((prev) => {
          const updated = [...prev];
          updated[0] = { ...updated[0], progress: 100, status: 'completed' };
          return updated;
        });
      }, 3500);

      // Step 4: Replace completed video with a new file (after 4.5s) - keep 3 files
      scheduleAction(() => {
        setUploads((prev) => {
          const updated = [...prev];
          updated[0] = {
            id: '4',
            name: 'brand_guidelines.pdf',
            size: 8500000,
            fileType: 'application/pdf',
            progress: 0,
            status: 'uploading',
          };
          return updated;
        });
      }, 4500);

      // Step 5: Increase progress of new file and PDF (after 5.5s)
      scheduleAction(() => {
        setUploads((prev) => {
          const updated = [...prev];
          updated[0] = { ...updated[0], progress: 25 };
          updated[2] = { ...updated[2], progress: 85 };
          return updated;
        });
      }, 5500);

      // Step 6: Complete the PDF file (after 7s)
      scheduleAction(() => {
        setUploads((prev) => {
          const updated = [...prev];
          updated[2] = { ...updated[2], progress: 100, status: 'completed' };
          return updated;
        });
      }, 7000);

      // Step 7: Replace completed PDF with a new image file (after 8s) - keep 3 files
      scheduleAction(() => {
        setUploads((prev) => {
          const updated = [...prev];
          updated[2] = {
            id: '5',
            name: 'mockup_design.jpg',
            size: 3200000,
            fileType: 'image/jpeg',
            progress: 0,
            status: 'uploading',
            thumbnailUrl: 'https://picsum.photos/80/80?random=4',
          };
          return updated;
        });
      }, 8000);

      // Step 8: Update progress on both uploading files (after 9s)
      scheduleAction(() => {
        setUploads((prev) => {
          const updated = [...prev];
          updated[0] = { ...updated[0], progress: 55 };
          updated[2] = { ...updated[2], progress: 40 };
          return updated;
        });
      }, 9000);

      // Step 9: Complete both files (after 10.5s)
      scheduleAction(() => {
        setUploads((prev) => {
          const updated = [...prev];
          updated[0] = { ...updated[0], progress: 100, status: 'completed' };
          updated[2] = { ...updated[2], progress: 100, status: 'completed' };
          return updated;
        });
      }, 10500);

      // Step 10: Replace first completed file with a new video (after 12s) - keep 3 files
      scheduleAction(() => {
        setUploads((prev) => {
          const updated = [...prev];
          updated[0] = {
            id: '6',
            name: 'tutorial_video.mp4',
            size: 1800000000,
            fileType: 'video/mp4',
            progress: 0,
            status: 'uploading',
          };
          return updated;
        });
      }, 12000);

      // Step 11: Update progress on new video (after 13s)
      scheduleAction(() => {
        setUploads((prev) => {
          const updated = [...prev];
          updated[0] = { ...updated[0], progress: 30 };
          return updated;
        });
      }, 13000);

      // Step 12: Loop back - reset and restart (after 15s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          runAnimationSequence();
        }
      }, 15000);
    };

    // Start animation after a short delay
    const initialTimeout = setTimeout(() => {
      if (isAnimatingRef.current) {
        runAnimationSequence();
      }
    }, 500);
    timeoutRefs.current.push(initialTimeout);

    return () => {
      clearAllTimeouts();
      clearTimeout(initialTimeout);
    };
  }, [isAnimating, isTouchScreen]);

  const getFileTypeLabel = (fileType: string) => {
    if (fileType.startsWith('video')) return 'Video';
    if (fileType.startsWith('image')) return 'Image';
    if (fileType.includes('pdf')) return 'PDF';
    if (fileType.includes('zip') || fileType.includes('archive')) return 'Archive';
    return 'File';
  };

  const renderUploadItem = (upload: UploadItem) => {
    const isImage = upload.fileType.startsWith('image');
    const isCompleted = upload.status === 'completed';

    return (
      <div
        key={upload.id}
        className={`flex items-center gap-3 rounded-lg border p-3 transition-all ${
          isCompleted
            ? 'border-foreground-200 bg-foreground-50 hover:bg-foreground-100'
            : 'border-foreground-200 bg-foreground-50'
        }`}
      >
        {/* Thumbnail/Icon */}
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-foreground-200 bg-foreground-100">
          {isImage && upload.thumbnailUrl ? (
            <Image
              src={upload.thumbnailUrl}
              alt={upload.name}
              className="h-full w-full object-cover"
              removeWrapper
              radius="none"
            />
          ) : (
            <AssetIcon fileType={upload.fileType} size={24} />
          )}
        </div>

        {/* File Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <div className="truncate text-sm font-medium">{upload.name}</div>
          </div>
          <div className="mb-1.5 text-xs text-foreground-500">
            {formatBytes(upload.size)} • {getFileTypeLabel(upload.fileType)}
          </div>
          <Progress
            size="sm"
            value={upload.progress}
            color={isCompleted ? 'success' : 'primary'}
            className="mt-1"
            classNames={{
              indicator: isCompleted ? 'bg-success' : 'bg-primary',
            }}
          />
        </div>

        {/* Progress Indicator */}
        <div className="shrink-0">
          <CircularProgress
            size="sm"
            value={upload.progress}
            color={isCompleted ? 'success' : 'primary'}
            showValueLabel
          />
        </div>
      </div>
    );
  };

  return (
    <Card className="group relative">
      <CardBody className="flex flex-col gap-6 p-6" onClick={handleClick}>
        {/* Header with Security Badge */}
        <div className="flex items-center justify-between border-b border-foreground-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-foreground-100 p-2.5">
              <Icon icon="folder" size={20} />
            </div>
            <div className="flex flex-col">
              <div className="text-base font-semibold">Creative Assets</div>
              <div className="text-sm text-foreground-500">127 items, 45.2GB</div>
            </div>
          </div>
          <Chip
            size="sm"
            variant="flat"
            color="success"
            startContent={<Icon icon="shield" size={14} />}
            className="cursor-pointer transition-colors hover:bg-success-100"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Encrypted
          </Chip>
        </div>

        {/* Upload Area */}
        <div
          className="group/upload cursor-pointer rounded-xl border-2 border-dashed border-foreground-300 bg-gradient-to-br from-foreground-50 to-foreground-100/50 p-8 transition-all duration-300 hover:border-primary hover:from-primary-50/30 hover:to-primary-100/20"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-primary/10 p-4 transition-colors group-hover/upload:bg-primary/20">
              <Icon icon="upload" size={28} className="text-primary" />
            </div>
            <div>
              <div className="mb-1.5 text-base font-semibold">Drag & drop files here</div>
              <div className="text-sm text-foreground-500">or click to browse • Supports files up to 10GB</div>
            </div>
            <Button
              size="md"
              className="bg-foreground text-content1"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              <Icon icon="upload" size={16} />
              Upload Files
            </Button>
          </div>
        </div>

        {/* Uploads List */}
        {uploads.length > 0 && <div className="flex flex-col gap-2.5">{uploads.map(renderUploadItem)}</div>}
      </CardBody>
    </Card>
  );
};
