import { Avatar, Button, Card, CardBody, cn, Textarea } from '@heroui/react';
import { useEffect, useRef, useState } from 'react';

import { useIsTouchScreen } from '../../../hooks/useIsTouchScreen';
import { useSession } from '../../../hooks/useSession';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { Icon } from '../../various/Icon';
import { ReviewToolComment } from './ReviewToolComment';

export type CompareFeaturePreviewVariant = 'video' | 'pdf';

interface CompareFeaturePreviewProps {
  /** When "pdf", shows PDF comparison (filenames, sizes, document-style preview, PDF-focused comments). Default "video". */
  variant?: CompareFeaturePreviewVariant;
}

export const CompareFeaturePreview = ({ variant = 'video' }: CompareFeaturePreviewProps) => {
  const isPdf = variant === 'pdf';
  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();
  const isTouchScreen = useIsTouchScreen();

  const [activeFile, setActiveFile] = useState<'left' | 'right'>('left');
  const [comment, setComment] = useState('');
  const [leftNewComment, setLeftNewComment] = useState('');
  const [rightNewComment, setRightNewComment] = useState('');

  // Animation state
  const [isAnimating, setIsAnimating] = useState(true);
  const isAnimatingRef = useRef(true);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Keep ref in sync with state
  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  const handleFileClick = (side: 'left' | 'right') => {
    setIsAnimating(false);
    setActiveFile(side);
  };

  const handleSendComment = () => {
    setIsAnimating(false);
    if (activeFile === 'left') {
      if (leftNewComment) {
        if (!isSignedIn) {
          openSignUpModal();
        }
        return;
      }

      if (comment.trim() === '') {
        return;
      }

      setLeftNewComment(comment);
      setComment('');
    } else {
      if (rightNewComment) {
        if (!isSignedIn) {
          openSignUpModal();
        }
        return;
      }

      if (comment.trim() === '') {
        return;
      }

      setRightNewComment(comment);
      setComment('');
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

    const typeText = (text: string, targetSetter: (value: string) => void, delay: number, charDelay: number = 50) => {
      let index = 0;
      const typeChar = () => {
        if (index < text.length && isAnimatingRef.current) {
          targetSetter(text.substring(0, index + 1));
          index++;
          const timeout = setTimeout(typeChar, charDelay);
          timeoutRefs.current.push(timeout);
        }
      };
      scheduleAction(typeChar, delay);
    };

    const resetToInitialState = () => {
      setActiveFile('left');
      setComment('');
      setLeftNewComment('');
      setRightNewComment('');
    };

    const runAnimationSequence = () => {
      const rightComment1 = isPdf ? 'Great improvements on the revised copy!' : 'Great improvements on the transitions!';
      const leftComment1 = isPdf ? 'The layout on page 2 looks good.' : 'The color grading is perfect here.';
      const rightComment2 = isPdf ? 'Can we tweak the wording on page 4?' : 'Can we adjust the timing slightly?';
      const leftComment2 = 'This version is ready for approval.';

      // Start with initial state
      resetToInitialState();

      // Step 1: Switch to right file (after 1.5s)
      scheduleAction(() => {
        setActiveFile('right');
      }, 1500);

      // Step 2: Type a comment for right file (after 3s)
      typeText(rightComment1, setComment, 3000, 40);

      // Step 3: Send the comment (after 6.5s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          setRightNewComment(rightComment1);
          setComment('');
        }
      }, 6500);

      // Step 4: Switch to left file (after 8s)
      scheduleAction(() => {
        setActiveFile('left');
      }, 8000);

      // Step 5: Type a comment for left file (after 9.5s)
      typeText(leftComment1, setComment, 9500, 40);

      // Step 6: Send the comment (after 13s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          setLeftNewComment(leftComment1);
          setComment('');
        }
      }, 13000);

      // Step 7: Switch back to right file (after 14.5s)
      scheduleAction(() => {
        setActiveFile('right');
      }, 14500);

      // Step 8: Type another comment for right file (after 16s)
      typeText(rightComment2, setComment, 16000, 40);

      // Step 9: Clear comment without sending (after 19.5s)
      scheduleAction(() => {
        setComment('');
      }, 19500);

      // Step 10: Switch to left file again (after 21s)
      scheduleAction(() => {
        setActiveFile('left');
      }, 21000);

      // Step 11: Type a final comment (after 22.5s)
      typeText(leftComment2, setComment, 22500, 40);

      // Step 12: Send the comment (after 26s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          setLeftNewComment(leftComment2);
          setComment('');
        }
      }, 26000);

      // Step 13: Loop back - reset and restart (after 28s)
      scheduleAction(() => {
        if (isAnimatingRef.current) {
          runAnimationSequence();
        }
      }, 28000);
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
  }, [isAnimating, isTouchScreen, isPdf]);

  return (
    <Card>
      <CardBody
        className="flex flex-col gap-2"
        onClick={() => {
          setIsAnimating(false);
        }}
      >
        <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr_240px]">
          {/* Left Column */}
          <div className="flex flex-col gap-2">
            {/* File Header */}
            <div
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg p-3 transition-colors',
                activeFile === 'left' ? 'bg-primary-100' : 'bg-foreground-50',
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleFileClick('left');
              }}
            >
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
              <div className="flex-1 overflow-hidden">
                <div className={cn('truncate font-semibold', { 'text-primary': activeFile === 'left' })}>
                  {isPdf ? 'proposal_draft.pdf' : 'walkthrough_v2.mp4'}
                </div>
                <div className="text-sm text-foreground-500">{isPdf ? '2.1 MB' : '278 MB'}</div>
              </div>
            </div>
            {/* Preview */}
            <div
              className={cn(
                'relative max-h-64 cursor-pointer overflow-hidden rounded-lg border-2 bg-foreground-100 transition-colors',
                isPdf ? 'aspect-[3/4]' : 'aspect-video',
                activeFile === 'left' ? 'border-primary' : 'border-transparent',
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleFileClick('left');
              }}
            >
              <img
                src={isPdf ? 'https://picsum.photos/400/533?random=doc1' : 'https://picsum.photos/600/400?random=1'}
                alt={isPdf ? 'PDF draft preview - proposal_draft.pdf' : 'Video file version 2 preview - walkthrough_v2.mp4'}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-2">
            {/* File Header */}
            <div
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg p-3 transition-colors',
                activeFile === 'right' ? 'bg-primary-100' : 'bg-foreground-50',
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleFileClick('right');
              }}
            >
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" size="sm" />
              <div className="flex-1 overflow-hidden">
                <div className={cn('truncate font-semibold', { 'text-primary': activeFile === 'right' })}>
                  {isPdf ? 'proposal_revised.pdf' : 'walkthrough_v3.mp4'}
                </div>
                <div className="text-sm text-foreground-500">{isPdf ? '2.3 MB' : '285 MB'}</div>
              </div>
            </div>
            {/* Preview */}
            <div
              className={cn(
                'relative max-h-64 cursor-pointer overflow-hidden rounded-lg border-2 bg-foreground-100 transition-colors',
                isPdf ? 'aspect-[3/4]' : 'aspect-video',
                activeFile === 'right' ? 'border-primary' : 'border-transparent',
              )}
              onClick={(e) => {
                e.stopPropagation();
                handleFileClick('right');
              }}
            >
              <img
                src={isPdf ? 'https://picsum.photos/400/533?random=doc2' : 'https://picsum.photos/600/400?random=2'}
                alt={isPdf ? 'PDF revised preview - proposal_revised.pdf' : 'Video file version 3 preview - walkthrough_v3.mp4'}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Comment Section - Right Side */}
          <div className="flex min-h-0 flex-col gap-2 p-1">
            <div className="border-b border-foreground-200 pb-2 font-semibold">Comments</div>
            <div className="-m-1 flex flex-col gap-2 overflow-auto p-1">
              {activeFile === 'left' ? (
                <>
                  <ReviewToolComment
                    user="a042581f4e29026024t"
                    userName="Kate L."
                    date="Jul 24"
                    comment={
                      isPdf
                        ? 'The wording on page 3 is clearer in this version.'
                        : 'The color grading looks better in this version.'
                    }
                    timestamp={isPdf ? 'p. 3' : '00:05'}
                  />
                  {leftNewComment.trim() && (
                    <ReviewToolComment
                      userName="Guest"
                      comment={leftNewComment.trim()}
                      date="now"
                      timestamp={isPdf ? 'p. 2' : '00:10'}
                    />
                  )}
                </>
              ) : (
                <>
                  <ReviewToolComment
                    user="a042581f4e29026024d"
                    userName="Peter R."
                    date="Jul 25"
                    comment={
                      isPdf
                        ? 'The revised layout on page 2 works well.'
                        : 'This version has better transitions.'
                    }
                    timestamp={isPdf ? 'p. 2' : '00:08'}
                  />
                  {rightNewComment.trim() && (
                    <ReviewToolComment
                      userName="Guest"
                      comment={rightNewComment.trim()}
                      date="now"
                      timestamp={isPdf ? 'p. 4' : '00:12'}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          {/* Shared Comment Input - Spans left and right columns, aligns with comment section */}
          <div className="relative md:col-span-2">
            <Textarea
              value={comment}
              onChange={(e) => {
                setIsAnimating(false);
                setComment(e.target.value);
              }}
              placeholder="Leave your comment here..."
              minRows={2}
              rows={2}
              maxLength={100}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendComment();
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                setIsAnimating(false);
              }}
            />
            <div className="flex justify-end">
              <Button
                size="sm"
                className="absolute bottom-1 right-1 bg-foreground text-content1"
                isIconOnly
                radius="full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendComment();
                }}
              >
                <Icon icon="send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
