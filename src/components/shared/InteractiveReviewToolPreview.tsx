import { Avatar, Button, Card, CardBody, cn, Textarea } from '@heroui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useSoftGate } from '../../hooks/useSoftGate';
import { ReviewTool } from '../../typings/reviewTool';
import { ReviewToolCanvas } from '../home/Features/ReviewToolCanvas';
import { ReviewToolComment } from '../home/Features/ReviewToolComment';
import { Icon } from '../various/Icon';

/**
 * Enhanced ReviewToolPreview with file upload functionality
 * Allows users to upload their own video/image files, draw on them, and leave comments
 */
export const InteractiveReviewToolPreview = () => {
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [newComment, setNewComment] = useState('');
  const [shapes, setShapes] = useState<ReviewTool.Shape[]>([]);
  const [hasNewCommentShapes, setHasNewCommentShapes] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState('interview_v2.mp4');
  const [fileType, setFileType] = useState<'video' | 'image' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetTool = useCallback(() => {
    setShapes([]);
    setHasNewCommentShapes(false);
    setComment('');
    setNewComment('');
    setIsDragging(false);
    setFileName('interview_v2.mp4');
    setFileType(null);
    setFileUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    // Allow selecting the same file again after reset
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const { triggerSoftGate } = useSoftGate({
    enabled: router.pathname !== '/',
    onReset: resetTool,
  });

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, [fileUrl]);

  const processFile = (file: File) => {
    // Check if it's a video or image (gating applies to both types)
    if (file.type.startsWith('video/') || file.type.startsWith('image/')) {
      // Clean up previous URL if exists
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }

      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      // Store file type for proper rendering
      setFileType(file.type.startsWith('image/') ? 'image' : 'video');
      // Clear previous annotations when new file is uploaded
      setShapes([]);
      setComment('');
      setNewComment('');

      // Soft gate: once user uploads media, prompt sign up (everywhere except homepage).
      triggerSoftGate();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set isDragging to false if we're leaving the drop zone entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      processFile(file);
    }
  };

  const handleSendComment = () => {
    // Don't send empty comments
    if (comment.trim() === '') {
      return;
    }

    // Soft gate: prevent using the tool until sign up (everywhere except homepage).
    // If gating triggers, do not post the comment locally.
    if (triggerSoftGate()) {
      return;
    }

    // Save the comment and clear the input
    setNewComment(comment);
    setComment('');
    // Store whether this comment has drawings
    setHasNewCommentShapes(shapes.length > 0);
    // Clear shapes for next annotation
    setShapes([]);
  };

  return (
    <Card
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn('transition-all', isDragging && 'ring-2 ring-primary ring-offset-2')}
    >
      <CardBody className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" />
            </div>
            <div>
              <div className="text-lg font-semibold">{fileName}</div>
              <div className="text-sm text-foreground-500">Vision review - Interviews</div>
            </div>
          </div>
          <Button
            size="sm"
            variant="bordered"
            startContent={<Icon icon="upload" size={16} />}
            onClick={handleUploadClick}
          >
            Upload File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_200px]">
          <div className="flex flex-col gap-2">
            {!fileUrl ? (
              <div
                className={cn(
                  'relative aspect-video overflow-hidden rounded-lg border-2 border-dashed transition-all',
                  isDragging ? 'border-primary bg-primary/10' : 'border-foreground-200 bg-foreground-50',
                )}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                  <Icon
                    icon="upload"
                    size={48}
                    className={cn('transition-colors', isDragging ? 'text-primary' : 'text-foreground-400')}
                  />
                  <div className="text-center">
                    <p className={cn('mb-2 text-base font-semibold transition-colors', isDragging && 'text-primary')}>
                      {isDragging ? 'Drop your file here' : 'Upload a video or image to get started'}
                    </p>
                    <p className="mb-4 text-sm text-foreground-500">
                      {isDragging ? 'Release to upload' : 'Drag and drop a file here, or click the button below'}
                    </p>
                    {!isDragging && (
                      <Button
                        size="md"
                        variant="bordered"
                        startContent={<Icon icon="upload" size={16} />}
                        onClick={handleUploadClick}
                      >
                        Choose File
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <ReviewToolCanvas
                shapes={shapes}
                onShapesChange={setShapes}
                customVideoUrl={fileUrl}
                fileType={fileType}
              />
            )}
            <div className="relative">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
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
              />
              <div className="flex justify-end">
                <Button
                  size="sm"
                  className="absolute bottom-1 right-1 bg-foreground text-content1"
                  isIconOnly
                  radius="full"
                  onClick={handleSendComment}
                >
                  <Icon icon="send" size={16} />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-1">
            <div className="border-b border-foreground-200 pb-2 font-semibold">Comments</div>
            <div className="-m-1 flex max-h-full flex-col gap-2 overflow-auto p-1">
              <ReviewToolComment
                user="a042581f4e29026024t"
                userName="Kate L."
                date="Jul 24"
                hasDrawings
                comment="Let's make sure we display QR code in the marked place."
                timestamp="00:07"
              />
              <ReviewToolComment
                user="a042581f4e29026024t"
                userName="Kate L."
                date="Jul 25"
                hasDrawings
                comment="We should probably blur this part."
                timestamp="00:14"
              />
              {(comment.trim() || newComment.trim() || shapes.length > 0 || hasNewCommentShapes) && (
                <ReviewToolComment
                  userName="Guest"
                  hasDrawings={shapes.length > 0 || hasNewCommentShapes}
                  comment={newComment.trim() || comment.trim()}
                  date="now"
                  timestamp="00:14"
                />
              )}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
