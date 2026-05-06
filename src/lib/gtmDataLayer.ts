/**
 * Push custom events for GTM → GA4 explorations (e.g. organic landing → signup CTA).
 * Requires GTM_ID in env (_app loads GoogleTagManager). In GTM, map `signupCtaClick` to GA4.
 */
export function pushSignupCtaClick(payload: { location: string; label?: string }) {
  if (typeof window === 'undefined') {
    return;
  }
  const w = window as Window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({
    event: 'signupCtaClick',
    signup_cta_location: payload.location,
    ...(payload.label ? { signup_cta_label: payload.label } : {}),
  });
}
