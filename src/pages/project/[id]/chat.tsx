import Head from 'next/head';
import { useRouter } from 'next/router';

import { Chat } from '../../../components/chat/Chat';
import { ProjectLayout } from '../../../components/project/Project';
import { ChatProvider } from '../../../contexts/Chat';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ProjectChat.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
