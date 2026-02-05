import { plugin as engagementPlugin } from '@amplitude/engagement-browser';
import React, { useEffect } from 'react';

import { usePlansModalVisibility } from '../../../hooks/usePlansModalVisibility';
import { useSession } from '../../../hooks/useSession';
import { PlansModal } from '../../account/PlansModal';
import { AppLoader } from '../AppLoader';

export const Layout = ({ children }: React.PropsWithChildren) => {
  const { isSignedIn, user } = useSession();
  const isVisible = usePlansModalVisibility((state) => state.isVisible);
  const setIsVisible = usePlansModalVisibility((state) => state.setIsVisible);

  useEffect(() => {
    if (!user) {
      return;
    }

    if (window && 'amplitude' in window) {
      window.amplitude.setUserId(user.id);
      window.amplitude.add(engagementPlugin());

      const identifyEvent = new window.amplitude.Identify();
      identifyEvent.set('name', user.name).set('email', user.email);
      window.amplitude.identify(identifyEvent);
    }
  }, [user]);

  return (
    <AppLoader>
      {children}
      {isSignedIn && user && <PlansModal user={user} isOpen={isVisible} onClose={() => setIsVisible(false)} />}
    </AppLoader>
  );
};
