import { Tab, Tabs } from '@heroui/react';
import { useQueryClient } from '@tanstack/react-query';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useProtectedPage } from '../../../hooks/useProtectedPage';
import { getUser } from '../../../services/services';
import { Header } from '../../layout/Header';

interface Props {
  children: React.ReactNode;
}

export const AccountLayout = ({ children }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isSignedIn } = useProtectedPage();

  const activeTab = router.pathname.split('/')[2] ?? 'general';

  useEffect(() => {
    if (!isSignedIn) {
      return;
    }

    queryClient.invalidateQueries({ queryKey: [getUser.key] });
  }, [isSignedIn]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="border-t border-foreground-200">
        <div className="mx-auto max-w-screen-lg p-6">
          <div className="grid grid-cols-[auto_1fr] gap-6">
            <Tabs
              selectedKey={activeTab}
              isVertical
              classNames={{
                tab: 'justify-start h-auto',
              }}
            >
              <Tab as={NextLink} href="/account" key="general" title="General information" />
              <Tab as={NextLink} href="/account/subscription" key="subscription" title="Subscription" />
              <Tab as={NextLink} href="/account/billing-history" key="billing-history" title="Billing history" />
            </Tabs>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
