import { addToast, Chip } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

import { useSession } from '../../../hooks/useSession';
import { useGetTaskIdComments, usePostTaskIdComment } from '../../../services/hooks';
import { getTaskIdComments } from '../../../services/services';
import { TaskCommentsResponse } from '../../../services/types';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { TaskComment } from './TaskComment';
import { TaskCommentsEditor } from './TaskCommentsEditor';

interface Props {
  projectId: string;
  taskId: string;
}

export const TaskComments = ({ projectId, taskId }: Props) => {
  const queryClient = useQueryClient();
  const { user } = useSession();

  const { data } = useGetTaskIdComments(taskId);
  const { mutate: createComment, isPending: isCreatingComment } = usePostTaskIdComment();

  const handleSubmitComment = (content: Record<string, unknown>) => {
    const commentPlaceholder = {
      id: `placeholder-${nanoid()}`,
      content,
      createdAt: new Date().toString(),
      createdBy: user,
      isResolved: false,
      replies: [],
    };

    queryClient.setQueryData<TaskCommentsResponse>([getTaskIdComments.key, taskId], (data) => {
      const dataComments = data?.comments ?? [];

      return {
        comments: [commentPlaceholder, ...dataComments],
      };
    });

    createComment(
      { id: taskId, requestBody: { content } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getTaskIdComments.key, taskId] });
        },
        onError: (error) => {
          addToast({ title: getErrorMessage(error), color: 'danger', variant: 'flat' });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 pl-3 font-semibold">
        Comments
        <Chip size="sm" variant="flat" classNames={{ content: 'font-semibold' }}>
          {data?.comments.length ?? 0}
        </Chip>
      </div>
      <div className="flex flex-col gap-4">
        <TaskCommentsEditor projectId={projectId} isLoading={isCreatingComment} onSubmit={handleSubmitComment} />
        {data?.comments && data.comments.length > 0 && (
          <div className="flex flex-col gap-4">
            {data.comments.map((comment) => (
              <TaskComment
                key={comment.id}
                id={comment.id}
                projectId={projectId}
                taskId={taskId}
                content={comment.content}
                createdAt={comment.createdAt}
                user={comment.createdBy}
                replies={comment.replies}
                parentCommentId={comment.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
