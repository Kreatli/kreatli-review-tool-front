import React, { useEffect, useRef } from 'react';

import { useGetAssetFileId, useGetProjectId } from '../../services/hooks';
import { AssetCommentDto, FileDto, ProjectDto } from '../../services/types';
import { useRouter } from 'next/router';

interface Context {
  activeFile: FileDto | undefined;
  project: ProjectDto | undefined;
  file: FileDto | undefined;
  isLoading: boolean;
  replyingComment: AssetCommentDto | null;
  activeComment: AssetCommentDto | null;
  commentsRef: React.RefObject<HTMLDivElement>;
  isCompareMode: boolean;
  compareFile: FileDto | undefined;
  setActiveFileId: (id: string) => void;
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
  compareFileId?: string | null;
}

export const FileContextProvider = ({ children, projectId, fileId, compareFileId }: React.PropsWithChildren<Props>) => {
  const { data: file, isPending: isAssetLoading, error } = useGetAssetFileId(fileId);
  const { data: compareFile, isLoading: isCompareAssetLoading } = useGetAssetFileId(compareFileId ?? '', {
    enabled: !!compareFileId,
  });
  const { data: project, isPending: isProjectLoading } = useGetProjectId(projectId);

  const commentsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [activeFileId, setActiveFileId] = React.useState(fileId);
  const [activeComment, setActiveComment] = React.useState<AssetCommentDto | null>(null);
  const [replyingComment, setReplyingComment] = React.useState<AssetCommentDto | null>(null);

  const isLoading = isAssetLoading || isProjectLoading || isCompareAssetLoading;

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
        activeFile: compareFile?.id === activeFileId ? compareFile : file,
        activeComment,
        replyingComment,
        file,
        compareFile,
        project,
        isLoading,
        commentsRef,
        isCompareMode: !!compareFile,
        setActiveComment,
        setReplyingComment,
        setActiveFileId,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
