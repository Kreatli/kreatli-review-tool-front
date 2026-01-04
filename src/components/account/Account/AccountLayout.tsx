import { Tab, Tabs } from '@heroui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useMemo } from 'react';
import { Header } from '../../layout/Header';
import { useQueryClient } from '@tanstack/react-query';
import { getUser } from '../../../services/services';
import { useProtectedPage } from '../../../hooks/useProtectedPage';

interface Props {
  children: React.ReactNode;
}

export const AccountLayout = ({ children }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isSignedIn } = useProtectedPage();

  // Extract the active tab from the actual path (not the route pattern)
  const activeTab = useMemo(() => {
    if (!router.asPath) return 'general';
    // Remove query params and hash, then split by '/'
    const pathWithoutQuery = router.asPath.split('?')[0].split('#')[0];
    const segments = pathWithoutQuery.split('/').filter(Boolean);
    // Find the index of 'account' and get the segment after it
    const accountIndex = segments.indexOf('account');
    if (accountIndex >= 0 && segments[accountIndex + 1]) {
      return segments[accountIndex + 1];
    }
    return 'general';
  }, [router.asPath]);

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
