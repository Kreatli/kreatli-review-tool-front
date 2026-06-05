import { AmplitudeEvent, AmplitudeEventProperties } from '../typings/amplitude';

export const identifyUserForAnalytics = (userId: string): void => {
  if (window && 'amplitude' in window) {
    window.amplitude.setUserId(userId);
  }
};

/** Aligns browser `user_id` with `Layout` / server before lifecycle events. */
export const trackAccountSignupCompleted = (userId: string, signupMethod: string): void => {
  identifyUserForAnalytics(userId);
  trackEvent('account_signup_completed', { signup_method: signupMethod });
};

export { syncUserSubscriptionTraits } from './amplitudeUser';

export const trackEvent = <T extends AmplitudeEvent>(
  event: T,
  properties?: T extends keyof AmplitudeEventProperties ? AmplitudeEventProperties[T] : never,
) => {
  if (window.location.hostname === 'localhost') {
    console.log('event', event, properties);
  }

  if (window && 'amplitude' in window) {
    window.amplitude.track(event, properties);
  }
};
