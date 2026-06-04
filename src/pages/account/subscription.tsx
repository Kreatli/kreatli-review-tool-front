import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AccountLayout } from '../../components/account/Account';
import { Subscription } from '../../components/account/Subscription';
import { useSession } from '../../hooks/useSession';
import { trackEvent } from '../../lib/amplitude';
import {
  buildPlanEventProperties,
  clearCheckoutAnalyticsContext,
  consumeTrialConversionFlag,
  markUserWasTrialing,
  readCheckoutAnalyticsContext,
  shouldTrackOncePerSession,
  syncUserSubscriptionTraits,
} from '../../lib/amplitudeUser';

export default function SubscriptionPage() {
  const router = useRouter();
  const { isSignedIn, user } = useSession();

  useEffect(() => {
    if (!user) {
      return;
    }

    syncUserSubscriptionTraits(user);

    if (user.subscription.isActive && !user.subscription.isTrial && user.subscription.plan && consumeTrialConversionFlag(user.id)) {
      const checkoutContext = readCheckoutAnalyticsContext();
      const planProps = buildPlanEventProperties(user, checkoutContext);

      if (shouldTrackOncePerSession(`subscription_converted_trial_end_${user.id}`)) {
        trackEvent('subscription_converted', {
          ...planProps,
          conversion_source: 'trial_ended',
        });
      }

      clearCheckoutAnalyticsContext();
    }
  }, [user]);

  useEffect(() => {
    if (!router.isReady || !user) {
      return;
    }

    const paymentStatus = router.query.paymentStatus;

    if (paymentStatus !== 'success' && paymentStatus !== 'cancel') {
      return;
    }

    syncUserSubscriptionTraits(user);

    const checkoutContext = readCheckoutAnalyticsContext();
    const planProps = buildPlanEventProperties(user, checkoutContext);

    if (paymentStatus === 'success') {
      if (user.subscription.isTrial) {
        if (shouldTrackOncePerSession(`free_trial_started_${user.id}`)) {
          markUserWasTrialing(user.id);
          trackEvent('free_trial_started', planProps);
        }
      } else if (user.subscription.isActive && user.subscription.plan) {
        if (shouldTrackOncePerSession(`subscription_converted_checkout_${user.id}`)) {
          trackEvent('subscription_converted', {
            ...planProps,
            conversion_source: 'checkout_success',
          });
        }
      }
    } else if (paymentStatus === 'cancel') {
      if (shouldTrackOncePerSession(`subscription_checkout_cancelled_${user.id}`)) {
        trackEvent('subscription_checkout_cancelled', {
          plan_id: checkoutContext?.plan_id ?? planProps.plan_key,
          plans_modal_entry: planProps.plans_modal_entry,
          plan_price_usd: checkoutContext?.plan_price_usd ?? planProps.price_usd,
        });
      }
    }

    clearCheckoutAnalyticsContext();

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
