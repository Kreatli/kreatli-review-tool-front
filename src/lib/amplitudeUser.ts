import { UserDto } from '../services/types';

export type SubscriptionLifecycle =
  | 'explore_pre_trial'
  | 'explore_post_trial'
  | 'trialing'
  | 'paid'
  | 'inactive'
  | 'enterprise'
  | 'appsumo';

const CHECKOUT_CONTEXT_KEY = 'kreatli_amplitude_checkout_context';
const WAS_TRIAL_KEY_PREFIX = 'kreatli_amplitude_was_trial_';

export interface CheckoutAnalyticsContext {
  plan_id: string;
  plans_modal_entry: string;
  plan_price_usd?: number;
}

export function getSubscriptionLifecycle(user: UserDto): SubscriptionLifecycle {
  const { subscription } = user;

  if (subscription.isAppSumo) {
    return 'appsumo';
  }

  if (subscription.plan === 'enterprise') {
    return 'enterprise';
  }

  if (subscription.isTrial) {
    return 'trialing';
  }

  if (subscription.isActive && subscription.plan) {
    return 'paid';
  }

  if (!subscription.isActive && subscription.hasUsedTrial) {
    return 'explore_post_trial';
  }

  if (!subscription.isActive && !subscription.hasUsedTrial) {
    return 'explore_pre_trial';
  }

  return 'inactive';
}

export function saveCheckoutAnalyticsContext(context: CheckoutAnalyticsContext): void {
  if (typeof sessionStorage === 'undefined') {
    return;
  }

  sessionStorage.setItem(CHECKOUT_CONTEXT_KEY, JSON.stringify(context));
}

export function readCheckoutAnalyticsContext(): CheckoutAnalyticsContext | null {
  if (typeof sessionStorage === 'undefined') {
    return null;
  }

  const raw = sessionStorage.getItem(CHECKOUT_CONTEXT_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as CheckoutAnalyticsContext;
  } catch {
    return null;
  }
}

export function clearCheckoutAnalyticsContext(): void {
  if (typeof sessionStorage === 'undefined') {
    return;
  }

  sessionStorage.removeItem(CHECKOUT_CONTEXT_KEY);
}

export function markUserWasTrialing(userId: string): void {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(`${WAS_TRIAL_KEY_PREFIX}${userId}`, '1');
}

export function consumeTrialConversionFlag(userId: string): boolean {
  if (typeof localStorage === 'undefined') {
    return false;
  }

  const key = `${WAS_TRIAL_KEY_PREFIX}${userId}`;
  const wasTrial = localStorage.getItem(key) === '1';

  if (wasTrial) {
    localStorage.removeItem(key);
  }

  return wasTrial;
}

/** Session-scoped dedupe so payment redirects and re-renders do not double-count. */
export function shouldTrackOncePerSession(dedupeKey: string): boolean {
  if (typeof sessionStorage === 'undefined') {
    return true;
  }

  const key = `kreatli_amplitude_once_${dedupeKey}`;

  if (sessionStorage.getItem(key)) {
    return false;
  }

  sessionStorage.setItem(key, '1');

  return true;
}

export function buildPlanEventProperties(
  user: UserDto,
  checkoutContext?: CheckoutAnalyticsContext | null,
): {
  plan_key: string;
  plan_name: string;
  price_usd: number;
  plans_modal_entry: string;
  subscription_lifecycle: SubscriptionLifecycle;
} {
  return {
    plan_key: user.subscription.plan ?? checkoutContext?.plan_id ?? '',
    plan_name: user.subscription.planName ?? '',
    price_usd: user.subscription.price ?? checkoutContext?.plan_price_usd ?? 0,
    plans_modal_entry: checkoutContext?.plans_modal_entry ?? 'unknown',
    subscription_lifecycle: getSubscriptionLifecycle(user),
  };
}

export function syncUserSubscriptionTraits(user: UserDto): void {
  if (typeof window === 'undefined' || !('amplitude' in window)) {
    return;
  }

  const { subscription } = user;
  const lifecycle = getSubscriptionLifecycle(user);

  const identifyEvent = new window.amplitude.Identify();
  identifyEvent
    .set('name', user.name)
    .set('email', user.email)
    .set('source_type', user.sourceType ?? '')
    .set('plan_key', subscription.plan ?? '')
    .set('plan_name', subscription.planName ?? '')
    .set('subscription_active', subscription.isActive)
    .set('subscription_is_trial', subscription.isTrial)
    .set('subscription_has_used_trial', subscription.hasUsedTrial)
    .set('subscription_is_appsumo', subscription.isAppSumo)
    .set('subscription_price_usd', subscription.price)
    .set('subscription_lifecycle', lifecycle)
    .set('storage_used_bytes', subscription.limits.storage.used)
    .set('storage_max_bytes', subscription.limits.storage.max)
    .set('users_used', subscription.limits.usersCount.used)
    .set('users_max', subscription.limits.usersCount.max);

  window.amplitude.identify(identifyEvent);
}
