'use client';

import { useEffect } from 'react';

export default function AnalyticsTracker({ landingPageSlug }) {
  useEffect(() => {
    // Registrar view da página
    registerEvent('page_view', {
      landingPage: landingPageSlug,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      url: window.location.href
    });

    // Rastrear tempo na página
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime;
      registerEvent('page_exit', {
        landingPage: landingPageSlug,
        timeOnPage: timeOnPage,
        timestamp: new Date().toISOString()
      });
    };

    // Rastrear cliques em CTAs
    const trackCTAClicks = () => {
      const ctaButtons = document.querySelectorAll('button, [data-cta]');
      ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          registerEvent('cta_click', {
            landingPage: landingPageSlug,
            ctaText: e.target.textContent,
            ctaPosition: getElementPosition(e.target),
            timestamp: new Date().toISOString()
          });
        });
      });
    };

    // Rastrear scroll depth
    let maxScrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Registrar marcos importantes
        if ([25, 50, 75, 90].includes(scrollPercent)) {
          registerEvent('scroll_depth', {
            landingPage: landingPageSlug,
            depth: scrollPercent,
            timestamp: new Date().toISOString()
          });
        }
      }
    };

    // Configurar event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', trackScrollDepth);
    
    // Aguardar carregamento completo da página
    setTimeout(trackCTAClicks, 1000);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', trackScrollDepth);
    };
  }, [landingPageSlug]);

  const registerEvent = (event, data) => {
    try {
      const analytics = JSON.parse(localStorage.getItem('ssbjr_analytics') || '[]');
      analytics.push({
        id: generateId(),
        event: event,
        ...data,
        sessionId: getSessionId(),
        visitorId: getVisitorId()
      });
      
      // Manter apenas os últimos 1000 eventos
      if (analytics.length > 1000) {
        analytics.splice(0, analytics.length - 1000);
      }
      
      localStorage.setItem('ssbjr_analytics', JSON.stringify(analytics));
      
      // Em produção, também enviaria para servidor
      // sendToServer(event, data);
    } catch (error) {
      console.warn('Erro ao registrar analytics:', error);
    }
  };

  const getElementPosition = (element) => {
    const rect = element.getBoundingClientRect();
    return {
      x: Math.round(rect.left + window.scrollX),
      y: Math.round(rect.top + window.scrollY),
      section: getElementSection(element)
    };
  };

  const getElementSection = (element) => {
    // Determinar em qual seção da página o elemento está
    const sections = ['hero', 'features', 'testimonials', 'community', 'cta', 'footer'];
    let currentSection = 'unknown';
    
    sections.forEach(section => {
      const sectionElement = document.querySelector(`[data-section="${section}"]`) || 
                            document.querySelector(`.${section}-section`);
      if (sectionElement && sectionElement.contains(element)) {
        currentSection = section;
      }
    });
    
    return currentSection;
  };

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

  // Componente invisível
  return null;
}

// Função para ser usada por outros componentes
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