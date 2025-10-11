import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PWAInstaller from "./components/PWAInstaller";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
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

        {/* Google Analytics (gtag) - set NEXT_PUBLIC_GA_ID in env */}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });` }} />
          </>
        ) : null}

        {/* Facebook Pixel - set NEXT_PUBLIC_FB_PIXEL_ID in env */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID ? (
          <>
            <script dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}'); fbq('track', 'PageView');` }} />
            <noscript dangerouslySetInnerHTML={{ __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1" alt="" />` }} />
          </>
        ) : null}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PWAInstaller />
        {children}
      </body>
    </html>
  );
}
