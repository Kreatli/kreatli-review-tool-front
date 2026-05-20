import { useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AccountLayout } from '../../components/account/Account';
import { Subscription } from '../../components/account/Subscription';
import { useSession } from '../../hooks/useSession';
import { trackEvent } from '../../lib/amplitude';
import { getUser } from '../../services/services';

export default function SubscriptionPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isSignedIn, user } = useSession();

  useEffect(() => {
    if (!router.isReady || router.query.paymentStatus !== 'success') {
      return;
    }

    void queryClient.invalidateQueries({ queryKey: [getUser.key] });
  }, [queryClient, router.isReady, router.query.paymentStatus]);

  useEffect(() => {
    if (!router.isReady || router.query.paymentStatus !== 'success' || !user) {
      return;
    }

    if (user.subscription.isTrial) {
      const dedupeKey = `amplitude_free_trial_started_${user.id}`;
      if (!sessionStorage.getItem(dedupeKey)) {
        sessionStorage.setItem(dedupeKey, '1');
        trackEvent('free_trial_started', {
          plan_key: user.subscription.plan ?? '',
          plan_name: user.subscription.planName ?? '',
        });
      }
    }

    const planReady = user.subscription.plan != null;
    if (planReady || user.subscription.hasUsedTrial || user.subscription.isTrial) {
      void router.replace('/account/subscription', undefined, { shallow: true });
    }
  }, [router, user]);

  if (!isSignedIn || !user) {
    return null;
  }

  const title = `Kreatli | ${user.name}`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Subscription user={user} />
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
SubscriptionPage.getLayout = (page: any) => <AccountLayout>{page}</AccountLayout>;
