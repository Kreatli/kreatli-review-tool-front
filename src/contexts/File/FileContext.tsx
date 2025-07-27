import React, { useEffect, useRef } from 'react';

import { useGetAssetFileId, useGetProjectId } from '../../services/hooks';
import { AssetCommentDto, FileDto, ProjectDto } from '../../services/types';
import { useRouter } from 'next/router';

interface Context {
  project: ProjectDto | undefined;
  file: FileDto | undefined;
  isLoading: boolean;
  replyingComment: AssetCommentDto | null;
  activeComment: AssetCommentDto | null;
  commentsRef: React.RefObject<HTMLDivElement>;
  setActiveComment: (comment: AssetCommentDto | null) => void;
  setReplyingComment: (comment: AssetCommentDto | null) => void;
}

const FileContext = React.createContext<Context | null>(null);

export const useFileContext = () => {
  const context = React.useContext(FileContext);

  if (!context) {
    throw new Error('useFileContext must be used within a FileContextProvider');
  }

  return context;
};

interface Props {
  projectId: string;
  fileId: string;
}

export const FileContextProvider = ({ children, projectId, fileId }: React.PropsWithChildren<Props>) => {
  const { data: file, isPending: isAssetLoading, error } = useGetAssetFileId(fileId);
  const { data: project, isPending: isProjectLoading } = useGetProjectId(projectId);

  const commentsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [activeComment, setActiveComment] = React.useState<AssetCommentDto | null>(null);
  const [replyingComment, setReplyingComment] = React.useState<AssetCommentDto | null>(null);

  const isLoading = isAssetLoading || isProjectLoading;

  useEffect(() => {
    if (error && 'status' in error && error.status === 404) {
      router.push('/404');
    }
  }, []);

  if (error && 'status' in error && error.status === 404) {
    return null;
  }

  return (
    <FileContext.Provider
      value={{
        activeComment,
        replyingComment,
        file,
        project,
        isLoading,
        commentsRef,
        setActiveComment,
        setReplyingComment,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
