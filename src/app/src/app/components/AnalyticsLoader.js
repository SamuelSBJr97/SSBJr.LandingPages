"use client";

import { useEffect } from 'react';

export default function AnalyticsLoader() {
  useEffect(() => {
    try {
      // Prefer cookie (server-friendly) then fallback to localStorage
      const cookieMatch = document.cookie.match(/ssbjr_cookie_consent=([^;]+)/);
      const raw = cookieMatch ? decodeURIComponent(cookieMatch[1]) : (localStorage.getItem('ssbjr_cookie_consent') || null);
      const consent = raw ? JSON.parse(raw) : null;
      const analyticsAllowed = consent?.analytics === true;

      const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // GA4 (G-XXXX)
      const FB_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID; // Facebook Pixel
      const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID; // Google Ads (AW-XXXX)
      const LI_ID = process.env.NEXT_PUBLIC_LI_ID; // LinkedIn Insight
      const TIKTOK_ID = process.env.NEXT_PUBLIC_TIKTOK_ID; // TikTok Pixel

      if (!analyticsAllowed) return;

      // Google Analytics 4
      if (GA_ID) {
        const s1 = document.createElement('script');
        s1.async = true;
        s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(s1);

        const s2 = document.createElement('script');
        s2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { page_path: window.location.pathname });`;
        document.head.appendChild(s2);
      }

      // Facebook Pixel
      if (FB_ID) {
        const s = document.createElement('script');
        s.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '${FB_ID}'); fbq('track', 'PageView');`;
        document.head.appendChild(s);

        const img = document.createElement('img');
        img.height = 1;
        img.width = 1;
        img.style.display = 'none';
        img.src = `https://www.facebook.com/tr?id=${FB_ID}&ev=PageView&noscript=1`;
        document.body.appendChild(img);
      }

      // Google Ads (conversion tracking)
      if (GADS_ID) {
        const s = document.createElement('script');
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`;
        document.head.appendChild(s);
        const sG = document.createElement('script');
        sG.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GADS_ID}');`;
        document.head.appendChild(sG);
      }

      // LinkedIn Insight
      if (LI_ID) {
        const lnInline = document.createElement('script');
        lnInline.type = 'text/javascript';
        lnInline.innerHTML = `window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push('${LI_ID}');`;
        document.head.appendChild(lnInline);
        const ln = document.createElement('script');
        ln.type = 'text/javascript';
        ln.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
        document.head.appendChild(ln);
      }

      // TikTok Pixel
      if (TIKTOK_ID) {
        const tt = document.createElement('script');
        tt.innerHTML = `!function (w, d, t) { w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || []; ttq.methods = ['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie']; ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } }; ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]); return e }; ttq.load = function (e, n) { var i = 'https://analytics.tiktok.com/i18n/pixel/events.js'; ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = i; ttq._t = ttq._t || {}; ttq._t[e] = +new Date; ttq._o = ttq._o || {}; ttq._o[e] = n || {}; var o = document.createElement('script'); o.type = 'text/javascript'; o.async = !0; o.src = i; var a = document.getElementsByTagName('script')[0]; a.parentNode.insertBefore(o, a) }; ttq.load('${TIKTOK_ID}'); ttq.page(); }(window, document, 'ttq');`;
        document.head.appendChild(tt);
      }
    } catch (e) {
      // swallow errors; analytics are non-critical
      console.warn('AnalyticsLoader error', e);
    }
  }, []);

  return null;
}
