import { Tab, Tabs } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import { useFileStateContext } from '../../../contexts/File';
import { useGetAssetFileIdComments } from '../../../services/hooks';
import { getAssetFileIdComments } from '../../../services/services';
import { AssetCommentsResponse, ProjectDto } from '../../../services/types';
import { AssetComment } from './AssetComment';
import { AssetCommentsEmptyState } from './AssetCommentsEmptyState';
import { AssetCommentsLoading } from './AssetCommentsLoading';

type CommentsStatus = 'all' | 'unresolved' | 'resolved';

interface Props {
  fileId: string;
  project?: ProjectDto;
  shareableLinkId?: string;
}

export const AssetComments = ({ fileId, project, shareableLinkId }: Props) => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const { setActiveComment } = useFileStateContext();
  const { data, isPending, isError } = useGetAssetFileIdComments(fileId, { shareableLinkId: shareableLinkId ?? '' });
  const [commentsStatus, setCommentsStatus] = useState<CommentsStatus>('unresolved');

  const commentIdFromUrl = searchParams.get('commentId');
  const { comments = [] } = data ?? {};

  const commentsToShow = React.useMemo(() => {
    if (commentsStatus === 'all') {
      return comments;
    }

    if (commentsStatus === 'resolved') {
      return comments.filter(({ isResolved }) => isResolved);
    }

    return comments.filter(({ isResolved }) => !isResolved);
  }, [commentsStatus, comments]);

  React.useEffect(() => {
    if (commentIdFromUrl) {
      const comment = comments.find((comment) => comment.id === commentIdFromUrl);

      if (comment) {
        setCommentsStatus(comment.isResolved ? 'resolved' : 'unresolved');
        setActiveComment(comment);
      }
    }
  }, [commentIdFromUrl, comments]);

  if (isPending) {
    return <AssetCommentsLoading />;
  }

  if (isError) {
    return 'Something went wrong';
  }

  const unresolvedCommentsCount = comments.reduce((acc, comment) => acc + (comment.isResolved ? 0 : 1), 0);

  const handleRemove = (commentId: string) => () => {
    queryClient.setQueriesData<AssetCommentsResponse>(
      { queryKey: [getAssetFileIdComments.key, fileId] },
      (cacheData) => ({
        comments: (cacheData?.comments ?? []).filter((comment) => comment.id !== commentId),
      }),
    );

    queryClient.invalidateQueries({ queryKey: [getAssetFileIdComments.key, fileId] });
  };

  const handleUpdate = () => {
    queryClient.invalidateQueries({ queryKey: [getAssetFileIdComments.key, fileId] });
  };

  const handleTabsChange = (newStatus: React.Key) => {
    setCommentsStatus(newStatus as CommentsStatus);
  };

  return (
    <div className="flex flex-col gap-2 p-3 pb-9 pt-0">
      <div className="text-medium">
        <span className="font-semibold">
          {comments.length} comment{comments.length === 1 ? '' : 's'}
        </span>
      </div>
      <Tabs size="sm" selectedKey={commentsStatus} onSelectionChange={handleTabsChange}>
        <Tab key="unresolved" title={`Unresolved (${unresolvedCommentsCount})`} />
        <Tab key="resolved" title={`Resolved (${comments.length - unresolvedCommentsCount})`} />
        <Tab key="all" title={`All (${comments.length})`} />
      </Tabs>
      <div className="flex flex-col gap-2">
        {commentsToShow.length === 0 && <AssetCommentsEmptyState />}
        {commentsToShow.map((comment) => (
          <div key={comment.id}>
            <AssetComment
              project={project}
              fileId={fileId}
              comment={comment}
              onUpdate={handleUpdate}
              onRemove={handleRemove(comment.id)}
            />
            {comment.replies.length > 0 && (
              <div className="flex flex-col gap-2 pl-6 pt-2">
                {comment.replies.map((reply) => (
                  <AssetComment
                    key={reply.id}
                    fileId={fileId}
                    project={project}
                    comment={reply}
                    isResolvable={false}
                    isResolved={comment.isResolved}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove(reply.id)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
