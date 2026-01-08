import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import { useSession } from '../../hooks/useSession';
import { useGetProjectId } from '../../services/hooks';
import { ProjectDto } from '../../services/types';

interface Context {
  project: ProjectDto;
  isUserProjectOwner: boolean;
  webSocketRef: React.RefObject<Socket | null>;
  selectedConversationId: string | null;
  setSelectedConversationId: (conversation: string | null) => void;
}

export const ChatContext = React.createContext<null | Context>(null);

export const useChatContext = () => {
  const context = React.useContext(ChatContext);

  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }

  return context;
};

interface Props {
  projectId: string;
  children: React.ReactNode;
}

export const ChatProvider = ({ projectId, children }: Props) => {
  const router = useRouter();

  const [selectedConversationId, setSelectedConversationId] = React.useState<string | null>(
    (router.query.conversationId as string | undefined) ?? null,
  );
  const webSocketRef = React.useRef<Socket | null>(null);

  const { user } = useSession();
  const { data: project } = useGetProjectId(projectId, { refetchOnMount: false });

  useEffect(() => {
    if (!user) {
      return;
    }

    webSocketRef.current = io(`${process.env.API_URL}/chat`, {
      path: '/socket.io',
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        userId: user.id,
      },
    });

    return () => {
      webSocketRef.current?.disconnect();
    };
  }, [user]);

  if (!project) {
    return null;
  }

  const isUserProjectOwner = project.members.find((member) => member.user?.id === user?.id)?.role === 'owner';

  return (
    <ChatContext.Provider
      value={{ project, isUserProjectOwner, selectedConversationId, webSocketRef, setSelectedConversationId }}
    >
      {children}
    </ChatContext.Provider>
  );
};
