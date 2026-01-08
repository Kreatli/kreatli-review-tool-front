import React, { useRef } from 'react';

import { AssetCommentDto, FileDto } from '../../services/types';

interface Context {
  file: FileDto | undefined;
  activeFile: FileDto | undefined;
  activeComment: AssetCommentDto | null;
  replyingComment: AssetCommentDto | null;
  commentsRef: React.RefObject<HTMLDivElement | null>;
  isCompareMode: boolean;
  compareFile: FileDto | undefined;
  setActiveFileId: (id: string) => void;
  setActiveComment: (comment: AssetCommentDto | null) => void;
  setReplyingComment: (comment: AssetCommentDto | null) => void;
}

const FileStateContext = React.createContext<Context | null>(null);

export const useFileStateContext = () => {
  const context = React.useContext(FileStateContext);

  if (!context) {
    throw new Error('useFileStateContext must be used within a FileStateContextProvider');
  }

  return context;
};

interface Props {
  fileId: string;
  file: FileDto | undefined;
  compareFile?: FileDto;
}

export const FileStateContextProvider = ({ children, fileId, file, compareFile }: React.PropsWithChildren<Props>) => {
  const commentsRef = useRef<HTMLDivElement>(null);

  const [activeFileId, setActiveFileId] = React.useState(fileId);
  const [activeComment, setActiveComment] = React.useState<AssetCommentDto | null>(null);
  const [replyingComment, setReplyingComment] = React.useState<AssetCommentDto | null>(null);

  return (
    <FileStateContext.Provider
      value={{
        file,
        activeFile: compareFile?.id === activeFileId ? compareFile : file,
        compareFile,
        isCompareMode: !!compareFile,
        activeComment,
        replyingComment,
        commentsRef,
        setActiveComment,
        setReplyingComment,
        setActiveFileId,
      }}
    >
      {children}
    </FileStateContext.Provider>
  );
};
