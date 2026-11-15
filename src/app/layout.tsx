import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { pretendard } from '@/lib/fonts/pretendard';
import './globals.css';
import { Suspense } from 'react';
import QueryProvider from '@/providers/QueryProvider';
import AppViewport from '@/components/AppViewport';
import {
  SITE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SHARED_IMAGE,
} from '@/lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  // Public routes opt in explicitly; personal, admin and unfinished pages stay out.
  robots: { index: false, follow: true },
  icons: {
    icon: '/brand/homemaster-logo.png',
    apple: '/brand/homemaster-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARED_IMAGE],
  },
  twitter: {
    card: 'summary',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARED_IMAGE],
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-pretendard antialiased overflow-x-hidden">
        <QueryProvider>
          <Suspense fallback={null}>
            <AppViewport>{children}</AppViewport>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}
