"use client";

import CookieConsent from './CookieConsent';
import AnalyticsLoader from './AnalyticsLoader';

export default function ClientWrappers() {
  return (
    <>
      <AnalyticsLoader />
      <CookieConsent />
    </>
  );
}
