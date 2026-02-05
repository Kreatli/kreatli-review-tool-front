import { AmplitudeEvent, AmplitudeEventProperties } from '../typings/amplitude';

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
