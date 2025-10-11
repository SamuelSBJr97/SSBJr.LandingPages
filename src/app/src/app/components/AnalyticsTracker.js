"use client";

import { useEffect, useCallback } from 'react';

export default function AnalyticsTracker({ landingPageSlug }) {
  // Forward events to external analytics providers if available
  const sendToExternal = useCallback((event, data) => {
    try {
      if (typeof window === 'undefined') return;
      // Check consent before forwarding
      try {
        const cookieMatch = document.cookie.match(/ssbjr_cookie_consent=([^;]+)/);
        const raw = cookieMatch ? decodeURIComponent(cookieMatch[1]) : (localStorage.getItem('ssbjr_cookie_consent') || null);
        const consent = raw ? JSON.parse(raw) : null;
        const analyticsAllowed = consent?.analytics === true;

        if (!analyticsAllowed) return;
      } catch {
        return; // if we can't parse consent, be conservative and do not forward
      }

      // Google Analytics (gtag)
      if (window.gtag && typeof window.gtag === 'function') {
        try {
          const gaEventName = event === 'page_view' ? 'page_view' : event;
          window.gtag('event', gaEventName, { ...data, page_path: window.location.pathname });
        } catch {
          // ignore
        }
      }

      // Facebook Pixel (fbq)
      if (window.fbq && typeof window.fbq === 'function') {
        try {
          if (event === 'page_view') {
            window.fbq('track', 'PageView');
          } else {
            window.fbq('trackCustom', event, data);
          }
        } catch {
          // ignore
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const registerEvent = useCallback((event, data) => {
    try {
      const analytics = JSON.parse(localStorage.getItem('ssbjr_analytics') || '[]');
      analytics.push({
        id: generateId(),
        event: event,
        ...data,
        sessionId: getSessionId(),
        visitorId: getVisitorId()
      });

      // Keep only recent events
      if (analytics.length > 1000) {
        analytics.splice(0, analytics.length - 1000);
      }

      localStorage.setItem('ssbjr_analytics', JSON.stringify(analytics));

      // Forward to external analytics too
      try {
        sendToExternal(event, data);
      } catch {
        // ignore
      }
    } catch (error) {
      console.warn('Erro ao registrar analytics:', error);
    }
  }, [sendToExternal]);

  const getElementSection = (element) => {
    const sections = ['hero', 'features', 'testimonials', 'community', 'cta', 'footer'];
    let currentSection = 'unknown';
    sections.forEach(section => {
      const sectionElement = document.querySelector(`[data-section="${section}"]`) || document.querySelector(`.${section}-section`);
      if (sectionElement && sectionElement.contains(element)) {
        currentSection = section;
      }
    });
    return currentSection;
  };

  const getElementPosition = useCallback((element) => {
    const rect = element.getBoundingClientRect();
    return {
      x: Math.round(rect.left + window.scrollX),
      y: Math.round(rect.top + window.scrollY),
      section: getElementSection(element)
    };
  }, []);

  useEffect(() => {
    const pageViewData = {
      landingPage: landingPageSlug,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      url: window.location.href
    };

    registerEvent('page_view', pageViewData);
    sendToExternal('page_view', pageViewData);

    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime;
      registerEvent('page_exit', {
        landingPage: landingPageSlug,
        timeOnPage: timeOnPage,
        timestamp: new Date().toISOString()
      });
    };

    const trackCTAClicks = () => {
      const ctaButtons = document.querySelectorAll('button, [data-cta]');
      ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          const data = {
            landingPage: landingPageSlug,
            ctaText: e.target.textContent,
            ctaPosition: getElementPosition(e.target),
            timestamp: new Date().toISOString()
          };
          registerEvent('cta_click', data);
          sendToExternal('cta_click', data);
        });
      });
    };

    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          const data = {
            landingPage: landingPageSlug,
            depth: scrollPercent,
            timestamp: new Date().toISOString()
          };
          registerEvent('scroll_depth', data);
          sendToExternal('scroll_depth', data);
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', trackScrollDepth);
    setTimeout(trackCTAClicks, 1000);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, [landingPageSlug, registerEvent, getElementPosition, sendToExternal]);

  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('ssbjr_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('ssbjr_session_id', sessionId);
    }
    return sessionId;
  };

  const getVisitorId = () => {
    let visitorId = localStorage.getItem('ssbjr_visitor_id');
    if (!visitorId) {
      visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('ssbjr_visitor_id', visitorId);
    }
    return visitorId;
  };

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  };

  return null;
}

export const trackEvent = (event, data) => {
  try {
    const analytics = JSON.parse(localStorage.getItem('ssbjr_analytics') || '[]');
    analytics.push({
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
      event: event,
      timestamp: new Date().toISOString(),
      ...data
    });
    localStorage.setItem('ssbjr_analytics', JSON.stringify(analytics));
  } catch (error) {
    console.warn('Erro ao registrar evento:', error);
  }
};