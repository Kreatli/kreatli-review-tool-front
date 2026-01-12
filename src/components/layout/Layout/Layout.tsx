import React from 'react';

import { usePlansModalVisibility } from '../../../hooks/usePlansModalVisibility';
import { useSession } from '../../../hooks/useSession';
import { PlansModal } from '../../account/PlansModal';
import { AppLoader } from '../AppLoader';

export const Layout = ({ children }: React.PropsWithChildren) => {
  const { isSignedIn, user } = useSession();
  const isVisible = usePlansModalVisibility((state) => state.isVisible);
  const setIsVisible = usePlansModalVisibility((state) => state.setIsVisible);

  return (
    <AppLoader>
      {children}
      {isSignedIn && user && <PlansModal user={user} isOpen={isVisible} onClose={() => setIsVisible(false)} />}
    </AppLoader>
  );
};
