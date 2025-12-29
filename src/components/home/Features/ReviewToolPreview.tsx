import { Avatar, Button, Card, CardBody, Textarea } from '@heroui/react';
import { Icon } from '../../various/Icon';
import { ReviewToolComment } from './ReviewToolComment';
import { useState } from 'react';

import { ReviewToolCanvas } from './ReviewToolCanvas';
import { ReviewTool } from '../../../typings/reviewTool';
import { useSignUpModalVisibility } from '../../../hooks/useSignUpModalVisibility';
import { useSession } from '../../../hooks/useSession';

export const ReviewToolPreview = () => {
  const [comment, setComment] = useState('');
  const [newComment, setNewComment] = useState('');
  const [shapes, setShapes] = useState<ReviewTool.Shape[]>([]);
  const [hasNewCommentShapes, setHasNewCommentShapes] = useState(false);

  const { openSignUpModal } = useSignUpModalVisibility();
  const { isSignedIn } = useSession();

  const handleSendComment = () => {
    if (newComment) {
      if (!isSignedIn) {
        openSignUpModal();
      }
      return;
    }

    if (comment.trim() === '') {
      return;
    }

    setNewComment(comment);
    setComment('');
    setShapes([]);
    setHasNewCommentShapes(shapes.length > 0);
  };

  return (
    <Card>
      <CardBody className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div>
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024f" />
          </div>
          <div>
            <div className="text-lg font-semibold">interview_v2.mp4</div>
            <div className="text-sm text-foreground-500">Vision review - Interviews</div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_200px]">
          <div className="flex flex-col gap-2">
            <ReviewToolCanvas shapes={shapes} onShapesChange={setShapes} />
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
