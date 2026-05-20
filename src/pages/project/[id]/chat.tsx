import { Button } from '@heroui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Chat } from '../../../components/chat/Chat';
import { ProjectLayout } from '../../../components/project/Project';
import { Icon } from '../../../components/various/Icon';
import { ChatProvider } from '../../../contexts/Chat';
import { usePlansModalVisibility } from '../../../hooks/usePlansModalVisibility';
import { useSession } from '../../../hooks/useSession';
import { isExploreMode } from '../../../utils/exploreMode';

export default function ProjectChat() {
  const router = useRouter();
  const { user } = useSession();
  const setIsPlansModalVisible = usePlansModalVisibility((state) => state.setIsVisible);

  const projectId = router.query.id as string;
  const exploreMode = isExploreMode(user);

  return (
    <>
      <Head>
        <title>Kreatli | Chat</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="relative flex flex-1 flex-col">
        {/* Chat UI — non-interactive in explore mode */}
        <div className={exploreMode ? 'pointer-events-none select-none' : ''}>
          <ChatProvider key={projectId} projectId={projectId}>
            <Chat />
          </ChatProvider>
        </div>

        {/* Frosted-glass upgrade overlay for explore-mode users */}
        {exploreMode && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="mx-4 flex max-w-sm flex-col items-center gap-3 rounded-2xl border border-foreground-200 bg-content1/90 p-8 text-center shadow-lg">
              <div className="flex size-12 items-center justify-center rounded-full bg-foreground-100">
                <Icon icon="chat" size={22} />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Available on paid plans</p>
                <p className="mt-1 text-sm text-foreground-500">
                  Chat is available during your free trial and on all paid plans. Collaborate with your team directly
                  inside your project.
                </p>
              </div>
              <Button
                className="bg-foreground text-content1"
                onClick={() => setIsPlansModalVisible(true, 'explore_mode_chat')}
              >
                {user?.subscription.hasUsedTrial ? 'Upgrade to a plan' : 'Start free trial'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
ProjectChat.getLayout = (page: any) => <ProjectLayout>{page}</ProjectLayout>;
