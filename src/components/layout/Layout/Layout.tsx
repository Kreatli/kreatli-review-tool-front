import { plugin as engagementPlugin } from '@amplitude/engagement-browser';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { usePlansModalVisibility } from '../../../hooks/usePlansModalVisibility';
import { useSession } from '../../../hooks/useSession';
import { PlansModal } from '../../account/PlansModal';
import { DeliverableModal } from '../../deliverables/Deliverable/DeliverableModal';
import { TaskModal } from '../../tasks/Task';
import { AppLoader } from '../AppLoader';

export const Layout = ({ children }: React.PropsWithChildren) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { isSignedIn, user } = useSession();
  const isVisible = usePlansModalVisibility((state) => state.isVisible);
  const setIsVisible = usePlansModalVisibility((state) => state.setIsVisible);

  useEffect(() => {
    if (!searchParams.get('showPlansModal')) {
      return;
    }

    setIsVisible(true);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('showPlansModal');
    router.replace(newSearchParams.size > 0 ? `${pathname}?${newSearchParams.toString()}` : pathname);
  }, [searchParams, setIsVisible, router, pathname]);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (window && 'amplitude' in window) {
      window.amplitude.setUserId(user.id);
      window.amplitude.add(engagementPlugin());

      const identifyEvent = new window.amplitude.Identify();
      identifyEvent.set('name', user.name).set('email', user.email).set('sourceType', user.sourceType);
      window.amplitude.identify(identifyEvent);
    }
  }, [user]);

  return (
    <AppLoader>
      {children}
      {isSignedIn && user && <PlansModal user={user} isOpen={isVisible} onClose={() => setIsVisible(false)} />}
      {isSignedIn && (
        <>
          <TaskModal />
          <DeliverableModal />
        </>
      )}
    </AppLoader>
  );
};
