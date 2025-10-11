import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PWAInstaller from "./components/PWAInstaller";
import "./globals.css";
// Note: cookies() removed to allow static export; prefs are applied client-side
import ClientWrappers from './components/ClientWrappers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SSBJr Landing Pages",
    template: "%s | SSBJr Landing Pages"
  },
  description: "Landing pages dinâmicas com integração de redes sociais e análise de sentimentos da comunidade",
  keywords: ["landing pages", "redes sociais", "PWA", "marketing digital", "análise de sentimentos"],
  authors: [{ name: "SSBJr" }],
  creator: "SSBJr",
  publisher: "SSBJr",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SSBJr Pages",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "SSBJr Landing Pages",
    title: {
      default: "SSBJr Landing Pages",
      template: "%s | SSBJr Landing Pages"
    },
    description: "Landing pages dinâmicas com integração de redes sociais e análise de sentimentos da comunidade",
  },
  twitter: {
    card: "summary",
    title: {
      default: "SSBJr Landing Pages",
      template: "%s | SSBJr Landing Pages"
    },
    description: "Landing pages dinâmicas com integração de redes sociais e análise de sentimentos da comunidade",
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Theme and lang will be applied client-side to avoid prerender errors for static export
  return (
    <html lang="pt-BR" className={`theme-day`}>
      <head>
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/icons/icon-152x152.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SSBJr Pages" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        {/* SEO / owner meta */}
        <meta name="ceo" content="SSBJr" />

        {/* Analytics Loader will inject GA/FB scripts client-side after consent */}
        {/* Inline script: apply theme and lang early to avoid FOUC (client fallback) */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('site_theme');if(t){document.documentElement.classList.remove('theme-day','theme-night','theme-glass');document.documentElement.classList.add('theme-'+t);}var lang=localStorage.getItem('site_lang');if(lang){document.documentElement.lang=lang;} }catch(e){} })();` }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PWAInstaller />
  <ClientWrappers />
        {children}
      </body>
    </html>
  );
}
