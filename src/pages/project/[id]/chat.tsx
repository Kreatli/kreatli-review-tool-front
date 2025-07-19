import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectLayout } from '../../../components/project/Project';
import { ChatProvider } from '../../../contexts/Chat';
import { Chat } from '../../../components/chat/Chat';

export default function ProjectChat() {
  const router = useRouter();

  const projectId = router.query.id as string;

  return (
    <>
      <Head>
        <title>Kreatli | Chat</title>
      </Head>
      <ChatProvider projectId={projectId}>
        <Chat />
      </ChatProvider>
    </>
  );
}

ProjectChat.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
