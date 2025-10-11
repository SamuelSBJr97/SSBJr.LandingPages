Localization, theme and analytics

This project now supports:

- Theme switching (day, night, glass) stored in both localStorage and a cookie (`site_theme`) so server-side rendering can apply the preferred theme immediately.
- Language preference stored in localStorage and cookie (`site_lang`). You can change language at `/lang`.
- Simple i18n dictionary in `src/app/i18n` (pt-BR, en-US, es-ES). Use `useTranslation()` in client components/pages to access `t(key)`.

Cookies and SSR

- Theme and language cookies are set with `path=/; max-age=31536000; samesite=lax`.
- The RootLayout reads cookies server-side and applies `class="theme-{name}"` to the `<html>` element and sets `lang` appropriately.

Analytics

- Google Analytics and Facebook Pixel are injected in `layout.tsx` when `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_FB_PIXEL_ID` are set during build/deploy.

How to test locally

1. Start dev server:

```powershell
cd src/app
npm ci
npm run dev
```

2. Change theme in header with the theme buttons. Test language at `/lang`.

Next improvements

- Expand translations and provide server-side translation for fully localized content (titles/meta). For that we can integrate Next.js i18n routing.
- Add cookie consent manager to delay analytics until consent.
- If you want I can implement server-side storage for per-user preferences (via account), or use cookies with secure flags for production.
